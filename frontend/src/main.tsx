import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from '@tanstack/react-router'
import { ThemeProvider } from './components/Providers/ThemeProvider'
import { router } from './router'

import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from './lib/queryClient'
import { useAuth } from './hooks/useAuth'

function InnerApp() {
  const auth = useAuth()

  return (
    <RouterProvider router={router} context={{ auth }} />
  )
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <InnerApp />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

const rootElement = document.getElementById('root')!

if (!rootElement.innerHTML) {
  const root = createRoot(rootElement)
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
