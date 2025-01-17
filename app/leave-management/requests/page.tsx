import Header from '@/components/Header'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import LeaveRequestList from '@/components/LeaveRequestList'

export default function LeaveRequestsPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Leave Requests</h1>
        <Card>
          <CardHeader>
            <CardTitle>All Leave Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <LeaveRequestList />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

