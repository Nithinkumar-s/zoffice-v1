import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import LoginPage from '@/pages/login'
import HomePage from '@/pages/home'
import ErrorFallback from '@/components/ErrorFallback'

const router = createBrowserRouter([
  { path: '/', element: <LoginPage />, errorElement: <ErrorFallback /> },
  { path: '/home', element: <HomePage />, errorElement: <ErrorFallback /> },
  { path: '*', element: <ErrorFallback /> }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
