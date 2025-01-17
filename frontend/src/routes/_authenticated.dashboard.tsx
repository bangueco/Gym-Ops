import RecentMembersTableList from '@/components/RecentMembersTableList'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: DashboardPage,
})

function DashboardPage() {
  return (
    <div>
      <h1 className="text-4xl mb-12">Dashboard</h1>
      <div className="flex gap-3">
        <div className="p-3 border-primary border-2 rounded-md w-60">
          <h1 className="text-md font-extrabold">TOTAL MEMBERS</h1>
          <p>2000</p>
        </div>
        <div className="p-3 border-primary border-2 rounded-md w-60">
          <h1 className="text-md font-extrabold">ACTIVE MEMBERSHIPS</h1>
          <p>150</p>
        </div>
        <div className="p-3 border-primary border-2 rounded-md w-60">
          <h1 className="text-md font-extrabold">TOTAL REVENUE</h1>
          <p>₱12,500</p>
        </div>
      </div>
      <div className="mt-12">
        <h1>Recent members</h1>
        <RecentMembersTableList />
      </div>
      <div className="mt-12">
        <h1>Expiring memberships</h1>
      </div>
    </div>
  )
}