import React, { useState } from 'react'
import { usePairwiseStore, Constraint } from '../store/usePairwiseStore'

export const ConstraintForm: React.FC = () => {
  const { factors, constraints, addConstraint, removeConstraint } = usePairwiseStore()
  const [newConstraint, setNewConstraint] = useState<Omit<Constraint, 'id'>>({
    factor1: '',
    value1: '',
    factor2: '',
    value2: '',
    type: 'exclude',
    description: ''
  })

  const handleAddConstraint = () => {
    if (newConstraint.factor1 && newConstraint.value1 && newConstraint.factor2 && newConstraint.value2) {
      // Check for duplicate constraints
      const isDuplicate = constraints.some(c => 
        (c.factor1 === newConstraint.factor1 && c.value1 === newConstraint.value1 && 
         c.factor2 === newConstraint.factor2 && c.value2 === newConstraint.value2 && 
         c.type === newConstraint.type) ||
        (c.factor1 === newConstraint.factor2 && c.value1 === newConstraint.value2 && 
         c.factor2 === newConstraint.factor1 && c.value2 === newConstraint.value1 && 
         c.type === newConstraint.type)
      )
      
      if (isDuplicate) {
        alert('同じ制約が既に存在します')
        return
      }
      
      // Check for conflicting constraints
      const hasConflict = constraints.some(c => 
        c.factor1 === newConstraint.factor1 && c.value1 === newConstraint.value1 && 
        c.factor2 === newConstraint.factor2 && c.value2 === newConstraint.value2 && 
        c.type !== newConstraint.type
      )
      
      if (hasConflict) {
        alert('同じペアに対して矛盾する制約があります')
        return
      }
      
      addConstraint(newConstraint)
      setNewConstraint({
        factor1: '',
        value1: '',
        factor2: '',
        value2: '',
        type: 'exclude',
        description: ''
      })
    }
  }

  const getFactor1Values = () => {
    const factor = factors.find(f => f.name === newConstraint.factor1)
    return factor ? factor.levels : []
  }

  const getFactor2Values = () => {
    const factor = factors.find(f => f.name === newConstraint.factor2)
    return factor ? factor.levels : []
  }

  const getConstraintDescription = (constraint: Constraint) => {
    if (constraint.description) return constraint.description
    
    if (constraint.type === 'exclude') {
      return `${constraint.factor1}="${constraint.value1}" と ${constraint.factor2}="${constraint.value2}" の組み合わせを除外`
    } else {
      return `${constraint.factor1}="${constraint.value1}" の場合は ${constraint.factor2}="${constraint.value2}" を要求`
    }
  }

  if (factors.length < 2) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">制約条件</h2>
        <p className="text-gray-500">制約を設定するには少なくとも2つのファクターが必要です。</p>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">制約条件</h2>
      
      {/* Existing Constraints */}
      {constraints.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">設定済み制約</h3>
          <div className="space-y-3">
            {constraints.map((constraint) => (
              <div key={constraint.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-1 rounded text-sm ${
                      constraint.type === 'exclude' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {constraint.type === 'exclude' ? '除外' : '要求'}
                    </span>
                    <span className="text-sm text-gray-600">
                      {getConstraintDescription(constraint)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => removeConstraint(constraint.id)}
                  className="text-red-500 hover:text-red-700 ml-2"
                >
                  削除
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Add New Constraint */}
      <div className="p-4 border-2 border-dashed border-gray-300 rounded">
        <h3 className="text-lg font-medium mb-3">新しい制約を追加</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">制約タイプ</label>
            <select
              value={newConstraint.type}
              onChange={(e) => setNewConstraint({ ...newConstraint, type: e.target.value as 'exclude' | 'require' })}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="exclude">除外（このペアを生成しない）</option>
              <option value="require">要求（一方があれば他方も必要）</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">ファクター1</label>
            <select
              value={newConstraint.factor1}
              onChange={(e) => setNewConstraint({ ...newConstraint, factor1: e.target.value, value1: '' })}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">ファクターを選択</option>
              {factors.map((factor) => (
                <option key={factor.name} value={factor.name}>
                  {factor.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">値1</label>
            <select
              value={newConstraint.value1}
              onChange={(e) => setNewConstraint({ ...newConstraint, value1: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={!newConstraint.factor1}
            >
              <option value="">値を選択</option>
              {getFactor1Values().map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">ファクター2</label>
            <select
              value={newConstraint.factor2}
              onChange={(e) => setNewConstraint({ ...newConstraint, factor2: e.target.value, value2: '' })}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">ファクターを選択</option>
              {factors.filter(f => f.name !== newConstraint.factor1).map((factor) => (
                <option key={factor.name} value={factor.name}>
                  {factor.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">値2</label>
            <select
              value={newConstraint.value2}
              onChange={(e) => setNewConstraint({ ...newConstraint, value2: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={!newConstraint.factor2}
            >
              <option value="">値を選択</option>
              {getFactor2Values().map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">説明（オプション）</label>
          <input
            type="text"
            value={newConstraint.description}
            onChange={(e) => setNewConstraint({ ...newConstraint, description: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="制約の説明を入力"
          />
        </div>
        
        <button
          onClick={handleAddConstraint}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          disabled={!newConstraint.factor1 || !newConstraint.value1 || !newConstraint.factor2 || !newConstraint.value2}
        >
          制約を追加
        </button>
      </div>
    </div>
  )
}