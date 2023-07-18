import { useState } from 'react'
import CustomerTable from './components/CustomerTable'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="text-2xl text-center font-bold tracking-widest bg-slate-400 py-5 text-red-500">
        Customer's Details
      </div>
        <CustomerTable />
    </>
  )
}

export default App
