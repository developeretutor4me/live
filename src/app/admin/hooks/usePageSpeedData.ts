import useSWR from 'swr';

// Fetcher function to get data from the Next.js API route
const fetcher = async (url:any) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch PageSpeed data');
  }
  return res.json();
};

export const usePageSpeedData = () => {
  const { data, error, isLoading, mutate } = useSWR('/api/pageInsightSpeed', fetcher, {
    revalidateOnFocus: true, // Re-fetch on window focus
  });

  return {
    pageSpeedData: data,
    isLoading,
    error,
    mutate, // Can be used to manually revalidate the data
  };
};
