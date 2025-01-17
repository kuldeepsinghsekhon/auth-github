import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle } from 'lucide-react'

export function QualificationsTraining({ employee }: { employee: any }) {
  const trainings = employee?.trainings || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Qualifications & Training Records</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Training Name</TableHead>
              <TableHead>ISO Number</TableHead>
              <TableHead>Enrollment Date</TableHead>
              <TableHead>Feedback</TableHead>
              <TableHead>Evaluation</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trainings.map((training: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{training.name}</TableCell>
                <TableCell>{training.isoNumber}</TableCell>
                <TableCell>{training.enrollmentDate}</TableCell>
                <TableCell>{training.feedback}</TableCell>
                <TableCell>{training.evaluation}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button className="mt-4">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Training Record
        </Button>
      </CardContent>
    </Card>
  )
}

