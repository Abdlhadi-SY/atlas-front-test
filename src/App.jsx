import { Navigate, Route,Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './Pages/Dashboard'
import Items from './Pages/Items'
import Invoices from './Pages/Invoices'
import RequireAuth from './Auth/RequireAuth'
import Login from './Auth/Login'
import RequireBack from './Auth/RequireBack'
import Sidebar from './Component/Sidebar'
import NewInvoice from './Pages/NewInvoice'

export default function App() {
  return (
      <Routes>
        <Route element={<RequireBack/>}>
          <Route path="/login" element={<Login/>}/>
        </Route>
        <Route element={<RequireAuth></RequireAuth>}>
          <Route path="/dashboard" element={<Dashboard/>}>
            <Route index element={<Navigate to="items" replace />} />
            <Route path='items' element={<Items/>}></Route>
            <Route path='innvoices' element={<Invoices/>}></Route>
          <Route path='newInvoice' element={<NewInvoice/>}></Route>
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
  )
}