import { getSKUList, type SKU } from "@/api/SKU/getSKUList";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";
import { Badge } from "../ui/badge";
import { DataTable } from "../table/DataTable";
import { TableRowDialog } from "./sku-table-dialog/TableRowDialog";
import { convertCentsToEuro } from "@/util";
import AddDialog from "./sku-table-dialog/AddDialog";
import { uploadCSV } from "@/api/SKU/uploadCSV";

export const columns: ColumnDef<SKU>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "priceInCents",
    header: "Price",
    accessorFn: ({ priceInCents }) => convertCentsToEuro(priceInCents),
  },
  {
    accessorKey: "skuCode",
    header: "SKU Code",
    cell: ({ row }) => {
      const status = row.getValue("skuCode") as string;

      return (
        <Badge
          variant={"outline"}
          className="w-[80px] justify-center text-center truncate text-muted-foreground"
        >
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <TableRowDialog
        skuId={row.original.skuId}
        name={row.original.name}
        priceInCents={row.original.priceInCents}
        skuCode={row.getValue("skuCode")}
      ></TableRowDialog>
    ),
  },
];

const SkuTable: React.FC = () => {
  const queryClient = useQueryClient();
  const { data, status, error } = useQuery({
    queryKey: ["sku-list"],
    queryFn: getSKUList,
  });

  const mutation = useMutation({
    mutationFn: uploadCSV,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sku-list"] });
    },
  });

  const [openAdd, setAddOpen] = useState(false);

  if (status === "pending") {
    return <span>Loading...</span>;
  }

  if (status === "error") {
    return <span>Error: {error.message}</span>;
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      mutation.mutate(e.target.files[0]);
      e.target.files = null;
    }
  };
  return (
    <>
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="flex w-full flex-col justify-start gap-6">
          <div className="flex items-center justify-left gap-4 px-4 lg:px-6">
            <Button
              onClick={() => setAddOpen(true)}
              size={"sm"}
              variant={"outline"}
            >
              <Icon path={mdiPlus}></Icon> Add item
            </Button>
            <label className="inline-flex items-center cursor-pointer">
              <Button asChild size={"sm"} variant={"outline"}>
                <span>
                  <Icon path={mdiPlus}></Icon>Upload CSV
                </span>
              </Button>
              <input
                type="file"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          </div>
          {data ? (
            <DataTable<SKU, string> columns={columns} data={data}></DataTable>
          ) : (
            <h1>"Loading"</h1>
          )}
        </div>
      </div>
      <AddDialog open={openAdd} onOpenChange={setAddOpen}></AddDialog>
    </>
  );
};

export default SkuTable;
