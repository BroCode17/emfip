import { Product } from "@/lib";
import { ProductModal } from "../addneditproduct";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EllipsisVerticalIcon } from "lucide-react";

interface EditProductActionType {
  product: Product,
  handleSubmit: (product: Product | string) => void
}

const EditProductAction = ({ product, handleSubmit }: EditProductActionType) => {
  return <ProductModal onSubmit={handleSubmit} product={product} />
}

interface DeleteProductActionType extends EditProductActionType { }
/**
 *
 * @param param0 producta, handleDelete
 * @returns handleDelete with selected product id
 */
const DeleteProductAction = ({ product, handleSubmit }: DeleteProductActionType) => {

  //return handleDelete function with product id as param
  return <ProductModal onSubmit={handleSubmit} product={product} showDeleteModal={true} />
}


interface ActionBoxProps {
  product: Product,
  handleSubmit?: (product: Product | string) => void
  handleDelete?: (id: string) => void
}

export const ActionBox = ({ product, handleSubmit }: ActionBoxProps) => {

  return <DropdownMenu>
    <DropdownMenuTrigger>
      <EllipsisVerticalIcon />
      <span className="sr-only">Action</span>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
        <EditProductAction product={product} handleSubmit={handleSubmit!} />
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      {/* Menu Item for delete */}
      <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="bg-red-500">
        {/* Delete item by id */}
        <DeleteProductAction product={product} handleSubmit={handleSubmit!} />
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
}
