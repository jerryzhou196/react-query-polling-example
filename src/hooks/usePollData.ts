import { useQuery } from '@tanstack/react-query';

interface TimeData {
  datetime: string;
  utc_datetime: string;
  timezone: string;
  day_of_week: number;
  day_of_year: number;
  week_number: number;
  unixtime: number;
}

export const usePollData = () => {
  return useQuery({
    queryKey: ['time-data-poll'],
    queryFn: async (): Promise<TimeData> => {
      const response = await fetch('https://worldtimeapi.org/api/timezone/Etc/UTC');
      console.log('polling!')
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return response.json();
    },
    refetchInterval: 2000,
    staleTime: Infinity, // Data is immediately stale
  });
};
