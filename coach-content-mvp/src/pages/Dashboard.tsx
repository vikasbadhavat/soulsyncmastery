import { Link } from 'react-router-dom'
import { useAppStore } from '../store/appStore'

export default function Dashboard() {
  const brand = useAppStore((s) => s.brand)
  const ideas = useAppStore((s) => s.ideas)
  const posts = useAppStore((s) => s.scheduledPosts)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Welcome{brand.coachName ? `, ${brand.coachName}` : ''}</h1>
        <Link to="/generate" className="bg-indigo-600 text-white px-4 py-2 rounded-md">Create Content</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SummaryCard label="Ideas" value={ideas.length} to="/ideas" />
        <SummaryCard label="Scheduled" value={posts.length} to="/calendar" />
        <SummaryCard label="Templates" value={useAppStore.getState().templates.length} to="/templates" />
      </div>

      <div className="border rounded-lg bg-white p-4">
        <h2 className="font-semibold mb-2">Next steps</h2>
        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          <li>Define your brand basics in <Link className="underline" to="/brand">Brand Setup</Link></li>
          <li>Capture 3-5 content ideas in <Link className="underline" to="/ideas">Idea Bank</Link></li>
          <li>Generate your first post in <Link className="underline" to="/generate">Generator</Link></li>
        </ul>
      </div>
    </div>
  )
}

function SummaryCard({ label, value, to }: { label: string; value: number; to: string }) {
  return (
    <Link to={to} className="border rounded-lg bg-white p-4 hover:shadow-sm transition">
      <div className="text-sm text-gray-600">{label}</div>
      <div className="text-3xl font-semibold">{value}</div>
    </Link>
  )
}