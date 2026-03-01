import useSWR from 'swr';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch');
  }
  return res.json();
};

export const useResignation = () => {
  const { data, error, isLoading, mutate } = useSWR('/api/admin/resign-tutoring', fetcher, {
    revalidateOnFocus: true, // Re-fetch on window focus
  });

 
  return {
    resignTutoring: data?.data,
    resignLoading:isLoading,
    resignError:error,
    mutate, // Can be used to manually revalidate the data
  };
};
