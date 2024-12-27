import { RouterProvider } from "@tanstack/react-router"
import { router } from "./route"
import { ThemeProvider } from "./components/Providers/ThemeProvider"

function InnerApp() {
  return <RouterProvider router={router} />
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <InnerApp />
    </ThemeProvider>
  )
}

export default App
