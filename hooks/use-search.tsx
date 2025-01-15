'use client'

import { useState, useCallback, useTransition, useEffect } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

export function useSearch() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [searchTerm, setSearchTerm] = useState('')

  // Sync URL params with state
  useEffect(() => {
    setSearchTerm(searchParams.get('q') || '')
  }, [searchParams])

  const createQueryString = useCallback(
    (params: Record<string, string>) => {
      const newParams = new URLSearchParams(searchParams.toString())
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          newParams.set(key, value)
        } else {
          newParams.delete(key)
        }
      })
      return newParams.toString()
    },
    [searchParams]
  )

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term)
    startTransition(() => {
      const queryString = createQueryString({
        q: term,
        page: '1'
      })
      router.push(`${pathname}?${queryString}`)
    })
  }, [router, pathname, createQueryString])

  const handleLimit = useCallback((value: string) => {
    startTransition(() => {
      const queryString = createQueryString({
        limit: value,
        page: '1'
      })
      router.push(`${pathname}?${queryString}`)
    })
  }, [router, pathname, createQueryString])
  const handleSort = useCallback((field: string) => {
    const currentSort = searchParams.get('sort')
    const currentOrder = searchParams.get('order')
    
    let newOrder = 'asc'
    if (currentSort === field && currentOrder === 'asc') {
      newOrder = 'desc'
    }

    startTransition(() => {
      const queryString = createQueryString({
        sort: field,
        order: newOrder
      })
      router.push(`${pathname}?${queryString}`)
    })
  }, [router, pathname, searchParams, createQueryString])

  return {
    searchTerm,
    isPending,
    handleSearch,
    handleLimit,
    handleSort,
    sortField: searchParams.get('sort') ?? '',
    sortOrder: searchParams.get('order') ?? '',
    currentLimit: searchParams.get('limit') ?? '10'
  }
}