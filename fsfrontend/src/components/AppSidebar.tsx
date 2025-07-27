import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Label } from "@radix-ui/react-label";
import { ClipboardList, Truck, Warehouse } from "lucide-react";
import { Switch } from "./ui/switch";
import { useLocation, useNavigate } from "react-router";
import { useTheme } from "./theme-provider";
// Menu items.
const items = [
  {
    title: "Buses",
    url: "/dashboard/bus",
    icon: Truck,
  },
  {
    title: "Workshops",
    url: "/dashboard/warehouse",
    icon: Warehouse,
  },
  {
    title: "Item Catalog",
    url: "/dashboard/sku",
    icon: ClipboardList,
  },
];

export function AppSidebar() {
  const location = useLocation();
  const { setTheme, theme } = useTheme();
  return (
    <Sidebar variant="inset">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Fietsenwacht MVP</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname == item.url}
                  >
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center space-x-2">
              <Switch
                id="dark-mode"
                className=""
                onClick={() =>
                  theme == "dark" ? setTheme("light") : setTheme("dark")
                }
              ></Switch>
              <Label htmlFor="dark-mode">Dark Mode</Label>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
