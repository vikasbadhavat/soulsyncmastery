import { useState } from 'react'
import { useAppStore } from '../store/appStore'
import type { Template } from '../store/appStore'

export default function Templates() {
  const templates = useAppStore((s) => s.templates)
  const addTemplate = useAppStore((s) => s.addTemplate)
  const updateTemplate = useAppStore((s) => s.updateTemplate)
  const removeTemplate = useAppStore((s) => s.removeTemplate)

  const [name, setName] = useState('')
  const [content, setContent] = useState('')

  function add() {
    if (!name.trim() || !content.trim()) return
    addTemplate({ name, content })
    setName(''); setContent('')
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Templates</h1>
      <div className="bg-white border rounded-lg p-4 space-y-3">
        <div className="grid gap-2">
          <input className="border rounded-md px-3 py-2" placeholder="Template name" value={name} onChange={(e) => setName(e.target.value)} />
          <textarea className="border rounded-md px-3 py-2 min-h-32" placeholder="Use {placeholders} to mark fields" value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md" onClick={add}>Add template</button>
      </div>

      <div className="grid gap-4">
        {templates.map((t) => (
          <TemplateItem key={t.id} tpl={t} onUpdate={(u) => updateTemplate(t.id, u)} onDelete={() => removeTemplate(t.id)} />
        ))}
      </div>
    </div>
  )
}

function TemplateItem({ tpl, onUpdate, onDelete }: { tpl: Template; onUpdate: (update: Partial<Template>) => void; onDelete: () => void }) {
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(tpl.name)
  const [content, setContent] = useState(tpl.content)

  function save() {
    onUpdate({ name, content })
    setEditing(false)
  }

  return (
    <div className="bg-white border rounded-lg p-4">
      {editing ? (
        <div className="space-y-2">
          <input className="border rounded-md px-3 py-2 w-full" value={name} onChange={(e) => setName(e.target.value)} />
          <textarea className="border rounded-md px-3 py-2 w-full min-h-28" value={content} onChange={(e) => setContent(e.target.value)} />
          <div className="flex gap-2">
            <button className="bg-indigo-600 text-white px-3 py-1 rounded" onClick={save}>Save</button>
            <button className="border px-3 py-1 rounded" onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{tpl.name}</h3>
            <div className="flex gap-2">
              <button className="border px-3 py-1 rounded" onClick={() => setEditing(true)}>Edit</button>
              <button className="border px-3 py-1 rounded" onClick={onDelete}>Delete</button>
            </div>
          </div>
          <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-3 rounded border">{tpl.content}</pre>
        </div>
      )}
    </div>
  )
}