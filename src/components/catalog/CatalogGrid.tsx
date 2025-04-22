import { GeneralProduct } from '@/actions/generalProducts/getGeneralProducts'
import { Plus } from 'lucide-react'
import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'

interface Props {
	setProduct: Dispatch<SetStateAction<GeneralProduct>>
	setOpen: Dispatch<SetStateAction<boolean>>
	productsList: GeneralProduct[]
}

export const CatalogoGrid = ({ setProduct, setOpen, productsList }: Props) => {
	return (
		<div className="grid grid-cols-5 gap-5 ">
			{productsList.map(({ id, amount, brand, description, tipo, url }) => (
				<div key={id} className="bg-background/95 rounded-lg flex flex-col gap-4 justify-between items-center py-2">
					<Image className="rounded" width={100} height={100} src={url} alt="" />
					<p className="text-center">{` ${tipo} ${brand} ${amount}  ${description}`}</p>
					<div>
						<Plus
							onClick={() => {
								setProduct({ amount, brand, description, tipo, url })
								setOpen(true)
							}}
							className="cursor-pointer hover:scale-125 transition-transform duration-200 "
						/>
					</div>
				</div>
			))}
		</div>
	)
}
