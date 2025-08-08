import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type Brand = {
  coachName: string
  niche: string
  tone: 'Friendly' | 'Inspirational' | 'Authoritative' | 'Empathetic'
  audience: string
  pillars: string[]
  platforms: string[]
}

export type Template = {
  id: string
  name: string
  content: string // e.g., "Hook: {hook}\nBody: {body}\nCTA: {cta}"
}

export type Idea = {
  id: string
  text: string
  tags: string[]
  createdAt: string
  status: 'raw' | 'drafted' | 'scheduled'
}

export type ScheduledPost = {
  id: string
  date: string // YYYY-MM-DD
  title: string
}

type AppState = {
  brand: Brand
  templates: Template[]
  ideas: Idea[]
  scheduledPosts: ScheduledPost[]

  setBrand: (brand: Partial<Brand>) => void
  addTemplate: (tpl: Omit<Template, 'id'>) => void
  updateTemplate: (id: string, tpl: Partial<Template>) => void
  removeTemplate: (id: string) => void

  addIdea: (idea: Omit<Idea, 'id' | 'createdAt' | 'status'> & Partial<Pick<Idea, 'status'>>) => void
  updateIdea: (id: string, idea: Partial<Idea>) => void
  removeIdea: (id: string) => void

  schedulePost: (post: Omit<ScheduledPost, 'id'>) => void
  unschedulePost: (id: string) => void
}

const defaultBrand: Brand = {
  coachName: '',
  niche: '',
  tone: 'Inspirational',
  audience: '',
  pillars: ['Mindset', 'Habits', 'Productivity'],
  platforms: ['Instagram', 'LinkedIn'],
}

const defaultTemplates: Template[] = [
  {
    id: 'tpl-ig-101',
    name: 'Instagram: Hook-Body-CTA',
    content: 'Hook: {hook}\n\nValue: {value}\n\nCTA: {cta}',
  },
  {
    id: 'tpl-li-201',
    name: 'LinkedIn: Story-Insight-Action',
    content: 'Story: {story}\n\nInsight: {insight}\n\nAction: {action}',
  },
  {
    id: 'tpl-email-301',
    name: 'Email: Problem-Agitate-Solve',
    content: 'Problem: {problem}\n\nAgitate: {agitate}\n\nSolve: {solve}\n\nCTA: {cta}',
  },
]

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      brand: defaultBrand,
      templates: defaultTemplates,
      ideas: [],
      scheduledPosts: [],

      setBrand: (brand) => set((s) => ({ brand: { ...s.brand, ...brand } })),

      addTemplate: (tpl) =>
        set((s) => ({ templates: [...s.templates, { id: crypto.randomUUID(), ...tpl }] })),
      updateTemplate: (id, tpl) =>
        set((s) => ({ templates: s.templates.map((t) => (t.id === id ? { ...t, ...tpl } : t)) })),
      removeTemplate: (id) => set((s) => ({ templates: s.templates.filter((t) => t.id !== id) })),

      addIdea: ({ text, tags = [], status = 'raw' }) =>
        set((s) => ({
          ideas: [
            { id: crypto.randomUUID(), text, tags, status, createdAt: new Date().toISOString() },
            ...s.ideas,
          ],
        })),
      updateIdea: (id, idea) =>
        set((s) => ({ ideas: s.ideas.map((i) => (i.id === id ? { ...i, ...idea } : i)) })),
      removeIdea: (id) => set((s) => ({ ideas: s.ideas.filter((i) => i.id !== id) })),

      schedulePost: (post) =>
        set((s) => ({ scheduledPosts: [...s.scheduledPosts, { id: crypto.randomUUID(), ...post }] })),
      unschedulePost: (id) => set((s) => ({ scheduledPosts: s.scheduledPosts.filter((p) => p.id !== id) })),
    }),
    {
      name: 'coach-content-mvp',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ brand: s.brand, templates: s.templates, ideas: s.ideas, scheduledPosts: s.scheduledPosts }),
    },
  ),
)