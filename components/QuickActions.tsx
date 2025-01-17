import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserPlus, FileText, Calendar, MessageSquare, Briefcase } from 'lucide-react'

export default function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      
      <CardContent className="grid gap-4">
      <Link href="/employees/add">
        <Button className="w-full justify-start">
          <UserPlus className="mr-2 h-4 w-4" />
          Add New Employee
        </Button>
        </Link>
        <Link href="/leave-management" className="w-full">
          <Button className="w-full justify-start" variant="outline">
            <Briefcase className="mr-2 h-4 w-4" />
            Leave Management
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

