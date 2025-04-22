'use client'
import { ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form'
import { FormControl, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { useState } from 'react'
import { Button } from './ui/button'
import { useCategories } from '@/actions/category/categoryQueries'
import { useCreateCategory } from '@/actions/category/categoryMutations'

export const MyFormItem = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({
	field,
	label,
	placeholder,
	setDeliveryMethod,
	type = 'text'
}: {
	type?: React.HTMLInputTypeAttribute
	field: ControllerRenderProps<TFieldValues, TName>
	label?: string
	placeholder?: string
	setDeliveryMethod?: (value: string) => void
}) => {
	const [newCategory, setNewCategory] = useState('')
	const [showNewCategoryInput, setShowNewCategoryInput] = useState(false)
	const { data: categories } = useCategories()
	const { mutate: create } = useCreateCategory()

	if (field.name === 'pay_method') {
		return (
			<FormItem>
				<FormLabel>Forma de pago</FormLabel>
				<Select onValueChange={field.onChange} defaultValue={field.value}>
					<SelectTrigger>
						<SelectValue placeholder="[seleccione]" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="Efectivo">En efectivo en el momento de la entrega</SelectItem>
						<SelectItem value="Transferencia">Transferencia bancaria</SelectItem>
						<SelectItem value="Mercado pago">Link de mercado pago</SelectItem>
						<SelectItem value="Tarjeta de debito">Tarjeta de debito</SelectItem>
						<SelectItem value="Tarjeta de credito">Tarjeta de credito(12% recargo)</SelectItem>
					</SelectContent>
				</Select>
			</FormItem>
		)
	}

	if (field.name === 'delivery_method') {
		return (
			<FormItem>
				<FormLabel>Forma de entrega</FormLabel>
				<Select
					defaultValue={field.value}
					onValueChange={(item) => {
						field.onChange(item)
						setDeliveryMethod && setDeliveryMethod(item)
					}}
				>
					<SelectTrigger>
						<SelectValue placeholder="[seleccione]" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="Av.Revolucion">Retiro en Av.Revolución de Mayo 1510</SelectItem>
						<SelectItem value="Lima">Retiro en Lima 1109</SelectItem>
						<SelectItem value="envio">Necesito que me lo envien</SelectItem>
					</SelectContent>
				</Select>
			</FormItem>
		)
	}

	if (field.name === 'categoryId') {
		if (categories) {
			return (
				<FormItem>
					<FormLabel>Categoria</FormLabel>
					<Select
						onValueChange={(value) => {
							if (value === 'new') {
								setShowNewCategoryInput(true)
							} else {
								setShowNewCategoryInput(false)
								field.onChange(value)
							}
						}}
						defaultValue={field.value}
					>
						<SelectTrigger>
							<SelectValue placeholder="[seleccione]" />
						</SelectTrigger>
						<SelectContent>
							{categories.map((category) => (
								<SelectItem key={category.id} value={category.id}>
									{category.name}
								</SelectItem>
							))}
							<SelectItem key="new" value="new">
								Agregar nueva categoría
							</SelectItem>
						</SelectContent>
					</Select>

					{showNewCategoryInput && (
						<div className="mt-2">
							<Input type="text" placeholder="Nombre de nueva categoría" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
							<div className="flex justify-end gap-2 mt-2">
								<Button
									size="sm"
									onClick={() => {
										create(newCategory)
										// Aquí agregarías la lógica para guardar la nueva categoría
										// Por ejemplo, llamar a una API y luego actualizar la lista de categorías
										setShowNewCategoryInput(false)
									}}
								>
									Guardar
								</Button>
								<Button size="sm" variant="outline" onClick={() => setShowNewCategoryInput(false)}>
									Cancelar
								</Button>
							</div>
						</div>
					)}
				</FormItem>
			)
		}
	}
	return (
		<FormItem>
			<FormLabel>{label}</FormLabel>
			<FormControl>
				<Input type={type} placeholder={placeholder} {...field} />
			</FormControl>
			{/* <FormDescription>This is your public display name.</FormDescription> */}
			<FormMessage />
		</FormItem>
	)
}
