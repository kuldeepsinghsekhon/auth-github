import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function AssetManagement({ employee }: { employee: any }) {
  const assets = employee?.assets || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Asset Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asset Type</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Serial Number</TableHead>
              <TableHead>Assigned Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assets.map((asset: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{asset.type}</TableCell>
                <TableCell>{asset.model}</TableCell>
                <TableCell>{asset.serialNumber}</TableCell>
                <TableCell>{asset.assignedDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

