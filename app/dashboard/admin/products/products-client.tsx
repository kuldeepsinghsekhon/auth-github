'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { File, PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductsTable } from './products-table'
import { ItemsSearch } from './Items-search'
import { AddProductDialog } from './add-product-dialog'
import { type Product } from '@prisma/client'
import { ExportButton } from './export-button'

interface ProductsClientProps {
    products: Product[]
    currentPage: number
    totalPages: number
    totalItems: number
    searchParams: Record<string, string | undefined>
}

export function ProductsClient({
    products,
    currentPage,
    totalPages,
    totalItems,
    searchParams
}: ProductsClientProps) {
    const [addProductOpen, setAddProductOpen] = useState(false)

    return (
        <Tabs defaultValue="all">
            <div className="flex items-center justify-between">
                <TabsList>
                    <TabsTrigger value="all">All Products</TabsTrigger>
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="draft">Draft</TabsTrigger>
                    <TabsTrigger value="archived">Archived</TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2">
                <ExportButton searchParams={searchParams} />
                    <Button
                        size="sm"
                        className="h-8 gap-1"
                        onClick={() => setAddProductOpen(true)}
                    >
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only">Add Product</span>
                    </Button>
                </div>
            </div>

            <AddProductDialog
                open={addProductOpen}
                onClose={() => setAddProductOpen(false)}
            />

            <TabsContent value="all" className="mt-4">
                <ItemsSearch />
                <ProductsTable
                    products={products}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={totalItems}
                />
            </TabsContent>
        </Tabs>
    )
}