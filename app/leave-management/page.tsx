import Header from '@/components/Header'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { Calendar, ClipboardList, FileText } from 'lucide-react'
import LeaveRequestList from '@/components/LeaveRequestList'

export default function LeaveManagementPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Leave Management</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Pending Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">12</p>
              <Link href="/leave-management/requests">
                <Button className="mt-4 w-full">
                  <Calendar className="mr-2 h-4 w-4" />
                  View Requests
                </Button>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Leave Balances</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">25 days</p>
              <Link href="/leave-management/balances">
                <Button className="mt-4 w-full">
                  <ClipboardList className="mr-2 h-4 w-4" />
                  View Balances
                </Button>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Leave Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">4 reports</p>
              <Link href="/leave-management/reports">
                <Button className="mt-4 w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Reports
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        <LeaveRequestList />
      </main>
    </div>
  )
}

