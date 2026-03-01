import useSWR from 'swr';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch');
  }
  return res.json();
};

export const useParent = () => {
  const { data, error, isLoading, mutate } = useSWR('/api/admin/fetch-parent', fetcher, {
    revalidateOnFocus: true, // Re-fetch on window focus
  });

 
  return {
    parent: data?.data,
    isLoading2:isLoading,
    error2:error,
    mutate, // Can be used to manually revalidate the data
  };
};
