import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import BrandSetup from './pages/BrandSetup'
import Templates from './pages/Templates'
import Generator from './pages/Generator'
import IdeaBank from './pages/IdeaBank'
import CalendarPage from './pages/Calendar'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}> 
        <Route index element={<Dashboard />} />
        <Route path="brand" element={<BrandSetup />} />
        <Route path="templates" element={<Templates />} />
        <Route path="generate" element={<Generator />} />
        <Route path="ideas" element={<IdeaBank />} />
        <Route path="calendar" element={<CalendarPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
