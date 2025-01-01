import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button"

type DropDownMenuActionProps = {
  editItem: () => void,
  deleteItem: () => Promise<void>
};

export default function DropDownMenuAction({ editItem, deleteItem }: DropDownMenuActionProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">...</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={editItem}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={async () => await deleteItem()}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}