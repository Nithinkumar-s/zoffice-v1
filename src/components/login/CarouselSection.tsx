import React, { useState, useEffect, useRef, type WheelEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// Reusable carousel section used on the login page (left panel)
const CarouselSection: React.FC = () => {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const slides = [
    {
      key: 'announcements',
      label: 'Announcements',
      content: (
        <Card className="w-[98%] mx-auto rounded-xl shadow-sm border border-[hsl(var(--border))] bg-white h-full flex flex-col">
          <CardHeader className="pb-2 py-4">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <span className="text-yellow-500 text-base leading-none">🎉</span>
              <span>Announcements</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-5 px-6">
            <ul className="text-xs space-y-2">
              <li className="flex items-center justify-between"><span className="font-medium">Anita Rao</span><span className="text-muted-foreground">Today</span></li>
              <li className="flex items-center justify-between"><span className="font-medium">Kiran Patel</span><span className="text-muted-foreground">Tomorrow</span></li>
              <li className="flex items-center justify-between"><span className="font-medium">Lena Das</span><span className="text-muted-foreground">Mon</span></li>
            </ul>
          </CardContent>
        </Card>
      ),
    },
    {
      key: 'holidays',
      label: 'Holidays',
      content: (
        <Card className="w-[95%] mx-auto rounded-xl shadow-sm border border-[hsl(var(--border))] bg-white h-full flex flex-col">
          <CardHeader className="pb-3 py-4">
            <CardTitle className="text-sm font-medium flex items-center justify-between w-full">
              <span>Upcoming Holidays</span>
              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">Show All</Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-4 px-6">
            <ul className="text-xs space-y-2">
              <li className="flex items-center justify-between"><span className="font-medium">Independence Day</span><span className="text-muted-foreground">Aug 15</span></li>
              <li className="flex items-center justify-between"><span className="font-medium">Founders Day</span><span className="text-muted-foreground">Sep 02</span></li>
              <li className="flex items-center justify-between"><span className="font-medium">Festival Break</span><span className="text-muted-foreground">Oct 10</span></li>
            </ul>
          </CardContent>
        </Card>
      ),
    },
    {
      key: 'documents',
      label: 'Documents',
      content: (
        <Card className="w-[95%] mx-auto rounded-xl shadow-sm border border-[hsl(var(--border))] bg-white h-full flex flex-col">
          <CardHeader className="pb-3 py-4">
            <CardTitle className="text-sm font-medium">Documents</CardTitle>
          </CardHeader>
            <CardContent className="pt-0 px-6 pb-5 grow flex flex-col">
              <ul className="text-xs space-y-2 mb-4">
                <li className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-[hsl(var(--accent))] text-white text-[10px] flex items-center justify-center">P</span><span className="font-medium">Policies Handbook.pdf</span></li>
                <li className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] text-[10px] flex items-center justify-center">L</span><span className="font-medium">Leave Guidelines.docx</span></li>
              </ul>
              <Button variant="outline" size="sm" className="self-start h-8 text-xs">View All</Button>
            </CardContent>
        </Card>
      ),
    },
  ]

  const goTo = (i: number) => setIndex((i + slides.length) % slides.length)
  const next = () => goTo(index + 1)
  const prev = () => goTo(index - 1)

  // Wheel navigation (mouse up/down)
  const wheelLockRef = useRef(false)
  const onWheel = (e: WheelEvent<HTMLDivElement>) => {
    // Only act on vertical dominant scrolls
    if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return
    if (wheelLockRef.current) return
    wheelLockRef.current = true
    if (e.deltaY > 0) {
      next()
    } else if (e.deltaY < 0) {
      prev()
    }
    // throttle to avoid rapid slide skips
    setTimeout(() => { wheelLockRef.current = false }, 450)
  }

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setIndex(i => (i + 1) % slides.length), 2000)
    return () => clearInterval(id)
  }, [paused, slides.length])

  return (
    <div
      className="p-6 md:p-8 flex flex-col gap-4 bg-[#f0f3f8] md:order-1 order-2 border-r border-[hsl(var(--border))] md:border-b-0 border-b"
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onWheel={onWheel}
    >
      <div className="flex items-center gap-2 mb-1">
        <div className="h-9 w-9 rounded-md bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] flex items-center justify-center font-semibold text-sm shadow-sm">zO</div>
        <div>
          <div className="text-base font-semibold leading-tight">zOffice</div>
        </div>
      </div>
      <div className="relative flex-1 min-h-[300px]" role="group" aria-label="Information slides">
        <div className="overflow-hidden w-full h-full rounded-xl">
          <div className="flex h-full transition-transform duration-500 ease-out" style={{ transform: `translateX(-${index * 100}%)` }} aria-live="polite">
            {slides.map(slide => (
              <div key={slide.key} className="w-full shrink-0 pr-0 h-full flex">{slide.content}</div>
            ))}
          </div>
        </div>
        <Button variant="ghost" size="lg" className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 px-0 text-2xl leading-none bg-transparent shadow-none hover:scale-105 hover:text-[hsl(var(--primary))] transition" onClick={prev} aria-label="Previous slide">‹</Button>
        <Button variant="ghost" size="lg" className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 px-0 text-2xl leading-none bg-transparent shadow-none hover:scale-105 hover:text-[hsl(var(--primary))] transition" onClick={next} aria-label="Next slide">›</Button>
        <div className="absolute inset-x-0 -bottom-14 flex items-center justify-center px-1">
          <div className="flex items-center gap-2" role="tablist" aria-label="Carousel pagination">
            {slides.map((s, i) => (
              <button key={s.key} onClick={() => goTo(i)} role="tab" aria-selected={i === index} aria-label={`${s.label} slide ${i + 1} of ${slides.length}`} aria-current={i === index ? 'true' : undefined} className={`px-3 h-7 rounded-full text-[11px] font-medium transition outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] border ${i === index ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] border-[hsl(var(--primary))] shadow-sm' : 'bg-muted/40 text-muted-foreground border-transparent hover:bg-muted/60 opacity-60'}`}>{s.label}</button>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-10 text-[10px] text-muted-foreground pt-1">© {new Date().getFullYear()} zOffice. Internal use only.</div>
    </div>
  )
}

export default CarouselSection
