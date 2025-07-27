import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="@container/main flex flex-1 flex-col gap-2">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
