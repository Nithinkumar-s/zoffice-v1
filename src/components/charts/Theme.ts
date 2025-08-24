// Helpers to pull CSS variable-based colors so recharts can use them.
export function cssVar(name: string, fallback?: string): string {
  if (typeof window === 'undefined') return fallback || '#8884d8'
  const val = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return val || fallback || '#8884d8'
}

export const chartColors = () => ({
  primary: `hsl(var(--primary))`,
  secondary: `hsl(var(--secondary))`,
  accent: `hsl(var(--accent))`,
  fg: `hsl(var(--foreground))`,
  border: `hsl(var(--border))`,
  muted: `hsl(var(--muted-foreground))`
})
