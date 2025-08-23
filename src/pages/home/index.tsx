import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import kpisData from '@/data/kpis.json'
import { CalendarClock, Leaf, IdCard, User, Users, Lock, FileText, FolderOpen, BarChart2, HelpCircle } from 'lucide-react'
// Sparkline removed from this file; handled inside HoursCard
import HoursCard from '@/components/dashboard/HoursCard'

// Home Dashboard Page
const HomePage: React.FC = () => {
	type KPI = { id: string; label: string; value: string; color: string }
	const all = kpisData as KPI[]
	const leaveKpi = all.find(k => k.id === 'leave')

	const quote = 'Effort turns ordinary into exceptional.'

	// (Removed Leave & Allocation chart data per request)

	return (
		<div className="min-h-screen flex flex-col bg-background text-foreground">
			<header className="h-14 bg-[#03093A] text-white flex items-center px-6 shadow-sm">
				<div className="flex items-center gap-2 font-semibold tracking-tight">
					<span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] text-sm font-bold">z</span>
					<span className="hidden sm:inline">zOffice</span>
				</div>
				<div className="ml-auto flex items-center gap-4 text-sm">
					<button className="text-white/80 hover:text-white transition">Logout</button>
				</div>
			</header>
			<div className="h-0.5 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--secondary))] to-[hsl(var(--accent))]" />
			<main className="flex-1 mx-auto w-full max-w-7xl px-6 md:px-10 py-10 space-y-10">
				{/* Unified Welcome + KPIs */}
				<section>
					<Card className="border-[hsl(var(--border))] backdrop-blur-sm bg-gradient-to-tr from-[#f6f9ff] via-white to-[#f3f7ff]">
						<CardContent className="p-6 lg:p-7">
							<div className="flex flex-col lg:flex-row gap-8 lg:items-start">
								<div className="flex-1 min-w-0 space-y-4">
									<div>
										<h2 className="text-xl font-semibold tracking-tight text-foreground">Good Afternoon, Nithinkumar S!</h2>
										<p className="mt-1 text-sm text-muted-foreground">Here's your summary for today.</p>
									</div>
									<div className="flex flex-wrap gap-3">
										<Button size="sm" className="bg-[hsl(var(--primary))] text-white">Open Time Sheet</Button>
										<Button size="sm" variant="outline">Request Leave</Button>
									</div>
								</div>
								<div className="flex flex-col gap-4 lg:w-[520px]">
									<div className="w-full flex flex-col gap-3 md:grid md:grid-cols-3 md:items-stretch min-w-0">
										<HoursCard className="md:col-span-2" />
										{leaveKpi && (
											<Card className="md:col-span-1 h-full border-[hsl(var(--border))] shadow-sm bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 flex flex-col">
												<CardHeader className="pb-2">
													<CardTitle className="text-sm font-semibold tracking-wide uppercase">{leaveKpi.label}</CardTitle>
												</CardHeader>
												<CardContent className="pt-0 p-6 flex flex-col justify-center gap-2 h-full">
													<div className="text-2xl font-semibold leading-none">{leaveKpi.value}</div>
												</CardContent>
											</Card>
										)}
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</section>

				{/* Quote / Insight (above Actions) */}
				<section aria-labelledby="quote-heading">
					<Card className="relative overflow-hidden border-[hsl(var(--border))] bg-gradient-to-r from-[hsl(var(--primary))]/12 via-white to-[hsl(var(--secondary))]/10">
						{/* Accent bar */}
						<div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[hsl(var(--primary))] to-[hsl(var(--secondary))]" />
						<CardContent className="px-6 py-5 md:py-6 flex flex-col gap-3">
							<div className="flex items-start gap-3">
								<span className="text-4xl leading-none select-none opacity-30 -mt-1">“</span>
								<div className="flex-1 min-w-0">
									<h3 id="quote-heading" className="text-[11px] font-semibold tracking-wide uppercase text-foreground/60 mb-1">Quote of the Day</h3>
										<p className="text-sm md:text-base font-medium text-foreground/90 leading-relaxed italic">{quote}</p>
								</div>
								<span className="text-4xl leading-none select-none opacity-20 self-end hidden sm:inline">”</span>
							</div>
						</CardContent>
						{/* Subtle radial glow */}
						<div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(circle_at_30%_40%,black,transparent_70%)] bg-[hsl(var(--primary))/6]" />
					</Card>
				</section>

				{/* Actions */}
				<section>
					<Card>
						<CardHeader className="pb-4">
								<CardTitle className="text-sm font-semibold tracking-wide uppercase">Actions</CardTitle>
							</CardHeader>
						<CardContent>
								<div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
								{[
									{ label: 'Time Sheet', icon: <CalendarClock className="h-7 w-7" /> },
									{ label: 'Leave Request', icon: <Leaf className="h-7 w-7" /> },
									{ label: 'Leave Card', icon: <IdCard className="h-7 w-7" /> },
									{ label: 'My Details', icon: <User className="h-7 w-7" /> },
									{ label: 'Employee Details', icon: <Users className="h-7 w-7" /> },
									{ label: 'Change Password', icon: <Lock className="h-7 w-7" /> },
									{ label: 'Time Sheet Report', icon: <FileText className="h-7 w-7" /> },
									{ label: 'Documents', icon: <FolderOpen className="h-7 w-7" /> },
									{ label: 'Reports', icon: <BarChart2 className="h-7 w-7" /> },
									{ label: 'Help', icon: <HelpCircle className="h-7 w-7" /> }
								].map(a => (
									<button key={a.label} className="group flex flex-col items-center gap-2 text-center outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] rounded-md">
										<span className="h-14 w-14 rounded-full border border-[hsl(var(--border))] flex items-center justify-center text-[hsl(var(--primary))] bg-white group-hover:bg-[hsl(var(--primary))]/5 transition shadow-sm">
											{a.icon}
										</span>
										<span className="text-xs font-medium text-foreground/90 max-w-[7rem] leading-tight">{a.label}</span>
									</button>
								))}
							</div>
							<div className="mt-6">
									{/* Customize button removed as requested */}
							</div>
						</CardContent>
					</Card>
				</section>
			</main>
			<footer className="py-6 text-center text-xs text-muted-foreground border-t border-[hsl(var(--border))]">© {new Date().getFullYear()} zLink Inc. All Rights Reserved.</footer>
		</div>
	)
}

export default HomePage
