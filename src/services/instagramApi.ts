import { useQuery } from '@tanstack/react-query';

const BASE_URL = 'https://graph.facebook.com/v18.0';
const CAMPAIGN_ID = 'act_6003515804749';

interface InsightsParams {
  timeIncrement: number;
  timeRange: {
    since: string;
    until: string;
  };
  level: string;
  fields: string[];
  limit: number;
}

const defaultInsightsParams: InsightsParams = {
  timeIncrement: 1,
  timeRange: {
    since: '2024-11-01',
    until: '2024-31-12'
  },
  level: 'adset',
  fields: [
    'campaign_name',
    'adset_name',
    'spend',
    'impressions',
    'clicks',
    'cpc',
    'ctr',
    'video_p25_watched_actions'
  ],
  limit: 5000
};

export const fetchInsights = async (token: string, params: Partial<InsightsParams> = {}) => {
  const mergedParams = { ...defaultInsightsParams, ...params };
  const fieldsString = mergedParams.fields.join(',');
  const timeRangeString = JSON.stringify(mergedParams.timeRange);
  
  const url = `${BASE_URL}/${CAMPAIGN_ID}/insights?time_increment=${mergedParams.timeIncrement}&time_range=${timeRangeString}&level=${mergedParams.level}&fields=${fieldsString}&limit=${mergedParams.limit}&access_token=${token}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch insights');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching insights:', error);
    throw error;
  }
};

export const useInsightsQuery = (params: Partial<InsightsParams> = {}) => {
  return useQuery({
    queryKey: ['insights', params],
    queryFn: async () => {
      const token = process.env.INSTAGRAM_API_TOKEN;
      if (!token) {
        throw new Error('Instagram API token not found');
      }
      return fetchInsights(token, params);
    },
  });
};
