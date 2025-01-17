import Link from 'next/link'
import { Bell, User } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-800">
          HR Manager
        </Link>
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-gray-800">
            <Bell size={20} />
          </button>
          <button className="text-gray-600 hover:text-gray-800">
            <User size={20} />
          </button>
        </div>
      </nav>
    </header>
  )
}

