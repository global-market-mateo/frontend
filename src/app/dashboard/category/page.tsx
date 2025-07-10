'use client'

import { useDeleteCategory } from '@/resources/category/services/category-mutations'
import { useCategories } from '@/resources/category/services/category-queries'
import { Category } from '@/resources/category/services/category-service'
import { ContentLayout } from '@/resources/admin-panel/content-layout'
import { CategoryForm } from '@/resources/category/components/category-form'
import { CategorySheet } from '@/resources/category/components/category-sheet'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/resources/shared/ui/table'
import { useState } from 'react'

export default function CategoryPage() {
	const [open, setOpen] = useState(false)
	const [category, setCategory] = useState<Category>({} as Category)
	const { mutate: remove } = useDeleteCategory()
	const { data } = useCategories()

	return (
		<ContentLayout title="Categorias">
			<CategoryForm className="w-2/5 mb-10" />

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">Titulo</TableHead>
						<TableHead className="w-[100px]">Boton</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data &&
						data.map(({ id, name }) => (
							<TableRow
								key={id}
								onClick={() => {
									setCategory({ id, name })
									setOpen(true)
								}}
							>
								<TableCell className="font-medium">{name}</TableCell>
								<TableCell
									className="cursor-pointer"
									onClick={(e) => {
										e.stopPropagation()
										remove({ id })
									}}
								>
									eliminar
								</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
			<CategorySheet category={category} open={open} setOpen={setOpen} />
		</ContentLayout>
	)
}
