import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import store from '@/app/store'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { Toaster } from 'sonner'
import LoginPage from '@/pages/login'
import HomePage from '@/pages/home'
import TimesheetPage from '@/pages/timesheet'
import LeaveRequestPage from '@/pages/leave-request'
import LeaveCardPage from '@/pages/leave-card'
import AppLayout from '@/layouts/AppLayout'
// import ProtectedRoute from '@/components/auth/ProtectedRoute' // Temporarily disabled per request
import { useSelector } from 'react-redux'
import type { RootState } from '@/app/store'
import ErrorFallback from '@/components/ErrorFallback'
import EmployeeDetailsPage from './pages/employee-details'

// Redirect component to send authenticated users away from login
const LoginGate: React.FC = () => {
  const isAuth = useSelector((s: RootState) => s.auth.isAuthenticated)
  if (isAuth) return <HomePage />
  return <LoginPage />
}

const router = createBrowserRouter([
  { path: '/', element: <LoginGate />, errorElement: <ErrorFallback /> },
  {
    path: '/',
    element: <AppLayout />,
    children: [
      // ProtectedRoute removed temporarily; direct route exposure
  { path: 'home', element: <HomePage /> },
  { path: 'timesheet', element: <TimesheetPage /> },
  { path: 'leave-request', element: <LeaveRequestPage /> }
  ,{ path: 'leave-card', element: <LeaveCardPage /> },
  { path: 'employee-details', element: <EmployeeDetailsPage /> }
    ]
  },
  { path: '*', element: <ErrorFallback /> }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster position="top-right" richColors closeButton />
    </Provider>
  </StrictMode>
)
