export function extractPlaceholders(template: string): string[] {
  const placeholderRegex = /\{(\w+)\}/g
  const keys = new Set<string>()
  let match: RegExpExecArray | null
  while ((match = placeholderRegex.exec(template)) !== null) {
    keys.add(match[1])
  }
  return Array.from(keys)
}

export function renderTemplate(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? `{${key}}`)
}