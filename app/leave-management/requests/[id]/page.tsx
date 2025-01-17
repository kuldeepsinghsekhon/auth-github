import Header from '@/components/Header'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X } from 'lucide-react'

// In a real application, you would fetch this data from an API or database
const leaveRequest = {
  id: "1",
  employee: "Alice Johnson",
  type: "Vacation",
  startDate: "2023-07-01",
  endDate: "2023-07-05",
  status: "Pending",
  reason: "Family vacation",
  daysRequested: 5,
}

export default function LeaveRequestPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Leave Request Details</h1>
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Request #{params.id} - {leaveRequest.employee}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Leave Type</p>
                <p className="text-lg">{leaveRequest.type}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Status</p>
                <Badge
                  variant={leaveRequest.status === 'Approved' ? 'success' : leaveRequest.status === 'Rejected' ? 'destructive' : 'default'}
                >
                  {leaveRequest.status}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Start Date</p>
                <p className="text-lg">{leaveRequest.startDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">End Date</p>
                <p className="text-lg">{leaveRequest.endDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Days Requested</p>
                <p className="text-lg">{leaveRequest.daysRequested}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Reason</p>
              <p className="text-lg">{leaveRequest.reason}</p>
            </div>
            {leaveRequest.status === 'Pending' && (
              <div className="flex justify-end space-x-4 mt-6">
                <Button variant="outline" className="w-32">
                  <X className="mr-2 h-4 w-4" />
                  Reject
                </Button>
                <Button className="w-32">
                  <Check className="mr-2 h-4 w-4" />
                  Approve
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

