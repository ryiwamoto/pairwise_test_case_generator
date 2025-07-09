import React, { useState } from 'react'
import { usePairwiseStore, Factor } from '../store/usePairwiseStore'

export const FactorForm: React.FC = () => {
  const { factors, addFactor, updateFactor, removeFactor, generateTestCases, clearAll, loading } = usePairwiseStore()
  const [newFactor, setNewFactor] = useState<Factor>({ name: '', levels: [''] })

  const handleAddLevel = (factorIndex: number) => {
    const factor = factors[factorIndex]
    updateFactor(factorIndex, {
      ...factor,
      levels: [...factor.levels, '']
    })
  }

  const handleRemoveLevel = (factorIndex: number, levelIndex: number) => {
    const factor = factors[factorIndex]
    if (factor.levels.length > 1) {
      updateFactor(factorIndex, {
        ...factor,
        levels: factor.levels.filter((_, i) => i !== levelIndex)
      })
    }
  }

  const handleLevelChange = (factorIndex: number, levelIndex: number, value: string) => {
    const factor = factors[factorIndex]
    const levels = [...factor.levels]
    levels[levelIndex] = value
    updateFactor(factorIndex, { ...factor, levels })
  }

  const handleFactorNameChange = (factorIndex: number, name: string) => {
    const factor = factors[factorIndex]
    updateFactor(factorIndex, { ...factor, name })
  }

  const handleAddFactor = () => {
    if (newFactor.name.trim() && newFactor.levels.some(level => level.trim())) {
      addFactor({
        name: newFactor.name.trim(),
        levels: newFactor.levels.filter(level => level.trim()).map(level => level.trim())
      })
      setNewFactor({ name: '', levels: [''] })
    }
  }

  const handleNewFactorLevelChange = (levelIndex: number, value: string) => {
    const levels = [...newFactor.levels]
    levels[levelIndex] = value
    setNewFactor({ ...newFactor, levels })
  }

  const handleAddNewLevel = () => {
    setNewFactor({ ...newFactor, levels: [...newFactor.levels, ''] })
  }

  const handleRemoveNewLevel = (levelIndex: number) => {
    if (newFactor.levels.length > 1) {
      setNewFactor({
        ...newFactor,
        levels: newFactor.levels.filter((_, i) => i !== levelIndex)
      })
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Factors</h2>
      
      {/* Existing Factors */}
      {factors.map((factor, factorIndex) => (
        <div key={factorIndex} className="mb-6 p-4 border border-gray-200 rounded">
          <div className="flex items-center justify-between mb-3">
            <input
              type="text"
              value={factor.name}
              onChange={(e) => handleFactorNameChange(factorIndex, e.target.value)}
              className="text-lg font-medium bg-transparent border-none focus:outline-none focus:ring-0"
              placeholder="Factor name"
            />
            <button
              onClick={() => removeFactor(factorIndex)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
          
          <div className="space-y-2">
            {factor.levels.map((level, levelIndex) => (
              <div key={levelIndex} className="flex items-center gap-2">
                <input
                  type="text"
                  value={level}
                  onChange={(e) => handleLevelChange(factorIndex, levelIndex, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Level value"
                />
                <button
                  onClick={() => handleRemoveLevel(factorIndex, levelIndex)}
                  className="text-red-500 hover:text-red-700"
                  disabled={factor.levels.length === 1}
                >
                  -
                </button>
              </div>
            ))}
            <button
              onClick={() => handleAddLevel(factorIndex)}
              className="text-blue-500 hover:text-blue-700"
            >
              + Add Level
            </button>
          </div>
        </div>
      ))}
      
      {/* Add New Factor */}
      <div className="mb-6 p-4 border-2 border-dashed border-gray-300 rounded">
        <input
          type="text"
          value={newFactor.name}
          onChange={(e) => setNewFactor({ ...newFactor, name: e.target.value })}
          className="w-full mb-3 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="New factor name"
        />
        
        <div className="space-y-2">
          {newFactor.levels.map((level, levelIndex) => (
            <div key={levelIndex} className="flex items-center gap-2">
              <input
                type="text"
                value={level}
                onChange={(e) => handleNewFactorLevelChange(levelIndex, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Level value"
              />
              <button
                onClick={() => handleRemoveNewLevel(levelIndex)}
                className="text-red-500 hover:text-red-700"
                disabled={newFactor.levels.length === 1}
              >
                -
              </button>
            </div>
          ))}
          <button
            onClick={handleAddNewLevel}
            className="text-blue-500 hover:text-blue-700"
          >
            + Add Level
          </button>
        </div>
        
        <button
          onClick={handleAddFactor}
          className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={!newFactor.name.trim() || !newFactor.levels.some(level => level.trim())}
        >
          Add Factor
        </button>
      </div>
      
      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={generateTestCases}
          disabled={loading || factors.length === 0}
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate Test Cases'}
        </button>
        <button
          onClick={clearAll}
          className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
        >
          Clear All
        </button>
      </div>
    </div>
  )
}