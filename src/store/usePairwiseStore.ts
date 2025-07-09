import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { createSlots, PairWise } from '../../core'

export interface Factor {
  name: string
  levels: string[]
}

export interface TestCase {
  [key: string]: string
}

export interface Constraint {
  id: string
  factor1: string
  value1: string
  factor2: string
  value2: string
  type: 'exclude' | 'require'
  description?: string
}

export interface PairwiseState {
  factors: Factor[]
  testCases: TestCase[]
  constraints: Constraint[]
  loading: boolean
  error: string | null
}

export interface PairwiseActions {
  addFactor: (factor: Factor) => void
  updateFactor: (index: number, factor: Factor) => void
  removeFactor: (index: number) => void
  addConstraint: (constraint: Omit<Constraint, 'id'>) => void
  updateConstraint: (id: string, constraint: Omit<Constraint, 'id'>) => void
  removeConstraint: (id: string) => void
  generateTestCases: () => void
  clearAll: () => void
  setError: (error: string | null) => void
}

export type PairwiseStore = PairwiseState & PairwiseActions

const initialState: PairwiseState = {
  factors: [],
  testCases: [],
  constraints: [],
  loading: false,
  error: null,
}

export const usePairwiseStore = create<PairwiseStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      addFactor: (factor: Factor) => {
        set((state) => ({
          factors: [...state.factors, factor],
          error: null,
        }))
      },
      
      updateFactor: (index: number, factor: Factor) => {
        set((state) => {
          const factors = [...state.factors]
          factors[index] = factor
          return { factors, error: null }
        })
      },
      
      removeFactor: (index: number) => {
        set((state) => {
          const removedFactor = state.factors[index]
          return {
            factors: state.factors.filter((_, i) => i !== index),
            constraints: state.constraints.filter(
              c => c.factor1 !== removedFactor.name && c.factor2 !== removedFactor.name
            ),
            error: null,
          }
        })
      },
      
      addConstraint: (constraint: Omit<Constraint, 'id'>) => {
        set((state) => ({
          constraints: [...state.constraints, { ...constraint, id: crypto.randomUUID() }],
          error: null,
        }))
      },
      
      updateConstraint: (id: string, constraint: Omit<Constraint, 'id'>) => {
        set((state) => ({
          constraints: state.constraints.map(c => 
            c.id === id ? { ...constraint, id } : c
          ),
          error: null,
        }))
      },
      
      removeConstraint: (id: string) => {
        set((state) => ({
          constraints: state.constraints.filter(c => c.id !== id),
          error: null,
        }))
      },
      
      generateTestCases: () => {
        const { factors, constraints } = get()
        
        if (factors.length === 0) {
          set({ error: 'At least one factor is required' })
          return
        }
        
        set({ loading: true, error: null })
        
        try {
          const models = factors.map(f => ({ name: f.name, values: f.levels }))
          const slots = createSlots(models, 2)
          const result = new PairWise(models.length, slots).generate()
          
          let testCases = result.map(testCase => {
            const testCaseObj: TestCase = {}
            testCase.forEach((valueIndex, factorIndex) => {
              testCaseObj[factors[factorIndex].name] = factors[factorIndex].levels[valueIndex]
            })
            return testCaseObj
          })
          
          // Apply constraints
          testCases = testCases.filter(testCase => {
            return constraints.every(constraint => {
              const value1 = testCase[constraint.factor1]
              const value2 = testCase[constraint.factor2]
              
              if (constraint.type === 'exclude') {
                // If both values match the constraint, exclude this test case
                return !(value1 === constraint.value1 && value2 === constraint.value2)
              } else if (constraint.type === 'require') {
                // If one value matches but the other doesn't, exclude this test case
                if (value1 === constraint.value1) {
                  return value2 === constraint.value2
                }
                if (value2 === constraint.value2) {
                  return value1 === constraint.value1
                }
                return true
              }
              return true
            })
          })
          
          set({ testCases, loading: false })
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Unknown error occurred',
            loading: false 
          })
        }
      },
      
      clearAll: () => {
        set(initialState)
      },
      
      setError: (error: string | null) => {
        set({ error })
      },
    }),
    {
      name: 'pairwise-storage',
      version: 1,
    }
  )
)