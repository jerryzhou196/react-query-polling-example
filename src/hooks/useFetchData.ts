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

export const useFetchData = () => {
  return useQuery({
    queryKey: ['time-data'],
    queryFn: async (): Promise<TimeData> => {
      const response = await fetch(
        'https://worldtimeapi.org/api/timezone/Etc/UTC'
      );
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return response.json();
    },
    staleTime: 0, // Data is immediately stale
  });
};
