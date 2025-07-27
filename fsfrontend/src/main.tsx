import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import SkuTable from "./components/SKU/SkuTable.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./components/Layout.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import Dashboard from "./components/Dashboard.tsx";
import { Toaster } from "sonner";
import WarehouseTable from "./components/Warehouse/WarehouseTable.tsx";
import { WarehouseDetail } from "./components/Warehouse/WarehouseDetail.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Toaster />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />}>
                <Route path="sku" element={<SkuTable />} />
                <Route path="warehouse/:id" element={<WarehouseDetail />} />
                <Route path="warehouse" element={<WarehouseTable />} />
              </Route>
            </Routes>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
