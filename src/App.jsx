import { Route,Routes } from 'react-router-dom'
import './App.css'
import Table from './Component/Table'
import Dashboard from './Pages/Dashboard'

export default function App() {
  return (
      <Routes>
        <Route path="/dashboard" element={<Dashboard/>}>
          <Route path='table' element={<Table/>}></Route>
        </Route>
      </Routes>
  )
}