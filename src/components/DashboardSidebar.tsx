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
    <Sidebar className="sidebar-gradient">
      <SidebarContent>
        <div className="p-6">
          <div className="flex items-center gap-4">
            <img
              src="/placeholder.svg"
              alt="Profile"
              className="h-12 w-12 rounded-full"
            />
            <div>
              <h3 className="font-semibold text-white">{localStorage.getItem('instagram_username') || 'Loading...'}</h3>
              <p className="text-sm text-white/80">@{localStorage.getItem('instagram_username') || 'Loading...'}</p>
            </div>
          </div>
          <div className="mt-4 flex justify-between text-sm">
            <div>
              <p className="font-semibold text-white">{localStorage.getItem('followers_count') || '0'}</p>
              <p className="text-white/80">Followers</p>
            </div>
            <div>
              <p className="font-semibold text-white">{localStorage.getItem('follows_count') || '0'}</p>
              <p className="text-white/80">Following</p>
            </div>
            <div>
              <p className="font-semibold text-white">{localStorage.getItem('comments_count') || '0'}</p>
              <p className="text-white/80">Comments</p>
            </div>
          </div>
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton 
                    className={currentPath === item.path ? "bg-white/10 text-white" : "text-white/80 hover:text-white hover:bg-white/10"}
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