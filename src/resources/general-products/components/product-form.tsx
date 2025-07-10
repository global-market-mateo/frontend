'use client'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/resources/shared/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { MyFormItem } from '@/resources/shared/components/my-form-item'
import { useCreateBusinessProduct, useUpdateBusinessProduct } from '@/resources/business/services/businessProducts/business-products-mutations'
import { Button } from '@/resources/shared/ui/button'
import { Switch } from '@/resources/shared/ui/switch'

export interface Product {
	tipo: string
	description: string
	brand: string
	amount: string
	id?: string
	businessId?: string
	price?: number
	url?: string
	stock?: boolean
	categoryId?: string
	quantity?: number
	category?: {
		id: string
		name: string
	}
}
interface Props {
	product?: Product
	pagination?: any[]
	className?: string
}
const ProductSchema = z.object({
	amount: z.string().min(3, "El campo 'amount' debe tener al menos 3 caracteres."),
	brand: z.string().min(3, "El campo 'brand' debe tener al menos 3 caracteres."),
	description: z.string().min(3, "El campo 'description' debe tener al menos 3 caracteres."),
	tipo: z.string().min(3, "El campo 'tipo' debe tener al menos 3 caracteres."),
	url: z.string().url("El campo 'url' debe ser una URL válida.").min(3, "El campo 'url' debe tener al menos 3 caracteres."),
	categoryId: z.string().uuid("El campo 'categoryId' debe ser un UUID válido.").optional(),
	categoryName: z.string().optional(),
	price: z.string(), //.int("El campo 'price' debe ser un número entero."),
	stock: z.boolean().refine((val) => typeof val === 'boolean', {
		message: "El campo 'stock' debe ser un valor booleano."
	})
})
export type ProductSchemaType = z.infer<typeof ProductSchema>

export const ProductForm = ({ product, pagination = [], className }: Props) => {
	const { mutate: create } = useCreateBusinessProduct()
	const { mutate: update } = useUpdateBusinessProduct()

	const form = useForm<ProductSchemaType>({
		resolver: zodResolver(ProductSchema),
		defaultValues: {
			tipo: product?.tipo || '',
			amount: product?.amount || '',
			brand: product?.brand || '',
			categoryId: product?.category?.id || '',
			description: product?.description || '',
			price: product?.price?.toString() || '',
			stock: product?.stock || true,
			url: product?.url || ''
		}
	})
	const onSubmit = (values: ProductSchemaType) => {
		// console.log(product.id);
		// console.log(values);
		if (product) {
			if (product.id) {
				update({ ...values, id: product.id })
			} else {
				// console.log("create");
				create(values)
			}
		} else {
			create(values)
		}
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} onError={(error) => console.log(error)} className={`flex flex-col ${className} gap-1 overflow-y-auto h-full`}>
				<FormField control={form.control} name="tipo" render={({ field }) => <MyFormItem field={field} label="Tipo" />} />
				<FormField control={form.control} name="description" render={({ field }) => <MyFormItem field={field} label="Descripcion" />} />
				<FormField control={form.control} name="brand" render={({ field }) => <MyFormItem field={field} label="Marca" />} />
				<FormField control={form.control} name="amount" render={({ field }) => <MyFormItem field={field} label="Cantidad" />} />
				<FormField control={form.control} name="price" render={({ field }) => <MyFormItem field={field} label="Precio" type="number" />} />

				<FormField control={form.control} name="url" render={({ field }) => <MyFormItem field={field} label="Url" />} />
				<FormField control={form.control} name="categoryId" render={({ field }) => <MyFormItem field={field} label="Categoria" />} />
				<FormField
					control={form.control}
					name="stock"
					render={({ field }) => (
						<FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm mt-2">
							<FormLabel>Stock</FormLabel>
							<FormControl>
								<Switch checked={field.value} onCheckedChange={field.onChange} />
							</FormControl>
						</FormItem>
					)}
				/>
				{/* <DevTool control={form.control} /> */}
				<Button className="mt-2" type="submit">
					Guardar
				</Button>
			</form>
		</Form>
	)
}
