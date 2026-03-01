import useSWR from 'swr';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch');
  }
  return res.json();
};

export const useTeacher = () => {
  const { data, error, isLoading, mutate } = useSWR('/api/admin/fetch-etutor', fetcher, {
    revalidateOnFocus: true, // Re-fetch on window focus
  });

  return {
    teacher: data?.data,
    isLoading3: isLoading,
    error3: error,
    mutate, // Can be used to manually revalidate the data
  };
};
