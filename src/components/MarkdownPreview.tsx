import React from 'react'

interface MarkdownPreviewProps {
  content: string
  factors: Array<{ name: string }>
  testCases: Array<{ [key: string]: string }>
}

export const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ content, factors, testCases }) => {
  return (
    <div className="border border-gray-300 rounded p-4 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="border border-gray-300 px-3 py-2 text-left font-semibold">#</th>
              {factors.map((factor, index) => (
                <th key={index} className="border border-gray-300 px-3 py-2 text-left font-semibold">
                  {factor.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {testCases.map((testCase, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="border border-gray-300 px-3 py-2">{index + 1}</td>
                {factors.map((factor, factorIndex) => (
                  <td key={factorIndex} className="border border-gray-300 px-3 py-2">
                    {testCase[factor.name] || ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <p className="mb-2">マークダウンプレビュー (上記のテーブルをマークダウン形式で出力)</p>
        <details className="border border-gray-200 rounded p-2">
          <summary className="cursor-pointer text-blue-600 hover:text-blue-800">
            生のマークダウンを表示
          </summary>
          <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-x-auto whitespace-pre">
            {content}
          </pre>
        </details>
      </div>
    </div>
  )
}