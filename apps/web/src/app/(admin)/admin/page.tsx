import AdminStats from "@/components/admin/dashboard/admin-stats"
import AnnouncementList from "@/components/admin/announcements/announcement-list"
import ReportsTable from "@/components/admin/reports/reports-table"
import UsersTable from "@/components/admin/users/users-table"

export default function AdminPage() {
  return (
    <main className="min-h-screen p-6 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <h1 className="text-4xl font-bold">
          Admin Dashboard
        </h1>

        <AdminStats />

        <AnnouncementList />

        <ReportsTable />

        <UsersTable />
      </div>
    </main>
  )
}