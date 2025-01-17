import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ContractInformation({ employee }: { employee?: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contract Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="contractType">Contract Type</Label>
          <Select defaultValue={employee?.contractType}>
            <SelectTrigger id="contractType">
              <SelectValue placeholder="Select contract type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fullTime">Full-time</SelectItem>
              <SelectItem value="partTime">Part-time</SelectItem>
              <SelectItem value="contractor">Contractor</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Input id="startDate" type="date" defaultValue={employee?.startDate || ''} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endDate">End Date (if applicable)</Label>
          <Input id="endDate" type="date" defaultValue={employee?.endDate || ''} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="position">Position</Label>
          <Input id="position" defaultValue={employee?.position || ''} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="department">Department</Label>
          <Input id="department" defaultValue={employee?.department || ''} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="salary">Basic Salary</Label>
          <Input id="salary" type="number" defaultValue={employee?.salary || ''} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="noticePeriod">Notice Period</Label>
          <Input id="noticePeriod" defaultValue={employee?.noticePeriod || ''} required />
        </div>
      </CardContent>
    </Card>
  )
}

