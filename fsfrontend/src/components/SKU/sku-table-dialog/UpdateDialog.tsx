import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  type SKUType,
  type SKUUpdateType,
  updateSKUbyId,
} from "@/api/SKU/updateSKUbyId";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { SKUDialog } from "./SKUDialog";
import { convertCentsToEuro, parsePriceToCents } from "@/util";

interface UpdateDialogProps {
  open: boolean;
  onOpenChange?(open: boolean): void;
  data: SKUUpdateType & { skuId: string };
}

const UpdateDialog: React.FC<UpdateDialogProps> = ({
  open,
  onOpenChange,
  data: { name, priceInCents, skuCode, skuId },
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SKUType>({
    defaultValues: {
      name,
      skuCode,
      priceInCents: convertCentsToEuro(priceInCents),
    },
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateSKUbyId,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sku-list"] });
    },
    onError: () => {},
  });

  const onSubmit: SubmitHandler<SKUType> = ({ name, priceInCents, skuCode }) =>
    mutation.mutate({
      skuId,
      data: { name, skuCode, priceInCents: parsePriceToCents(priceInCents) },
    });

  return (
    <SKUDialog
      open={open}
      onOpenChange={onOpenChange}
      control={control}
      description={`Update the details for SKU "${name}" (Code: ${skuCode}).`}
      title="Edit Catalog Item"
      errors={errors}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
    ></SKUDialog>
  );
};

export default UpdateDialog;
