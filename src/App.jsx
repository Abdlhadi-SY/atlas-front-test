import { Navigate, Route,Routes } from 'react-router-dom'
import './App.css'
import Table from './Component/Table'
import Dashboard from './Pages/Dashboard'
import Items from './Pages/Items'
import Invoices from './Pages/Invoices'

export default function App() {
  return (
      <Routes>
        <Route path="/dashboard" element={<Dashboard/>}>
          <Route index element={<Navigate to="items" replace />} />
          <Route path='items' element={<Items/>}></Route>
          <Route path='innvoices' element={<Invoices/>}></Route>
        </Route>
      </Routes>
  )
}