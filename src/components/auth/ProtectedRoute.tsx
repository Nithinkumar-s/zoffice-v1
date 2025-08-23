import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '@/app/store'

// Protects routes under AppLayout
const ProtectedRoute: React.FC = () => {
  const isAuth = useSelector((s: RootState) => s.auth.isAuthenticated)
  const location = useLocation()
  if (!isAuth) {
    return <Navigate to="/" replace state={{ from: location }} />
  }
  return <Outlet />
}

export default ProtectedRoute
