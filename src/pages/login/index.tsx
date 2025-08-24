import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '@/features/auth/authSlice'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import CarouselSection from '@/components/login/CarouselSection'

const LoginPage: React.FC = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (!username || !password || loading) return
		setLoading(true)
		// Simulate auth call then redirect
		setTimeout(() => {
			setLoading(false)
			dispatch(login(username))
			navigate('/home')
		}, 700)
	}

	return (
		<div className="min-h-screen w-full flex items-center justify-center bg-[#f5f7fa] px-4 py-14 text-foreground">
			<Card className="w-full max-w-5xl border border-[hsl(var(--border))] bg-card shadow-md">
				<CardContent className="p-0">
					<div className="grid md:grid-cols-2">
						<CarouselSection />
						<div className="p-6 md:p-10 flex flex-col justify-center md:order-2 order-1 bg-white text-slate-900">
							<div className="w-full max-w-sm mx-auto">
								<div className="mb-8 text-center">
									<h1 className="text-2xl font-semibold tracking-tight">Welcome Back <span role="img" aria-label="waving hand">👋</span></h1>
									<p className="text-sm text-slate-500 mt-2">Sign in to continue to <span className="font-medium">zOffice</span></p>
								</div>
								<form onSubmit={handleSubmit} className="space-y-5" aria-label="login form">
									<div className="space-y-2">
										<label htmlFor="username" className="text-xs font-medium uppercase tracking-wide text-slate-600">User Name</label>
										<Input id="username" autoComplete="username" value={username} onChange={e => setUsername(e.target.value)} placeholder="swordsmen" />
									</div>
									<div className="space-y-2">
										<label htmlFor="password" className="text-xs font-medium uppercase tracking-wide text-slate-600">Password</label>
										<Input id="password" type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
									</div>
									<Button type="submit" disabled={loading || !username || !password} className="w-full h-11 rounded-xl bg-[#3D4CFF] hover:bg-[#2B3ACC] text-white font-medium text-sm transition">
										{loading ? 'Signing in…' : 'Login'}
									</Button>
								</form>
								<p className="mt-8 text-[11px] text-slate-500 text-center">New here? <span className="font-medium text-slate-700">Contact Admin</span> to register.</p>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

export default LoginPage
