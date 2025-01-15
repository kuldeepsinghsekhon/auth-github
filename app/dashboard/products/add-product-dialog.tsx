'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { createProduct } from "@/actions/product"

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  price: z.number().min(0, "Price must be positive"),
  imageUrl: z.string().url("Must be a valid URL").optional(),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  stock: z.number().min(0, "Stock must be non-negative")
})

type ProductFormValues = z.infer<typeof productSchema>

export function AddProductDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [loading, setLoading] = useState(false)
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      status: "draft",
      stock: 0
    }
  })

  const onSubmit = async (data: ProductFormValues) => {
    setLoading(true)
    try {
      await createProduct(data)
      toast.success("Product created successfully")
      form.reset()
      onClose()
    } catch (error) {
      toast.error("Failed to create product")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              <Textarea {...form.register("description")} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Price</label>
                <Input 
                  type="number" 
                  step="0.01" 
                  {...form.register("price", { valueAsNumber: true })} 
                />
                {form.formState.errors.price && (
                  <p className="text-sm text-red-500">{form.formState.errors.price.message}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium">Stock</label>
                <Input 
                  type="number" 
                  {...form.register("stock", { valueAsNumber: true })} 
                />
                {form.formState.errors.stock && (
                  <p className="text-sm text-red-500">{form.formState.errors.stock.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Image URL</label>
              <Input {...form.register("imageUrl")} type="url" />
              {form.formState.errors.imageUrl && (
                <p className="text-sm text-red-500">{form.formState.errors.imageUrl.message}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Status</label>
              <Select 
                value={form.watch("status")} 
                onValueChange={(value) => form.setValue("status", value as "draft" | "published" | "archived")}
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
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Product"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}