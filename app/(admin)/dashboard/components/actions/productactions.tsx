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
  isError?: string;
}
/**
 *
 * @param param0 producta, handleDelete
 * @returns handleDelete with selected product id
 */
const DeleteProductAction = ({ product, handleSubmit, allErrors, isError }: DeleteProductActionType) => {

  //return handleDelete function with product id as param
  return <ProductModal onSubmit={handleSubmit} product={product} showDeleteModal={true} allErrors={allErrors} isError={isError}/>
}


interface ActionBoxProps {
  product: ProductFromDB,
  handleSubmit?: (product: Product, action?: string) => void
  handleDelete?: (id: string) => void
  allError: ErrorMap,
  isError?: string
}

export const ActionBox = ({ product, handleSubmit, allError, isError}: ActionBoxProps) => {

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
        <DeleteProductAction product={product} handleSubmit={handleSubmit} isError={isError} />
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
}
