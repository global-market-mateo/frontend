'use client'

import {
	ColumnDef,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	PaginationState,
	SortingState,
	useReactTable,
	VisibilityState
} from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import TableToolbar from './TableToolBar'
import TableComponent from './TableComponent'

import { ProductSheet } from './ProductSheet'
import { PaginationComponent } from '../PaginationComponent'
import { BusinessProduct, getBusinessProductsFn } from '@/actions/businesses/businessProducts/businessProductsService'
import { BusinessProductskey } from '@/actions/businesses/businessProducts/businessProductsMutations'

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
}

export function DataTable<TData, TValue>({ columns }: DataTableProps<TData, TValue>) {
	const [page, setPage] = useState(1)
	const [sorting, setSorting] = useState<SortingState>([])
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const [rowSelection, setRowSelection] = useState({})
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 1,
		pageSize: 10
	})
	const [searchResults, setSearchResults] = useState<TData[]>([])
	const [isSearching, setIsSearching] = useState(false)
	const [open, setOpen] = useState(false)
	const [product, setProduct] = useState<BusinessProduct>({} as BusinessProduct)

	const { isLoading, data: res } = useQuery({
		queryKey: BusinessProductskey,
		queryFn: async () => await getBusinessProductsFn(),
		staleTime: 60 * 60 * 1000 // 1 hs
	})

	const defaultData = useMemo(() => [], [])
	const data = isSearching ? searchResults : (res?.data as TData[]) ?? defaultData

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		// onPaginationChange: setPagination,
		manualPagination: true,
		// pageCount: isSearching
		//   ? Math.ceil(searchResults.length / pagination.pageSize)
		//   : dataQuery.data?.pageCount ?? -1,
		state: {
			pagination,
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection
		}
	})

	const handleSearch = (results: TData[]) => {
		setSearchResults(results)
		setIsSearching(true)
	}

	const resetSearch = () => {
		setSearchResults([])
		setIsSearching(false)
	}

	if (isLoading) return <div>Loading...</div>

	return (
		<div>
			<TableToolbar table={table} handleSearch={handleSearch} resetSearch={resetSearch} />
			<div className="rounded-md border">
				<TableComponent table={table} columns={columns} setProduct={setProduct} setOpen={setOpen} />
			</div>
			<div className="flex flex-col-reverse gap-3 md:flex-row items-center justify-between space-x-2 p-4 w-full">
				<div className="text-sm text-muted-foreground">
					{table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
				</div>
				<div>{res?.meta && <PaginationComponent meta={res?.meta!} page={page} setPage={setPage} />}</div>
			</div>
			<ProductSheet open={open} setOpen={setOpen} product={product} pagination={[10, page]} />
		</div>
	)
}
