'use client'

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useForm ,Controller} from "react-hook-form"

import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { type Product } from "@prisma/client"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function DeleteDialog({ 
  open, 
  onClose, 
  onConfirm, 
  loading 
}: {
  open: boolean
  onClose: () => void
  onConfirm: () => Promise<void>
  loading: boolean
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Product</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this product? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm} disabled={loading}>
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  price: z.number().min(0, "Price must be positive"),
  stock: z.number().min(0, "Stock must be positive"),
  imageUrl: z.string().optional(),
  status: z.enum(["draft", "published", "archived"]),
  availableAt: z.date(),
  
})

type ProductFormValues = z.infer<typeof productSchema>

export function EditDialog({ 
  product,
  open,
  onClose,
  onConfirm
}: {
  product: Product
  open: boolean
  onClose: () => void
  onConfirm: (data: ProductFormValues) => Promise<void>
}) {
  const [loading, setLoading] = useState(false)

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product.name,
      description: product.description || '',
      price: product.price,
      imageUrl: product.imageUrl || '',
      status: product.status as "draft" | "published" | "archived",
      stock: product.stock,
      availableAt: new Date(product.availableAt)
    }
  })
const onSubmit= async (data:ProductFormValues)=>{
  
    setLoading(true)
    try {
      await onConfirm(data)
      toast.success("Product updated")
      onClose()
    } catch (error) {
      toast.error("Failed to update product")
    } finally {
      setLoading(false)
    }

}
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[875px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Make changes to your product here.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <Input {...form.register("name")} />
                {form.formState.errors.name && (
                  <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea 
                  {...form.register("description")}
                  className="min-h-[100px]"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Image URL</label>
                <Input {...form.register("imageUrl")} type="url" />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Price</label>
                <Input 
                  {...form.register("price", { valueAsNumber: true })}
                  type="number" 
                  step="0.01"
                />
                {form.formState.errors.price && (
                  <p className="text-sm text-red-500">{form.formState.errors.price.message}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium">Status</label>
                <Controller
                  name="status"
                  control={form.control}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Stock</label>
                <Input 
                  {...form.register("stock", { valueAsNumber: true })}
                  type="number"
                />
                {form.formState.errors.stock && (
                  <p className="text-sm text-red-500">{form.formState.errors.stock.message}</p>
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}