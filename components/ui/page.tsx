import Header from '@/components/Header'
import MetricsOverview from '@/components/MetricsOverview'
import EmployeeList from '@/components/EmployeeList'
import QuickActions from '@/components/QuickActions'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">HR Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <MetricsOverview />
            <EmployeeList />
          </div>
          <div className="md:col-span-1">
            <QuickActions />
          </div>
        </div>
      </main>
    </div>
  )
}

