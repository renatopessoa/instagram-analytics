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
import { useNavigate } from "react-router-dom";

const menuItems = [
  { icon: Home, label: "Overview", path: "/" },
  { icon: Users, label: "Followers", path: "/followers" },
  { icon: Heart, label: "Likes", path: "/likes" },
  { icon: MessageCircle, label: "Comments", path: "/comments" },
  { icon: TrendingUp, label: "Promotions", path: "/promotions" },
  { icon: Settings, label: "Preferences", path: "/preferences" },
];

export function DashboardSidebar() {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

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
              <h3 className="font-semibold">{localStorage.getItem('instagram_username') || 'Loading...'}</h3>
              <p className="text-sm text-muted-foreground">@{localStorage.getItem('instagram_username') || 'Loading...'}</p>
            </div>
          </div>
          <div className="mt-4 flex justify-between text-sm">
            <div>
              <p className="font-semibold">{localStorage.getItem('followers_count') || '0'}</p>
              <p className="text-muted-foreground">Followers</p>
            </div>
            <div>
              <p className="font-semibold">{localStorage.getItem('follows_count') || '0'}</p>
              <p className="text-muted-foreground">Following</p>
            </div>
            <div>
              <p className="font-semibold">{localStorage.getItem('comments_count') || '0'}</p>
              <p className="text-muted-foreground">Comments</p>
            </div>
          </div>
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton 
                    className={currentPath === item.path ? "bg-primary/10 text-primary" : ""}
                    onClick={() => navigate(item.path)}
                  >
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