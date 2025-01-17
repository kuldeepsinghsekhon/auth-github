import { ProductsClient } from './products-client'
import { getProducts } from '@/actions/product'

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { 
    q?: string
    page?: string
    status?: string
    limit?: string
    sort?: string
    order?: string 
  }
}) {
  const search = searchParams.q ?? ''
  const page = Math.max(1, Number(searchParams.page) || 1)
  const limit = Number(searchParams.limit) || 10
  const status = searchParams.status
  const sort = searchParams.sort || 'availableAt'
  const order = (searchParams.order as 'asc' | 'desc') || 'desc'

  const { products, totalPages, total } = await getProducts(
    search,
    page,
    limit,
    status,
    sort,
    order
  )

  return (
    <ProductsClient
      products={products}
      currentPage={page}
      totalPages={totalPages}
      totalItems={total}
      searchParams={searchParams}
    />
  )
}