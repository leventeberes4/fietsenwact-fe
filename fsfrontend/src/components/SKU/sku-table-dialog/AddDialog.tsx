import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { type SKUType } from "@/api/SKU/updateSKUbyId";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { SKUDialog } from "./SKUDialog";
import { parsePriceToCents } from "@/util";
import {
  addSKU,
  type AddSKUError,
  type AddSKURequest,
  type AddSKUResponse,
} from "@/api/SKU/addSKU";
import { toast } from "sonner";

interface AddDialogProps {
  open: boolean;
  onOpenChange?(open: boolean): void;
}

const AddDialog: React.FC<AddDialogProps> = ({ open, onOpenChange }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SKUType>();

  const queryClient = useQueryClient();
  const mutation = useMutation<AddSKUResponse, AddSKUError, AddSKURequest>({
    mutationFn: addSKU,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sku-list"] });
      toast.success("Succesfully added item", { richColors: true });
      if (onOpenChange) onOpenChange(false);
    },
    onError: ({ message }) => {
      toast.error(message, { richColors: true });
    },
  });

  const onSubmit: SubmitHandler<SKUType> = ({ name, priceInCents, skuCode }) =>
    mutation.mutate({
      data: { name, skuCode, priceInCents: parsePriceToCents(priceInCents) },
    });

  return (
    <SKUDialog
      open={open}
      onOpenChange={onOpenChange}
      control={control}
      description={` Enter the name, code, and price in euros.`}
      title="Add new catalog item"
      errors={errors}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
    ></SKUDialog>
  );
};
0;

export default AddDialog;
