'use client'

import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useSearch } from '@/hooks/use-search'
import { Loader2 } from 'lucide-react'

export function ItemsSearch() {
  const { searchTerm, isPending, handleSearch, handleLimit, currentLimit } = useSearch()

  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="relative">
        <Input
          placeholder="Search products..."
          value={searchTerm ?? ''}
          onChange={(e) => handleSearch(e.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {isPending && (
          <div className="absolute right-2 top-2">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        )}
      </div>
      <Select
        value={currentLimit}
        onValueChange={handleLimit}
        disabled={isPending}
      >
        <SelectTrigger className="w-[110px]">
          <SelectValue placeholder="# per page" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="10">10 per page</SelectItem>
          <SelectItem value="20">20 per page</SelectItem>
          <SelectItem value="50">50 per page</SelectItem>
          <SelectItem value="100">100 per page</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}