import { useState } from 'react'
import './App.scss'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <h1>React Todo List</h1>
      <button type="button" onClick={() => setCount((c) => c + 1)}>
        count is {count}
      </button>
    </div>
  )
}

export default App