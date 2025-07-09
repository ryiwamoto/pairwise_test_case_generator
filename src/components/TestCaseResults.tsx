import React, { useState } from 'react'
import { usePairwiseStore } from '../store/usePairwiseStore'
import { CodeBlock } from './CodeBlock'
import { MarkdownPreview } from './MarkdownPreview'

type ViewMode = 'table' | 'json' | 'csv' | 'markdown'

export const TestCaseResults: React.FC = () => {
  const { testCases, factors, constraints, loading } = usePairwiseStore()
  const [viewMode, setViewMode] = useState<ViewMode>('table')
  const [copied, setCopied] = useState(false)

  const handleCopy = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const getJsonContent = () => {
    return JSON.stringify(testCases, null, 2)
  }

  const getCsvContent = () => {
    if (testCases.length === 0) return ''
    
    const headers = factors.map(f => f.name)
    const rows = testCases.map(testCase => 
      headers.map(header => testCase[header] || '')
    )
    
    return [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n')
  }

  const getMarkdownContent = () => {
    if (testCases.length === 0) return ''
    
    const headers = ['#', ...factors.map(f => f.name)]
    const headerRow = `| ${headers.join(' | ')} |`
    const separatorRow = `| ${headers.map(() => '---').join(' | ')} |`
    
    const dataRows = testCases.map((testCase, index) => {
      const row = [
        (index + 1).toString(),
        ...factors.map(factor => testCase[factor.name] || '')
      ]
      return `| ${row.join(' | ')} |`
    })
    
    return [headerRow, separatorRow, ...dataRows].join('\n')
  }

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Generating test cases...</p>
        </div>
      </div>
    )
  }

  if (testCases.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Test Cases</h2>
        <p className="text-gray-500">No test cases generated yet. Add factors and click "Generate Test Cases".</p>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold">Test Cases ({testCases.length})</h2>
          {constraints.length > 0 && (
            <p className="text-sm text-gray-600 mt-1">
              {constraints.length}個の制約が適用されています
            </p>
          )}
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setViewMode('table')}
            className={`px-3 py-1 rounded ${viewMode === 'table' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Table
          </button>
          <button
            onClick={() => setViewMode('json')}
            className={`px-3 py-1 rounded ${viewMode === 'json' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            JSON
          </button>
          <button
            onClick={() => setViewMode('csv')}
            className={`px-3 py-1 rounded ${viewMode === 'csv' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            CSV
          </button>
          <button
            onClick={() => setViewMode('markdown')}
            className={`px-3 py-1 rounded ${viewMode === 'markdown' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Markdown
          </button>
        </div>
      </div>

      {viewMode === 'table' && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">#</th>
                {factors.map((factor, index) => (
                  <th key={index} className="border border-gray-300 px-4 py-2 text-left">
                    {factor.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {testCases.map((testCase, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                  {factors.map((factor, factorIndex) => (
                    <td key={factorIndex} className="border border-gray-300 px-4 py-2">
                      {testCase[factor.name] || ''}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {viewMode === 'json' && (
        <div className="relative">
          <button
            onClick={() => handleCopy(getJsonContent())}
            className="absolute top-2 right-2 bg-gray-700 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <CodeBlock language="json" code={getJsonContent()} />
        </div>
      )}

      {viewMode === 'csv' && (
        <div className="relative">
          <button
            onClick={() => handleCopy(getCsvContent())}
            className="absolute top-2 right-2 bg-gray-700 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <CodeBlock language="csv" code={getCsvContent()} />
        </div>
      )}

      {viewMode === 'markdown' && (
        <div className="relative">
          <button
            onClick={() => handleCopy(getMarkdownContent())}
            className="absolute top-2 right-2 bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 z-10"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <MarkdownPreview 
            content={getMarkdownContent()} 
            factors={factors}
            testCases={testCases}
          />
        </div>
      )}
    </div>
  )
}