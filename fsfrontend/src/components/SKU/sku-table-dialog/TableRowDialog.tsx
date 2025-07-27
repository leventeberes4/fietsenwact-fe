import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { type SKUUpdateType } from "@/api/SKU/updateSKUbyId";
import { useState } from "react";
import UpdateDialog from "./UpdateDialog";
import DeleteDialog from "./DeleteDialog";

export const TableRowDialog = ({
  skuId,
  name,
  priceInCents,
  skuCode,
}: SKUUpdateType & { skuId: string }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  return (
    <>
      <DropdownMenu>
        <div className="flex">
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="data-[state=open]:bg-muted text-muted-foreground ml-auto"
            >
              <span className="sr-only">Open menu</span>
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
        </div>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              setEditOpen(true);
            }}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onSelect={(e) => {
              e.preventDefault();
              setDeleteOpen(true);
            }}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <UpdateDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        data={{ name, priceInCents, skuCode, skuId }}
      ></UpdateDialog>
      <DeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        id={skuId}
      ></DeleteDialog>
    </>
  );
};
