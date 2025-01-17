'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { File } from 'lucide-react'
import { toast } from 'sonner'
import { exportProducts } from '@/actions/product'

interface ExportButtonProps {
  searchParams: Record<string, string | undefined>
}

export function ExportButton({ searchParams }: ExportButtonProps) {
  const [loading, setLoading] = useState(false)

  const handleExport = async () => {
    setLoading(true)
    try {
      const csv = await exportProducts({
        search: searchParams.q,
        status: searchParams.status,
        sort: searchParams.sort,
        order: searchParams.order as 'asc' | 'desc'
      })
      
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      
      link.setAttribute('href', url)
      link.setAttribute('download', `products-${new Date().toISOString().split('T')[0]}.csv`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      
      toast.success('Export completed')
    } catch (error) {
      toast.error('Failed to export products')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button 
      size="sm" 
      variant="outline" 
      className="h-8 gap-1"
      onClick={handleExport}
      disabled={loading}
    >
      <File className="h-3.5 w-3.5" />
      <span className="sr-only sm:not-sr-only">
        {loading ? 'Exporting...' : 'Export'}
      </span>
    </Button>
  )
}