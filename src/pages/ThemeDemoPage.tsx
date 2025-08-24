import React from 'react'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'

const ThemeDemoPage: React.FC = () => {
  return (
  <div className="min-h-screen flex flex-col bg-background text-foreground overflow-auto">
      {/* Nav */}
      <header className="sticky top-0 z-10 border-b border-border/60 bg-secondary text-secondary-foreground">
        <div className="mx-auto max-w-6xl flex items-center gap-6 px-6 h-14">
          <div className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-bold">z</span>
            <span className="hidden sm:inline">zOffice</span>
          </div>
          <nav className="flex items-center gap-4 text-sm">
            <a href="#" className="hover:text-primary">Dashboard</a>
            <a href="#" className="hover:text-primary">Employees</a>
            <a href="#" className="hover:text-primary">Reports</a>
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <Badge variant="accent">BETA</Badge>
            <Button size="sm" variant="secondary" className="bg-primary text-primary-foreground hover:opacity-90">Login</Button>
          </div>
        </div>
      </header>

      <main className="flex-1 mx-auto w-full max-w-6xl px-6 py-10 space-y-12">
        <section>
          <h1 className="text-2xl font-semibold mb-4">Corporate Blue Theme Demo</h1>
          <p className="text-sm text-muted-foreground max-w-prose">
            This page showcases the primary (#2563eb), secondary/nav (#1e293b), accent (#f59e0b), neutral background (#f8fafc), and standard foreground (#0f172a) colors through reusable components.
          </p>
        </section>

        {/* Color Swatches */}
        <section className="grid gap-6 md:grid-cols-3 lg:grid-cols-6">
          {[
            { name: 'Primary', var: '--primary' },
            { name: 'Secondary', var: '--secondary' },
            { name: 'Accent', var: '--accent' },
            { name: 'Background', var: '--background', border: true },
            { name: 'Card', var: '--card', border: true },
            { name: 'Text', var: '--foreground', text: true },
          ].map(s => (
            <div key={s.name} className="flex flex-col items-start gap-2">
              <div
                className={"w-full h-16 rounded-md flex items-center justify-center text-xs font-medium border " + (s.border ? 'border-border' : 'border-transparent')}
                style={{ background: `hsl(var(${s.var}))`, color: s.text ? 'hsl(var(--foreground))' : '#fff' }}
              >
                {s.name}
              </div>
              <code className="text-[10px] px-1 py-0.5 rounded bg-muted text-muted-foreground">{s.var}</code>
            </div>
          ))}
        </section>

        <section className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Buttons</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
            </CardContent>
          </Card>

            <Card>
              <CardHeader>
                <CardTitle>Badges</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3 items-start">
                <Badge>Primary</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="accent">Accent</Badge>
                <Badge variant="outline">Outline</Badge>
              </CardContent>
            </Card>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle>Card / Surface</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-relaxed">
              <p>
                Cards sit on the <code className="px-1 py-0.5 rounded bg-muted">background</code> color (#f8fafc) with a white surface and subtle border. Interactive
                elements use the <code className="px-1 py-0.5 rounded bg-primary text-primary-foreground">primary</code> color for prominence.
              </p>
              <p>
                Accent (#f59e0b) is reserved for highlighting quick status items such as <Badge variant="accent" className="align-middle">NEW</Badge> or warnings.
              </p>
            </CardContent>
          </Card>
        </section>
      </main>
      <footer className="py-6 border-t border-border text-center text-xs text-muted-foreground">© {new Date().getFullYear()} zOffice Theme Demo</footer>
    </div>
  )
}

export default ThemeDemoPage
