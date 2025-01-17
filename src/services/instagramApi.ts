const INSTAGRAM_API_BASE_URL = 'https://graph.instagram.com/v12.0';

export interface InstagramStats {
  followers_count: number;
  follows_count: number;
  media_count: number;
  username: string;
}

export const fetchInstagramStats = async (accessToken: string): Promise<InstagramStats> => {
  try {
    const response = await fetch(
      `${INSTAGRAM_API_BASE_URL}/me?fields=followers_count,follows_count,media_count,username&access_token=${accessToken}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch Instagram stats');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching Instagram stats:', error);
    throw error;
  }
};

export const fetchFollowersHistory = async (accessToken: string) => {
  // Note: Instagram's Graph API doesn't provide historical follower data
  // This is a mock implementation
  return [
    { name: 'Sun', followers: 10 },
    { name: 'Mon', followers: 15 },
    { name: 'Tue', followers: 15 },
    { name: 'Wed', followers: 20 },
    { name: 'Thu', followers: 20 },
    { name: 'Fri', followers: 30 },
    { name: 'Sat', followers: 40 },
  ];
};