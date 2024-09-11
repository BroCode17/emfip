import { ErrorMap, Product, ProductActionType } from "@/lib";
import { ProductFromDB, ProductModal } from "../addneditproduct";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EllipsisVerticalIcon } from "lucide-react";

interface EditProductActionType {
  product: ProductFromDB,
  handleSubmit: (product: Product, action?: string) => void
  allErrors: ErrorMap
}

const EditProductAction = ({ product, handleSubmit, allErrors }: EditProductActionType) => {
  return <ProductModal onSubmit={handleSubmit} product={product} allErrors={allErrors} />
}

interface DeleteProductActionType extends EditProductActionType {
}
/**
 *
 * @param param0 producta, handleDelete
 * @returns handleDelete with selected product id
 */
const DeleteProductAction = ({ product, handleSubmit, allErrors }: EditProductActionType) => {

  //return handleDelete function with product id as param
  return <ProductModal onSubmit={handleSubmit} product={product} showDeleteModal={true} allErrors={allErrors} />
}


interface ActionBoxProps {
  product: ProductFromDB,
  handleSubmit?: (product: Product, action?: string) => void
  handleDelete?: (id: string) => void
  allError: ErrorMap
}

export const ActionBox = ({ product, handleSubmit, allError }: ActionBoxProps) => {

  return <DropdownMenu>
    <DropdownMenuTrigger>
      <EllipsisVerticalIcon />
      <span className="sr-only">Action</span>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
        <EditProductAction product={product} handleSubmit={handleSubmit!} allErrors={allError} />
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      {/* Menu Item for delete */}
      <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="bg-red-500">
        {/* Delete item by id */}
        <DeleteProductAction product={product} handleSubmit={handleSubmit} />
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
}
