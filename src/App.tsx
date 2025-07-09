import { FactorForm } from './components/FactorForm'
import { ConstraintForm } from './components/ConstraintForm'
import { TestCaseResults } from './components/TestCaseResults'
import { usePairwiseStore } from './store/usePairwiseStore'

function App() {
  const { error, setError } = usePairwiseStore()

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-[1600px] mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Pairwise Test Case Generator
        </h1>
        
        {error && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <span className="block sm:inline">{error}</span>
            <button
              className="absolute top-0 right-0 px-4 py-3"
              onClick={() => setError(null)}
            >
              ×
            </button>
          </div>
        )}
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div>
            <FactorForm />
          </div>
          <div>
            <ConstraintForm />
          </div>
          <div>
            <TestCaseResults />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App