import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Auth from './components/Auth/Auth'
import Dashboard from './components/Dashboard/Dashboard'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App