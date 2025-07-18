import { AuthButton } from "@/components/auth-button"
//import { signIn, signOut, useSession } from "next-auth/react"
//import { auth, signOut } from 'app/auth';
import { auth} from "@/lib/auth"
import Header from '@/components/Header'
import MetricsOverview from '@/components/MetricsOverview'
import EmployeeList from '@/components/EmployeeList'
import QuickActions from '@/components/QuickActions'

export default async function Home() {
 // const { data: session, status } = useSession()
 const session = await auth();
  
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
        <pre className="whitespace-pre-wrap break-all px-4 py-6">
            {JSON.stringify(session, null, 2)}
          </pre>
          <AuthButton />
      </main>
    </div>
   


  )
}

