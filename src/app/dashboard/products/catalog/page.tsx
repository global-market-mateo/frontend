'use client'

import { GeneralProduct, useGetGeneralProducts } from '@/actions/generalProducts/getGeneralProducts'
import { ContentLayout } from '@/components/admin-panel/content-layout'
import { CatalogoGrid } from '@/components/catalog/CatalogGrid'
import { PaginationComponent } from '@/components/products/PaginationComponent'
import { ProductsFilters } from '@/components/products/ProductsFilters'
import { ProductSheet } from '@/components/products/table/ProductSheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormEvent, useState } from 'react'

export default function CatalogPage() {
	const [brandState, setBrand] = useState<undefined | string>(undefined)
	const [tipoState, setTipo] = useState<undefined | string>(undefined)
	const [page, setPage] = useState(1)
	const [open, setOpen] = useState(false)
	const [search, setSearch] = useState<string | undefined>()
	const [product, setProduct] = useState<GeneralProduct>({} as GeneralProduct)
	const { data } = useGetGeneralProducts({
		page,
		tipo: tipoState,
		brand: brandState,
		search
	})

	const onSearch = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setSearch(e.target[0].value)
	}
	return (
		data && (
			<ContentLayout title="Catalogo">
				<div className="flex flex-col gap-4 ">
					<form onSubmit={onSearch} className="flex items-center gap-3 w-2/5">
						<Input placeholder="Cafe" type="text" />
						<Button type="submit">Buscar</Button>
					</form>
					<ProductsFilters brandState={brandState} setBrand={setBrand} setTipo={setTipo} tipoState={tipoState} />
					<CatalogoGrid productsList={data.data} setOpen={setOpen} setProduct={setProduct} />
					<PaginationComponent meta={data.meta} page={page} setPage={setPage} />
					<ProductSheet open={open} setOpen={setOpen} product={product} pagination={[20, page]} />
				</div>
			</ContentLayout>
		)
	)
}
