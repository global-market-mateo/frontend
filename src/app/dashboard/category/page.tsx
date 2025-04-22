'use client'

import { useDeleteCategory } from '@/actions/category/categoryMutations'
import { useCategories } from '@/actions/category/categoryQueries'
import { Category } from '@/actions/category/categoryService'
import { ContentLayout } from '@/components/admin-panel/content-layout'
import { CategoryForm } from '@/components/category/CategoryForm'
import { CategorySheet } from '@/components/category/CategorySheet'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
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
