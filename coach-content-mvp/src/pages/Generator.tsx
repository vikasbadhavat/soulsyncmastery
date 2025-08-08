import { useMemo, useState } from 'react'
import { useAppStore } from '../store/appStore'
import { extractPlaceholders, renderTemplate } from '../utils/template'

export default function Generator() {
  const brand = useAppStore((s) => s.brand)
  const templates = useAppStore((s) => s.templates)
  const addIdea = useAppStore((s) => s.addIdea)

  const [templateId, setTemplateId] = useState(templates[0]?.id ?? '')

  const selected = templates.find((t) => t.id === templateId) ?? null
  const placeholders = useMemo(() => (selected ? extractPlaceholders(selected.content) : []), [selected])
  const [values, setValues] = useState<Record<string, string>>({})

  const output = useMemo(() => {
    if (!selected) return ''
    const enriched: Record<string, string> = { ...values }
    // simple brand-context fallbacks
    enriched.hook ??= `For ${brand.audience || 'your clients'}, ${brand.niche || 'this matters because'}...`
    enriched.cta ??= `Follow for more on ${brand.pillars[0] ?? 'personal growth'}`
    return renderTemplate(selected.content, enriched)
  }, [selected, values, brand])

  function handleValueChange(key: string, v: string) {
    setValues((prev) => ({ ...prev, [key]: v }))
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(output)
  }

  function saveToIdeas() {
    if (!output.trim()) return
    addIdea({ text: output, tags: ['generated'] })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Generator</h1>

      <div className="bg-white border rounded-lg p-4 space-y-4">
        <div className="grid gap-2">
          <label className="text-sm font-medium">Template</label>
          <select className="border rounded-md px-3 py-2" value={templateId} onChange={(e) => setTemplateId(e.target.value)}>
            {templates.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>

        {selected && placeholders.length > 0 && (
          <div className="grid gap-3">
            <div className="text-sm text-gray-600">Fill placeholders</div>
            {placeholders.map((key) => (
              <div key={key} className="grid gap-1">
                <label className="text-sm">{key}</label>
                <input className="border rounded-md px-3 py-2" value={values[key] ?? ''} onChange={(e) => handleValueChange(key, e.target.value)} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white border rounded-lg p-4">
          <div className="text-sm font-medium mb-2">Preview</div>
          <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-3 rounded border min-h-40">{output}</pre>
        </div>
        <div className="bg-white border rounded-lg p-4 space-x-2">
          <button onClick={copyToClipboard} className="bg-indigo-600 text-white px-4 py-2 rounded-md">Copy</button>
          <button onClick={saveToIdeas} className="border px-4 py-2 rounded-md">Save to Idea Bank</button>
        </div>
      </div>
    </div>
  )
}