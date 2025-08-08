import { NavLink, Outlet } from 'react-router-dom'
import { useAppStore } from '../store/appStore'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors
   ${isActive ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`

export default function Layout() {
  const brandName = useAppStore((s) => s.brand.coachName)
  return (
    <div className="min-h-screen grid grid-cols-[240px_1fr]">
      <aside className="border-r border-gray-200 p-4 space-y-4">
        <div className="text-xl font-semibold">{brandName || 'LifeCoach Studio'}</div>
        <nav className="space-y-1">
          <NavLink to="/" className={navLinkClass}>Dashboard</NavLink>
          <NavLink to="/brand" className={navLinkClass}>Brand Setup</NavLink>
          <NavLink to="/templates" className={navLinkClass}>Templates</NavLink>
          <NavLink to="/generate" className={navLinkClass}>Generator</NavLink>
          <NavLink to="/ideas" className={navLinkClass}>Idea Bank</NavLink>
          <NavLink to="/calendar" className={navLinkClass}>Content Calendar</NavLink>
        </nav>
      </aside>
      <main className="p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  )
}