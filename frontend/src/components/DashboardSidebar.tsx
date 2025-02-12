import { useLogoutMutation } from "@/api/auth-query"
import { useAuth } from "@/hooks/useAuth"
import { Link } from "@tanstack/react-router"
import toast from "react-hot-toast"

export default function DashboardSidebar() {

  const logOutMutation = useLogoutMutation()
  const auth = useAuth()

  const onPressLogout = async () => {
    try {
      await logOutMutation.mutateAsync()
      auth.logout()
      toast.success("Logged out successfully")
    } catch {
      toast.error("Failed to logout")
    }
  }

  return (
    <nav className="flex flex-col w-64 h-screen p-2 bg-secondary items-center">
      <h1 className="text-2xl font-bold text-primary">GymOps</h1>
      <div className="flex flex-col gap-2 mt-20 w-full">
        <Link className="text-sm hover:border-primary border p-2 rounded-md" to="/dashboard">Dashboard</Link>
        <Link className="text-sm hover:border-primary border p-2 rounded-md" to="/manage-members">Manage Members</Link>
        <Link className="text-sm hover:border-primary border p-2 rounded-md" to="/manage-memberships">Manage Memberships</Link>
        <Link className="text-sm hover:border-primary border p-2 rounded-md" to="/dashboard">Settings</Link>
        <button onClick={onPressLogout} className="text-sm hover:border-primary border p-2 rounded-md text-left">Logout</button>
      </div>
    </nav>
  )
}