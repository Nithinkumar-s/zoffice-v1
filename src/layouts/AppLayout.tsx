import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { Home, LogOut } from 'lucide-react'

interface NavItem { label: string; to: string; icon: React.ReactNode }

const navItems: NavItem[] = [
	{ label: 'Home', to: '/home', icon: <Home className="h-5 w-5" /> }
]

const AppLayout: React.FC = () => {
		return (
			<div className="min-h-screen w-full flex bg-background text-foreground">
				<aside
					className="group/sidebar relative z-40 w-16 hover:w-56 focus-within:w-56 shrink-0 border-r border-[hsl(var(--border))] bg-white flex flex-col transition-[width] duration-300 ease-in-out"
				>
					<div className="h-14 flex items-center gap-2 px-3 border-b border-[hsl(var(--border))]">
						<span className="inline-flex h-8 w-8 flex-none items-center justify-center rounded-md bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] text-sm font-bold">z</span>
						<span className="font-semibold tracking-tight whitespace-nowrap overflow-hidden opacity-0 translate-x-2 transition-all duration-300 group-hover/sidebar:opacity-100 group-hover/sidebar:translate-x-0 group-hover/sidebar:overflow-visible focus-within:opacity-100 focus-within:translate-x-0">zOffice</span>
					</div>
					<nav className="flex-1 overflow-y-auto p-2 space-y-1" aria-label="Main navigation">
						{navItems.map(item => (
							<NavLink
								key={item.label}
								to={item.to}
								className={({ isActive }) => [
									'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
									isActive ? 'bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]' : 'text-foreground/60 hover:text-foreground hover:bg-foreground/5'
								].join(' ')}
							>
								<span className="flex h-5 w-5 items-center justify-center text-current">{item.icon}</span>
								<span className="whitespace-nowrap overflow-hidden opacity-0 translate-x-2 transition-[opacity,transform] duration-300 group-hover/sidebar:opacity-100 group-hover/sidebar:translate-x-0 focus-within:opacity-100 focus-within:translate-x-0">{item.label}</span>
							</NavLink>
						))}
					</nav>
					<div className="p-2 border-t border-[hsl(var(--border))] mt-auto">
						<button className="w-full flex items-center gap-3 rounded-md px-3 py-2 text-xs font-medium text-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-colors">
							<LogOut className="h-4 w-4" />
							<span className="whitespace-nowrap overflow-hidden opacity-0 translate-x-2 transition-[opacity,transform] duration-300 group-hover/sidebar:opacity-100 group-hover/sidebar:translate-x-0">Logout</span>
						</button>
					</div>
				</aside>
				<main className="flex-1 min-w-0 p-5 md:p-8">
					<Outlet />
				</main>
			</div>
		)
}

export default AppLayout
