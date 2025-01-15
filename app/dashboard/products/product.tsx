import { useState } from "react"
import { deleteProduct, updateProduct } from "@/actions/product"
import {DeleteDialog,EditDialog} from './product-dialog'
import { toast } from "sonner"
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import { type Product } from "@prisma/client";

export function Product({ product }: { product: Product }) {
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    try {
      await deleteProduct(product.id)
      toast.success("Product deleted successfully")
    } catch (error) {
      toast.error("Failed to delete product")
    } finally {
      setLoading(false)
      setDeleteOpen(false)
    }
  }
  return (
    <TableRow>
      
      <TableCell className="hidden sm:table-cell">
        <Image
          alt="Product image"
          className="aspect-square rounded-md object-cover"
          height="64"
          src={product.imageUrl}
          width="64"
        />
      </TableCell>
      <TableCell className="font-medium">{product.name}</TableCell>
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {product.status}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">{`$${product.price}`}</TableCell>
      <TableCell className="hidden md:table-cell">{product.stock}</TableCell>
      <TableCell className="hidden md:table-cell">
        {product.availableAt.toLocaleDateString("en-US")}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => setEditOpen(true)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDeleteOpen(true)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
      <DeleteDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
        loading={loading}
      />

      <EditDialog
        product={product}
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onConfirm={updateProduct.bind(null, product.id)}
      />
    </TableRow>
  );
}
