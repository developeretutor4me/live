import useSWR from 'swr';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch');
  }
  return res.json();
};

export const useTotalIncome = () => {
  const { data, error, isLoading, mutate } = useSWR('/api/admin/Totalincome', fetcher, {
    revalidateOnFocus: true, // Re-fetch on window focus
  });

 
  return {
    income: data?.data,
    isLoading:isLoading,
    error:error,
    mutate, // Can be used to manually revalidate the data
  };
};
