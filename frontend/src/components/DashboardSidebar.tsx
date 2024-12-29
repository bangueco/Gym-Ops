import { Link } from "@tanstack/react-router"

export default function DashboardSidebar() {
  return (
    <nav className="flex flex-col w-56 h-screen p-2 bg-secondary items-center">
      <h1 className="text-2xl font-bold text-primary">GymOps</h1>
      <div className="flex flex-col gap-2 mt-20">
        <Link className="text-md hover:border-primary border p-2 rounded-md" to="/dashboard">Dashboard</Link>
        <Link className="text-md hover:border-primary border p-2 rounded-md" to="/manage-members">Manage Members</Link>
        <Link className="text-md hover:border-primary border p-2 rounded-md" to="/dashboard">Manage Memberships</Link>
        <Link className="text-md hover:border-primary border p-2 rounded-md" to="/dashboard">Settings</Link>
      </div>
    </nav>
  )
}