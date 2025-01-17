import { useEffect, useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { StatsCard } from "@/components/StatsCard";
import { FollowersChart } from "@/components/FollowersChart";
import { Users, UserMinus, UserX, Lock, Calendar, Users2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchInstagramStats, type InstagramStats } from "@/services/instagramApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const INSTAGRAM_TOKEN_KEY = 'instagram_access_token';

const Index = () => {
  const [token, setToken] = useState<string>(() => localStorage.getItem(INSTAGRAM_TOKEN_KEY) || '');
  const { toast } = useToast();

  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['instagram-stats', token],
    queryFn: () => fetchInstagramStats(token),
    enabled: !!token,
  });

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem(INSTAGRAM_TOKEN_KEY, token);
    toast({
      title: "Token saved",
      description: "Your Instagram access token has been saved.",
    });
  };

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <form onSubmit={handleTokenSubmit} className="w-full max-w-md space-y-4 p-8">
          <h1 className="text-2xl font-bold mb-4">Instagram Analytics</h1>
          <Input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Enter your Instagram access token"
            className="w-full"
          />
          <Button type="submit" className="w-full">
            Save Token
          </Button>
        </form>
      </div>
    );
  }

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-red-500">Error loading Instagram data. Please check your token.</p>
          <Button onClick={() => {
            localStorage.removeItem(INSTAGRAM_TOKEN_KEY);
            setToken('');
          }}>
            Reset Token
          </Button>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <main className="flex-1 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              icon={Users}
              title="Followers"
              value={stats?.followers_count || 0}
              trend="up"
            />
            <StatsCard
              icon={Users2}
              title="Following"
              value={stats?.follows_count || 0}
            />
            <StatsCard
              icon={Calendar}
              title="Posts"
              value={stats?.media_count || 0}
            />
            <StatsCard
              icon={Users2}
              title="Username"
              value={stats?.username || ''}
            />
          </div>
          <FollowersChart />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;