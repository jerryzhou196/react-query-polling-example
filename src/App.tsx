import { useState, useEffect } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from '@tanstack/react-query';
import { useFetchData } from './hooks/useFetchData';
import { usePollData } from './hooks/usePollData';
import { RefreshCw, AlertCircle } from 'lucide-react';

const queryClient = new QueryClient();

function DataDisplay() {
  const { data: fetchedData, isLoading, error } = useFetchData();
  const { data: polledData } = usePollData();
  const queryClient = useQueryClient();

  const handleRefresh = () => {
    console.log('handle refresh!');
    queryClient
      .invalidateQueries({ queryKey: ['time-data'], type: 'all' })
      .then(() =>
        queryClient.refetchQueries({
          queryKey: ['time-data'],
          exact: true,
          type: 'all',
        })
      );
  };

  if (isLoading) {
    return <div className="text-slate-600 text-lg">Loading data...</div>;
  }

  if (error) {
    return (
      <div className="text-red-600 text-lg">
        Error: {(error as Error).message}
      </div>
    );
  }

  let showRefreshButton = false;
  const date = new Date(fetchedData.datetime);

  if (polledData) {
    const polledDate = new Date(polledData.datetime);
    showRefreshButton =
      Math.abs(date.getTime() - polledDate.getTime()) / 1000 >= 2;
    console.log(Math.abs(date.getTime() - polledDate.getTime()) / 1000);
  }

  return (
    <div className="flex justify-center flex-wrap w-100">
      {showRefreshButton && (
        <button
          onClick={handleRefresh}
          className="flex block items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <RefreshCw className="w-5 h-5" />
          Refresh Data
        </button>
      )}
      <div className="flex items-center justify-center mb-8">
        <h1> Current Time: {new Date(fetchedData.datetime).toISOString()} </h1>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DataDisplay />
    </QueryClientProvider>
  );
}

export default App;
