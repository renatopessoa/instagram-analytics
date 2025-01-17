import { Home, Users, Heart, MessageCircle, TrendingUp, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  { icon: Home, label: "Overview", active: false },
  { icon: Users, label: "Followers", active: true },
  { icon: Heart, label: "Likes", active: false },
  { icon: MessageCircle, label: "Comments", active: false },
  { icon: TrendingUp, label: "Promotions", active: false },
  { icon: Settings, label: "Preferences", active: false },
];

export function DashboardSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <div className="p-6">
          <div className="flex items-center gap-4">
            <img
              src="/placeholder.svg"
              alt="Profile"
              className="h-12 w-12 rounded-full"
            />
            <div>
              <h3 className="font-semibold">kitty_kate</h3>
              <p className="text-sm text-muted-foreground">@kitty_kate</p>
            </div>
          </div>
          <div className="mt-4 flex justify-between text-sm">
            <div>
              <p className="font-semibold">789</p>
              <p className="text-muted-foreground">Followers</p>
            </div>
            <div>
              <p className="font-semibold">2891</p>
              <p className="text-muted-foreground">Likes</p>
            </div>
            <div>
              <p className="font-semibold">241</p>
              <p className="text-muted-foreground">Comments</p>
            </div>
          </div>
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton className={item.active ? "bg-primary/10 text-primary" : ""}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}