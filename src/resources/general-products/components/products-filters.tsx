'use client'
import { Popover, PopoverContent, PopoverTrigger } from '@/resources/shared/ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/resources/shared/ui/command'
import { Button } from '@/resources/shared/ui/button'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Dispatch, SetStateAction, useState } from 'react'
import { useGetTypesBrands } from '@/resources/general-products/services/get-brand-tipos'

interface Props {
	brandState: string | undefined
	tipoState: string | undefined
	setBrand: Dispatch<SetStateAction<string | undefined>>
	setTipo: Dispatch<SetStateAction<string | undefined>>
}

export const ProductsFilters = ({ brandState, setBrand, setTipo, tipoState }: Props) => {
	const [open, setOpen] = useState({ tipos: false, brands: false })

	const { data } = useGetTypesBrands()

	return (
		<div className="flex gap-4 items-center">
			<h1>Filtrar por</h1>
			<Popover open={open.tipos} onOpenChange={() => setOpen({ tipos: !open.tipos, brands: false })}>
				<PopoverTrigger asChild>
					<Button variant="outline" role="combobox" aria-expanded={open.tipos} className="w-[200px] justify-between">
						Tipo
						<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[200px] p-0">
					<Command>
						<CommandInput placeholder="Buscar tipo..." />
						<CommandList>
							<CommandEmpty>No framework found.</CommandEmpty>
							<CommandGroup>
								{data?.tipos?.map((tipo) => (
									<CommandItem
										key={tipo}
										value={tipo}
										onSelect={(currentValue) => {
											setTipo(currentValue === tipoState ? '' : currentValue)
											;() => setOpen({ tipos: false, brands: false })
										}}
										className="capitalize"
									>
										<Check className={cn('mr-2 h-4 w-4', tipoState === tipo ? 'opacity-100' : 'opacity-0')} />
										{tipo}
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
			<Popover open={open.brands} onOpenChange={() => setOpen({ tipos: false, brands: !open.brands })}>
				<PopoverTrigger asChild>
					<Button variant="outline" role="combobox" aria-expanded={open.brands} className="w-[200px] justify-between">
						Marca
						<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[200px] p-0">
					<Command>
						<CommandInput placeholder="Buscar marca..." />
						<CommandList>
							<CommandEmpty>No framework found.</CommandEmpty>
							<CommandGroup>
								{data?.brands.map((brand) => (
									<CommandItem
										key={brand}
										value={brand}
										onSelect={(currentValue) => {
											setBrand(currentValue === brandState ? '' : currentValue)
											setOpen({ tipos: false, brands: false })
										}}
										className="capitalize"
									>
										<Check className={cn('mr-2 h-4 w-4', brandState === brand ? 'opacity-100' : 'opacity-0')} />
										{brand}
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
			<Button
				onClick={() => {
					setBrand(undefined)
					setTipo(undefined)
				}}
			>
				Limpiar filtros
			</Button>
		</div>
	)
}
