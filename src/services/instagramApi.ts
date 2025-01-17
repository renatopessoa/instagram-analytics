const INSTAGRAM_API_BASE_URL = 'https://graph.instagram.com/v12.0';

export interface InstagramStats {
  followers_count: number;
  follows_count: number;
  media_count: number;
  username: string;
  comments_count?: number;
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  image: string;
  performance: number;
  status: 'active' | 'completed' | 'scheduled';
}

export interface PromotionsData {
  activeCampaigns: number;
  reach: number;
  engagementRate: number;
  conversions: number;
  campaigns: Campaign[];
}

export const fetchInstagramStats = async (accessToken: string): Promise<InstagramStats> => {
  try {
    const response = await fetch(
      `${INSTAGRAM_API_BASE_URL}/me?fields=followers_count,follows_count,media_count,username&access_token=${accessToken}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch Instagram stats');
    }

    const data = await response.json();
    return {
      ...data,
      comments_count: 241, // Hardcoded since Instagram API doesn't provide this directly
    };
  } catch (error) {
    console.error('Error fetching Instagram stats:', error);
    throw error;
  }
};

export const fetchFollowersHistory = async (accessToken: string, days: number = 7) => {
  // Note: Instagram's Graph API doesn't provide historical follower data
  // This is a mock implementation that generates data based on the number of days
  const data = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    data.push({
      name: date.toLocaleDateString('en-US', { weekday: 'short' }),
      followers: Math.floor(Math.random() * 30) + 10,
      likes: Math.floor(Math.random() * 50) + 20,
      promotions: Math.floor(Math.random() * 40) + 15,
    });
  }
  
  return data;
};

export const fetchPromotionsData = async (accessToken: string): Promise<PromotionsData> => {
  // Mock data since Instagram's API doesn't provide this information directly
  return {
    activeCampaigns: 3,
    reach: 15420,
    engagementRate: 4.2,
    conversions: 126,
    campaigns: [
      {
        id: '1',
        name: 'Summer Collection Launch',
        description: 'Promoting our new summer fashion collection with influencer partnerships',
        image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81',
        performance: 92,
        status: 'active'
      },
      {
        id: '2',
        name: 'Brand Awareness Campaign',
        description: 'Increasing brand visibility through targeted content and hashtag strategy',
        image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7',
        performance: 78,
        status: 'active'
      },
      {
        id: '3',
        name: 'Product Showcase',
        description: 'Highlighting key features and benefits of our flagship products',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
        performance: 85,
        status: 'active'
      }
    ]
  };
};