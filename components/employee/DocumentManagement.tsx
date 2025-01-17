import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Upload } from 'lucide-react'

const documentTypes = [
  "Contracts",
  "Passport",
  "Visa",
  "EID",
  "Certificates",
  "Degrees",
  "CV"
]

export function DocumentManagement({ employee }: { employee: any }) {
  const documents = employee?.documents || {}

  return (
    <Card>
      <CardHeader>
        <CardTitle>Document Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Document Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documentTypes.map((docType) => (
              <TableRow key={docType}>
                <TableCell>{docType}</TableCell>
                <TableCell>{documents[docType] ? "Uploaded" : "Not Uploaded"}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

