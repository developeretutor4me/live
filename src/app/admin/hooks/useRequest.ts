import useSWR from 'swr';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch');
  }
  return res.json();
};

export const useRequest = () => {
  const { data, error, isLoading, mutate } = useSWR('/api/admin/fetch-students', fetcher, {
    revalidateOnFocus: true, // Re-fetch on window focus
  });

 
  return {
    sessionData: data?.data,
    isLoadingData:isLoading,
    error,
    mutate, // Can be used to manually revalidate the data
  };
};
