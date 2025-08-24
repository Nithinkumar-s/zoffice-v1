import React from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { LogOut, KeyRound, IdCard, ChevronLeft } from 'lucide-react'
import MyDetailsDialog from '@/components/profile/MyDetailsDialog'
import ChangePasswordDialog from '@/components/profile/ChangePasswordDialog'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '@/features/auth/authSlice'
import ProgressBar from '@/components/ui/ProgressBar'

// Shared application layout with persistent navbar (excluded on login route by routing structure)
const AppLayout: React.FC = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const location = useLocation()
	const showBack = location.pathname !== '/home' && location.pathname !== '/'

	// Derive page title from path segments
	const segment = location.pathname.split('/').filter(Boolean)[0] || 'home'
	const titles: Record<string,string> = {
		home: '',
		timesheet: 'Daily Activities',
		documents: 'Documents',
		employees: 'Employees',
		leave: 'Leave',
		'leave-card': 'Leave Card',
		'leave-request': 'Leave Request',
		reports: 'Reports',
		settings: 'Settings',
		'theme-demo': 'Theme Demo'
	}
	const pageTitle = titles[segment] || ''

	// Global loading state (expand to other slices as needed)
			const timesheetLoading = useSelector((state: any) => state.timesheet?.loading)

	const MenuItem: React.FC<{ label: string; onSelect: () => void; destructive?: boolean; icon?: React.ReactNode }> = ({ label, onSelect, destructive, icon }) => (
		<button
			onClick={onSelect}
			className={`w-full text-left text-sm px-3 py-2 rounded-md transition flex items-center gap-2 ${destructive ? 'text-red-300 hover:text-red-200 hover:bg-red-500/10' : 'text-white/80 hover:text-white hover:bg-white/10'}`}
			role="menuitem"
		>
			{icon}
			<span>{label}</span>
		</button>
	)

	const ProfileMenu: React.FC = () => {
		const [open, setOpen] = React.useState(false)
		const [detailsOpen, setDetailsOpen] = React.useState(false)
		const [passwordOpen, setPasswordOpen] = React.useState(false)
		const menuRef = React.useRef<HTMLDivElement | null>(null)
		const btnRef = React.useRef<HTMLButtonElement | null>(null)

		React.useEffect(() => {
			const onClick = (e: MouseEvent) => {
				if (!menuRef.current) return
				if (menuRef.current.contains(e.target as Node) || btnRef.current?.contains(e.target as Node)) return
				setOpen(false)
			}
			const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
			document.addEventListener('click', onClick)
			document.addEventListener('keydown', onKey)
			return () => { document.removeEventListener('click', onClick); document.removeEventListener('keydown', onKey) }
		}, [])

		return (
			<div className="relative">
				<button
					ref={btnRef}
						onClick={() => setOpen(o => !o)}
						className="group flex items-center gap-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
						aria-haspopup="menu"
						aria-expanded={open}
					>
						<span className="h-9 w-9 rounded-full bg-white/10 ring-1 ring-white/15 flex items-center justify-center text-xs font-semibold tracking-wide backdrop-blur-sm select-none">NS</span>
						<span className="hidden md:inline text-white/80 group-hover:text-white text-sm font-medium">Nithin</span>
						<svg className="h-4 w-4 text-white/60 group-hover:text-white/70 transition" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.939l3.71-3.71a.75.75 0 111.06 1.061l-4.24 4.24a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z" clipRule="evenodd" /></svg>
				</button>
				{open && (
					<div
						ref={menuRef}
						className="absolute right-0 mt-2 w-48 rounded-md border border-white/10 bg-[#0B153F]/95 backdrop-blur-sm shadow-lg p-1 z-50 animate-in fade-in slide-in-from-top-1"
						role="menu"
						aria-label="User menu"
					>
						<MenuItem label="My Details" icon={<IdCard className="h-4 w-4" />} onSelect={() => { setDetailsOpen(true); setOpen(false); }} />
						<MenuItem label="Change Password" icon={<KeyRound className="h-4 w-4" />} onSelect={() => { setPasswordOpen(true); setOpen(false); }} />
						<div className="my-1 h-px bg-white/10" />
						<MenuItem label="Logout" icon={<LogOut className="h-4 w-4" />} destructive onSelect={() => { dispatch(logout()); navigate('/'); }} />
					</div>
				)}
				<MyDetailsDialog open={detailsOpen} onOpenChange={setDetailsOpen} />
				<ChangePasswordDialog open={passwordOpen} onOpenChange={setPasswordOpen} />
			</div>
		)
	}

		return (
					<div className="h-screen flex flex-col bg-background text-foreground">
								 <ProgressBar loading={!!timesheetLoading} />
				{/* Fixed navbar so vertical overflow in content never affects its width/position */}
				<header className="fixed top-0 left-0 right-0 w-full z-50 h-14 flex items-center px-4 md:px-6 text-white border-b border-white/5 shadow-[0_2px_4px_-1px_rgba(0,0,0,0.45),0_1px_0_0_rgba(255,255,255,0.04)] bg-[linear-gradient(135deg,#03093A_0%,#041247_35%,#4dafff_52%,#061B6F_100%)]">
					<div className="flex items-center gap-3 font-semibold tracking-tight select-none">
						{/* Logo */}
						<img
							src="/logo.svg"
							alt="zOffice Logo"
							className="h-8 w-8 object-contain select-none"
							onError={(e) => { (e.currentTarget.style.display = 'none'); (e.currentTarget.nextElementSibling as HTMLElement)?.classList.remove('sr-only') }}
						/>
						<span className="sr-only inline-flex h-8 w-8 items-center justify-center rounded-md bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] text-sm font-bold">z</span>
						<span className="hidden sm:inline">zOffice</span>
					</div>
					<div className="ml-auto flex items-center gap-4 text-sm">
						<ProfileMenu />
					</div>
					<div className="absolute bottom-0 left-0 right-0 h-px bg-[linear-gradient(90deg,transparent,#4dafff80,transparent)]" />
				</header>
				{/* Content area (no scroll); individual pages manage their own scrollable sections */}
				<div className="flex-1 min-h-0 pt-14 pb-12 flex flex-col overflow-auto">
					{(showBack || pageTitle) && (
						<div className="w-full px-6 md:px-10 flex items-center gap-3 py-6 max-w-7xl mx-auto">
							{showBack && (
								<button
									onClick={() => { if (window.history.length > 1) navigate(-1); else navigate('/home'); }}
									className="inline-flex items-center gap-1 text-sm text-foreground/70 hover:text-foreground transition font-medium cursor-pointer"
									aria-label="Go back"
								>
									<ChevronLeft className="h-4 w-4" />
									<span>Back</span>
								</button>
							)}
							{pageTitle && <h1 className="text-2xl font-semibold tracking-tight leading-none">{pageTitle}</h1>}
						</div>
					)}
					<Outlet />
				</div>
				<footer className="fixed bottom-0 left-0 right-0 h-8 flex items-center justify-center text-center text-[10px] sm:text-xs text-foreground/70 border-t border-[hsl(var(--border))] bg-white z-40">© {new Date().getFullYear()} zLink Inc. All Rights Reserved.</footer>
			</div>
		)
}

export default AppLayout
