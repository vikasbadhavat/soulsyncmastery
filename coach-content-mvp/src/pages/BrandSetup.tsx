import { useState } from 'react'
import type { FormEvent } from 'react'
import { useAppStore } from '../store/appStore'

export default function BrandSetup() {
  const brand = useAppStore((s) => s.brand)
  const setBrand = useAppStore((s) => s.setBrand)
  const [coachName, setCoachName] = useState(brand.coachName)
  const [niche, setNiche] = useState(brand.niche)
  const [tone, setTone] = useState(brand.tone)
  const [audience, setAudience] = useState(brand.audience)
  const [pillars, setPillars] = useState(brand.pillars.join(', '))
  const [platforms, setPlatforms] = useState(brand.platforms.join(', '))

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    setBrand({
      coachName,
      niche,
      tone,
      audience,
      pillars: pillars.split(',').map((s) => s.trim()).filter(Boolean),
      platforms: platforms.split(',').map((s) => s.trim()).filter(Boolean),
    })
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Brand Setup</h1>
      <form onSubmit={onSubmit} className="space-y-4 bg-white p-4 border rounded-lg">
        <TextField label="Coach name" value={coachName} onChange={setCoachName} />
        <TextField label="Niche" value={niche} onChange={setNiche} placeholder="e.g., Mindset coaching for founders" />
        <div>
          <label className="block text-sm font-medium mb-1">Tone</label>
          <select className="w-full border rounded-md px-3 py-2" value={tone} onChange={(e) => setTone(e.target.value as any)}>
            {['Friendly', 'Inspirational', 'Authoritative', 'Empathetic'].map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <TextArea label="Audience" value={audience} onChange={setAudience} placeholder="Describe your ideal client" />
        <TextField label="Content pillars (comma-separated)" value={pillars} onChange={setPillars} />
        <TextField label="Platforms (comma-separated)" value={platforms} onChange={setPlatforms} />
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md" type="submit">Save</button>
      </form>
    </div>
  )
}

function TextField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input className="w-full border rounded-md px-3 py-2" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </div>
  )
}

function TextArea({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <textarea className="w-full border rounded-md px-3 py-2 min-h-24" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </div>
  )
}