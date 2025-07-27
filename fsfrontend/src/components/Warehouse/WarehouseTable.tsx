import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import type { WarehouseListDTO } from "@/types/dtos";
import { getWarehouseList } from "@/api/Warehouse/getWarehouseList";
import { Card } from "../ui/card";
import "leaflet/dist/leaflet.css";
import { WarehouseListMap } from "./WarehouseListMap";
import { useNavigate } from "react-router-dom";

const WarehouseTable: React.FC = () => {
  const { data } = useQuery<WarehouseListDTO[]>({
    queryKey: ["warehouse-list"],
    queryFn: getWarehouseList,
  });

  const navigate = useNavigate();

  useEffect(() => {}, [data]);

  return (
    <div className="flex w-full flex-wrap gap-4 px-4 lg:px-6 p-4">
      {data &&
        data
          .map((warehouse, index) => (
            <Card
              className="relative w-60 flex flex-col items-center p-0 overflow-hidden cursor-pointer"
              key={warehouse.name}
              onClick={() => navigate("/dashboard/warehouse/" + warehouse.id)}
            >
              <div
                className="absolute bottom-0 left-0 self-start p-3 w-full z-10"
                style={{
                  color: "var(--sidebar-foreground)",
                  background:
                    "linear-gradient(to top, var(--sidebar) 25%, transparent 100%) ",
                }}
              >
                <div className="flex flex-col gap-0">
                  <p className="font-bold text-lg">{warehouse.name}</p>
                  <p
                    className="text-light text-xs"
                    style={{
                      color: "var(--muted-foreground)",
                    }}
                  >
                    {warehouse.address}
                  </p>
                </div>
              </div>
              <WarehouseListMap address={warehouse.address} index={index} />
            </Card>
          ))
          .reverse()}
    </div>
  );
};

export default WarehouseTable;
