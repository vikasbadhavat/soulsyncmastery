import { format, addDays, startOfWeek } from 'date-fns'
import { useMemo, useState } from 'react'
import { useAppStore } from '../store/appStore'

export default function CalendarPage() {
  const scheduled = useAppStore((s) => s.scheduledPosts)
  const schedulePost = useAppStore((s) => s.schedulePost)
  const unschedulePost = useAppStore((s) => s.unschedulePost)

  const [title, setTitle] = useState('')
  const [date, setDate] = useState(() => format(new Date(), 'yyyy-MM-dd'))

  const week = useMemo(() => {
    const start = startOfWeek(new Date(), { weekStartsOn: 1 })
    return Array.from({ length: 7 }).map((_, i) => format(addDays(start, i), 'yyyy-MM-dd'))
  }, [])

  function add() {
    if (!title.trim()) return
    schedulePost({ title, date })
    setTitle('')
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Content Calendar</h1>

      <div className="bg-white border rounded-lg p-4 grid md:grid-cols-[1fr_auto_auto] gap-2 items-end">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input className="border rounded-md px-3 py-2 w-full" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <input type="date" className="border rounded-md px-3 py-2" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md" onClick={add}>Schedule</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
        {week.map((d) => (
          <div key={d} className="bg-white border rounded-lg p-3 min-h-32">
            <div className="text-sm font-medium mb-2">{format(new Date(d), 'EEE dd')}</div>
            <div className="space-y-2">
              {scheduled.filter((p) => p.date === d).map((p) => (
                <div key={p.id} className="border rounded px-2 py-1 text-sm flex items-center justify-between">
                  <span className="truncate">{p.title}</span>
                  <button className="text-xs text-red-600" onClick={() => unschedulePost(p.id)}>Remove</button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}