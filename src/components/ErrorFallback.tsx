import React from 'react'
import { isRouteErrorResponse, useRouteError, Link } from 'react-router-dom'

const ErrorFallback: React.FC = () => {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center px-6">
          <div>
            <p className="text-sm font-medium text-[hsl(var(--primary))] tracking-wide">404</p>
            <h1 className="mt-2 text-2xl font-semibold">Page not found</h1>
            <p className="mt-2 text-sm text-muted-foreground max-w-sm">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/home" className="inline-flex items-center rounded-md bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] px-4 py-2 text-sm font-medium shadow-sm hover:opacity-90 transition">Go to Dashboard</Link>
            <Link to="/" className="inline-flex items-center rounded-md border border-[hsl(var(--border))] px-4 py-2 text-sm font-medium hover:bg-foreground/5 transition">Login</Link>
          </div>
        </div>
      )
    }
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-6">
        <p className="text-sm font-medium text-[hsl(var(--primary))] tracking-wide">Error {error.status}</p>
        <h1 className="text-2xl font-semibold">{error.statusText}</h1>
        {error.data && <p className="text-sm text-muted-foreground max-w-sm">{String(error.data)}</p>}
        <Link to="/home" className="inline-flex items-center rounded-md bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] px-4 py-2 text-sm font-medium shadow-sm hover:opacity-90 transition">Back Home</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-6">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="text-sm text-muted-foreground max-w-sm">An unexpected error occurred. Please try again or return to the dashboard.</p>
      <Link to="/home" className="inline-flex items-center rounded-md bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] px-4 py-2 text-sm font-medium shadow-sm hover:opacity-90 transition">Back Home</Link>
    </div>
  )
}

export default ErrorFallback
