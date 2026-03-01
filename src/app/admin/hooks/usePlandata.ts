import useSWR from 'swr';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch');
  }
  return res.json();
};

export const usePlandata = () => {
  const { data, error, isLoading, mutate } = useSWR('/api/admin/get-packages', fetcher, {
    revalidateOnFocus: true,
  });

  return {
    PlanData: data,
    isLoading,
    error,
    mutate,
  };
};
