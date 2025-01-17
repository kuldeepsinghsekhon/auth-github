import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function VisaAndDocuments({ employee }: { employee?: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Visa and Documents</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="visaType">Visa Type</Label>
          <Input id="visaType" defaultValue={employee?.visaType || ''} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="visaNumber">Visa Number</Label>
          <Input id="visaNumber" defaultValue={employee?.visaNumber || ''} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="visaIssueDate">Visa Issue Date</Label>
          <Input id="visaIssueDate" type="date" defaultValue={employee?.visaIssueDate || ''} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="visaExpiryDate">Visa Expiry Date</Label>
          <Input id="visaExpiryDate" type="date" defaultValue={employee?.visaExpiryDate || ''} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cecNumber">CEC Number</Label>
          <Input id="cecNumber" defaultValue={employee?.cecNumber || ''} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="laborCardNumber">Labor Card Number</Label>
          <Input id="laborCardNumber" defaultValue={employee?.laborCardNumber || ''} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="emiratesId">Emirates ID</Label>
          <Input id="emiratesId" defaultValue={employee?.emiratesId || ''} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="drivingLicense">Driving License Number</Label>
          <Input id="drivingLicense" defaultValue={employee?.drivingLicense || ''} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="healthCardNumber">Health Card Number</Label>
          <Input id="healthCardNumber" defaultValue={employee?.healthCardNumber || ''} />
        </div>
      </CardContent>
    </Card>
  )
}

