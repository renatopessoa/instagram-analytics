import { useQuery } from "@tanstack/react-query";
import { StatsCard } from "@/components/StatsCard";
import { FollowersChart } from "@/components/FollowersChart";
import { TrendingUp, Users, Heart, Target } from "lucide-react";
import { Card } from "@/components/ui/card";
import { fetchPromotionsData } from "@/services/instagramApi";

export default function Promotions() {
  const token = localStorage.getItem('instagram_access_token') || '';
  
  const { data: promotionsData } = useQuery({
    queryKey: ['promotions', token],
    queryFn: () => fetchPromotionsData(token),
    enabled: !!token,
  });

  return (
    <div className="space-y-8 p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          icon={TrendingUp}
          title="Active Campaigns"
          value={promotionsData?.activeCampaigns || 0}
        />
        <StatsCard
          icon={Users}
          title="Reach"
          value={promotionsData?.reach || 0}
          trend="up"
        />
        <StatsCard
          icon={Heart}
          title="Engagement"
          value={`${promotionsData?.engagementRate || 0}%`}
        />
        <StatsCard
          icon={Target}
          title="Conversions"
          value={promotionsData?.conversions || 0}
          trend="up"
        />
      </div>

      <FollowersChart />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {promotionsData?.campaigns.map((campaign) => (
          <Card key={campaign.id} className="p-6">
            <div className="aspect-video mb-4 overflow-hidden rounded-lg">
              <img
                src={campaign.image}
                alt={campaign.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-semibold mb-2">{campaign.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">{campaign.description}</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Performance</p>
                <p className="text-lg font-semibold">{campaign.performance}%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="text-lg font-semibold text-green-500">Active</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}