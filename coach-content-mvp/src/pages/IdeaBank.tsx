import { useState } from 'react'
import { useAppStore } from '../store/appStore'
import type { Idea } from '../store/appStore'

export default function IdeaBank() {
  const ideas = useAppStore((s) => s.ideas)
  const addIdea = useAppStore((s) => s.addIdea)
  const updateIdea = useAppStore((s) => s.updateIdea)
  const removeIdea = useAppStore((s) => s.removeIdea)

  const [text, setText] = useState('')
  const [tags, setTags] = useState('')

  function add() {
    if (!text.trim()) return
    const tagList = tags.split(',').map((t) => t.trim()).filter(Boolean)
    addIdea({ text, tags: tagList })
    setText(''); setTags('')
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Idea Bank</h1>
      <div className="bg-white border rounded-lg p-4 space-y-3">
        <textarea className="border rounded-md px-3 py-2 min-h-24 w-full" placeholder="Describe your content idea"
                  value={text} onChange={(e) => setText(e.target.value)} />
        <input className="border rounded-md px-3 py-2" placeholder="Tags (comma-separated)"
               value={tags} onChange={(e) => setTags(e.target.value)} />
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md" onClick={add}>Add idea</button>
      </div>

      <div className="grid gap-3">
        {ideas.map((i) => (
          <IdeaItem key={i.id} idea={i} onUpdate={(u) => updateIdea(i.id, u)} onDelete={() => removeIdea(i.id)} />
        ))}
      </div>
    </div>
  )
}

function IdeaItem({ idea, onUpdate, onDelete }: { idea: Idea; onUpdate: (u: Partial<Idea>) => void; onDelete: () => void }) {
  const [editing, setEditing] = useState(false)
  const [text, setText] = useState(idea.text)
  const [tags, setTags] = useState(idea.tags.join(', '))

  function save() {
    const tagList = tags.split(',').map((t) => t.trim()).filter(Boolean)
    onUpdate({ text, tags: tagList })
    setEditing(false)
  }

  return (
    <div className="bg-white border rounded-lg p-4">
      <div className="text-sm text-gray-500">{new Date(idea.createdAt).toLocaleString()}</div>
      {editing ? (
        <div className="space-y-2 mt-2">
          <textarea className="border rounded-md px-3 py-2 w-full min-h-24" value={text} onChange={(e) => setText(e.target.value)} />
          <input className="border rounded-md px-3 py-2 w-full" value={tags} onChange={(e) => setTags(e.target.value)} />
          <div className="flex gap-2">
            <button className="bg-indigo-600 text-white px-3 py-1 rounded" onClick={save}>Save</button>
            <button className="border px-3 py-1 rounded" onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="space-y-2 mt-2">
          <p className="whitespace-pre-wrap">{idea.text}</p>
          <div className="flex flex-wrap gap-2">
            {idea.tags.map((t) => (
              <span key={t} className="text-xs bg-gray-100 border rounded px-2 py-0.5">#{t}</span>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <select className="border rounded-md px-2 py-1 text-sm" value={idea.status} onChange={(e) => onUpdate({ status: e.target.value as any })}>
              {['raw', 'drafted', 'scheduled'].map((s) => (<option key={s} value={s}>{s}</option>))}
            </select>
            <button className="border px-3 py-1 rounded" onClick={() => setEditing(true)}>Edit</button>
            <button className="border px-3 py-1 rounded" onClick={onDelete}>Delete</button>
          </div>
        </div>
      )}
    </div>
  )
}