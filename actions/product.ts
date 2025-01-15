'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { stringify } from 'csv-stringify/sync'

export async function getProducts(
  search = '',
  page = 1,
  limit = 10,
  status?: string,
    sort = 'availableAt',
  order: 'asc' | 'desc' = 'desc'
) {
  const skip = Math.max(0, (page - 1) * limit)
  
  const where = {
    AND: [
      search ? {
        OR: [
          { name: { contains: search } }
        ]
      } : {},
      status && status !== 'all' ? { status } : {}
    ]
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [sort]: order }
    }),
    prisma.product.count({ where })
  ])

  return {
    products,
    totalPages: Math.ceil(total / limit),
    total
  }
}
export async function  createProduct(data: {
  name: string
  price: number
  description?: string
  imageUrl?: string
  status?: string
  stock?: number
  availableAt?: string
}) {
  const product = await prisma.product.create({ data })
  revalidatePath('/dashboard/products')
  return product
}

export async function  updateProduct(id: string, data: Partial<Product>) {
  const product = await prisma.product.update({
    where: { id },data
  })
  revalidatePath('/dashboard/products')
  return product
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({ where: { id } })
  revalidatePath('/dashboard/products')
}

export async function exportProducts(filters: {
  search?: string
  status?: string
  sort?: string
  order?: 'asc' | 'desc'
}) {
  try {
    const where = {
      AND: [
        filters.search ? {
          OR: [
            { name: { contains: filters.search } }
          ]
        } : {},
        filters.status && filters.status !== 'all' ? { status: filters.status } : {}
      ]
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: { [filters.sort || 'availableAt']: filters.order || 'desc' }
    })

    const data = products.map(product => ({
      ID: product.id,
      Name: product.name,
      Description: product.description || '',
      Price: product.price,
      Stock: product.stock,
      Status: product.status,
      'Available At': new Date(product.availableAt).toLocaleDateString()
    }))

    const csv = stringify(data, {
      header: true,
      columns: ['ID', 'Name', 'Description', 'Price', 'Stock', 'Status', 'Available At']
    })

    return csv
  } catch (error) {
    console.error('Export error:', error)
    throw new Error('Failed to export products')
  }
}