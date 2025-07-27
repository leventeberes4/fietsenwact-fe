import {
  Controller,
  type FieldValues,
  type SubmitHandler,
  type UseFormHandleSubmit,
  type UseFormReturn,
} from "react-hook-form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Button } from "../../ui/button";
import type { SKUType } from "@/api/SKU/updateSKUbyId";

type SKUDialogProps = {
  open: boolean;
  onOpenChange?(open: boolean): void;
  onSubmit: SubmitHandler<SKUType>;
  handleSubmit: UseFormHandleSubmit<SKUType, SKUType>;
  control: UseFormReturn<SKUType>["control"];
  errors: UseFormReturn<SKUType>["formState"]["errors"];
  title: string;
  description: string;
};

export const SKUDialog = ({
  open,
  onOpenChange,
  onSubmit,
  handleSubmit,
  control,
  title,
  description,
  errors,
}: SKUDialogProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="sm:max-w-[425px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center gap-4"
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="name">Name</Label>
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <Input {...field} />}
            />
            {errors.name && <span>This field is required</span>}
          </div>
          <div className="grid gap-3">
            <Label htmlFor="price">Price</Label>
            <Controller
              name="priceInCents"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <Input {...field} />}
            />
            {errors.priceInCents && <span>This field is required</span>}
          </div>
          <div className="grid gap-3">
            <Label htmlFor="skuCode">SKU Code</Label>
            <Controller
              name="skuCode"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <Input {...field} />}
            />
            {errors.skuCode && <span>This field is required</span>}
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Save</Button>
        </DialogFooter>
        {errors.name?.message}
        {errors.priceInCents?.message}
        {errors.skuCode?.message}
      </form>
    </DialogContent>
  </Dialog>
);
