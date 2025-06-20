'use client'
import { ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form'
import { FormControl, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { useState } from 'react'
import { Button } from './ui/button'
import { useCategories } from '@/actions/category/categoryQueries'
import { useCreateCategory } from '@/actions/category/categoryMutations'
import { countries } from '../../utils/countries'
import { useGetBusinessByName } from '@/actions/businesses/businessQueries'

interface MyFormItemProps {
	type?: React.HTMLInputTypeAttribute
	field: ControllerRenderProps<FieldValues, FieldPath<FieldValues>>
	label?: string
	placeholder?: string
	setDeliveryMethod?: (value: string) => void
	businessName?: string
}

export const MyFormItem = ({ field, label, placeholder, setDeliveryMethod, type = 'text', businessName }: MyFormItemProps) => {
	const { data: business } = useGetBusinessByName(businessName || '')
	const [newCategory, setNewCategory] = useState('')
	const [showNewCategoryInput, setShowNewCategoryInput] = useState(false)
	const { data: categories } = useCategories()
	const { mutate: create } = useCreateCategory()

	const shouldShowCategories = field.name === 'categoryId' && categories?.length > 0
	const hasPaymentMethods = business?.paymentMethods?.length > 0
	const hasDeliveryMethods = business?.deliveryMethods?.length > 0

	if (field.name === 'pay_method') {
		if (!hasPaymentMethods) {
			return null
		}
		return (
			<FormItem>
				<FormLabel>Forma de pago</FormLabel>
				<Select onValueChange={field.onChange} defaultValue={field.value}>
					<SelectTrigger>
						<SelectValue placeholder="[seleccione]" />
					</SelectTrigger>
					<SelectContent>
						{business.paymentMethods.map((paymentMethod) => (
							<SelectItem key={paymentMethod} value={paymentMethod}>
								{paymentMethod}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</FormItem>
		)
	}

	if (field.name === 'delivery_method') {
		if (!hasDeliveryMethods) {
			return null
		}
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
						{business.deliveryMethods.map((deliveryMethod) => (
							<SelectItem key={deliveryMethod} value={deliveryMethod}>
								{deliveryMethod}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</FormItem>
		)
	}

	if (field.name === 'categoryId') {
		if (!shouldShowCategories) {
			return null
		}
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

	if (field.name === 'country') {
		return (
			<FormItem>
				<FormLabel>{label}</FormLabel>
				<Select onValueChange={field.onChange} value={field.value}>
					<SelectTrigger>
						<SelectValue placeholder="[seleccione]">{field.value && countries.find((c) => c.code === field.value)?.name}</SelectValue>
					</SelectTrigger>
					<SelectContent>
						{countries.map((country) => (
							<SelectItem key={country.code} value={country.code}>
								{country.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</FormItem>
		)
	}

	return (
		<FormItem>
			<FormLabel>{label}</FormLabel>
			<FormControl>
				<Input type={type} placeholder={placeholder} {...field} />
			</FormControl>
			<FormMessage />
		</FormItem>
	)
}
