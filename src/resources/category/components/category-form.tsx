'use client'
import { Form, FormField } from '@/resources/shared/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { MyFormItem } from '@/resources/shared/components/my-form-item'
import { UUID } from 'crypto'
import { useCreateCategory } from '@/resources/category/services/category-mutations'
import { useUpdateCategory } from '@/resources/category/services/category-mutations'
import { Button } from '@/resources/shared/ui/button'

interface Props {
	category?: {
		id: UUID
		name: string
	}
	className?: string
}
const CategorySchema = z.object({
	name: z.string().min(3, "El campo 'category' debe tener al menos 3 caracteres.")
})
export type CategorySchemaType = z.infer<typeof CategorySchema>

export const CategoryForm = ({ category, className }: Props) => {
	const { mutate: create } = useCreateCategory()
	const { mutate: update } = useUpdateCategory()
	const form = useForm<CategorySchemaType>({
		resolver: zodResolver(CategorySchema),
		defaultValues: {
			name: category?.name || ''
		}
	})
	const onSubmit = ({ name }: CategorySchemaType) => {
		if (category) {
			update({ id: category.id, name })
		} else {
			create(name)
		}
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} onError={(error) => console.log(error)} className={`flex flex-col gap-4 ${className}`}>
				<FormField control={form.control} name="name" render={({ field }) => <MyFormItem field={field} label="Titulo de la categoria" placeholder="Titulo de la categoria" />} />

				{/* <DevTool control={form.control} /> */}
				<Button type="submit">Guardar</Button>
			</form>
		</Form>
	)
}
