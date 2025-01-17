import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { StatsCard } from "@/components/StatsCard";
import { FollowersChart } from "@/components/FollowersChart";
import { Users, UserMinus, UserX, Lock, Calendar, Users2 } from "lucide-react";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <main className="flex-1 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              icon={Users}
              title="New Followers"
              value="26"
              subValue="56 total"
              trend="up"
            />
            <StatsCard
              icon={UserMinus}
              title="Lost Followers"
              value="12"
              subValue="21 total"
              trend="down"
            />
            <StatsCard
              icon={UserX}
              title="Profile Stalkers"
              value="3"
              subValue="0 new"
            />
            <StatsCard
              icon={Lock}
              title="Blocking You"
              value="2"
              subValue="1 new"
            />
            <StatsCard
              icon={Users2}
              title="You Don't Follow Back"
              value="431"
              subValue="3 new"
            />
            <StatsCard
              icon={Users2}
              title="Don't Follow You Back"
              value="237"
              subValue="1 new"
            />
            <StatsCard
              icon={Calendar}
              title="Average Age"
              value="18-24"
              subValue="55%"
            />
            <StatsCard
              icon={Users2}
              title="Gender Distribution"
              value="Male"
              subValue="63%"
            />
          </div>
          <FollowersChart />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;