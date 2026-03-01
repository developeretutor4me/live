import useSWR from 'swr';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch');
  }
  return res.json();
};

interface UseAllTicketsOptions {
  page?: number;
  limit?: number;
  status?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
}

export const useAllTickets = (options: UseAllTicketsOptions = {}) => {
  const {
    page = 1,
    limit = 10,
    status,
    sortBy = 'createdAt',
    sortOrder = 'desc',
    search,
  } = options;

  // Build query string
  const queryParams = new URLSearchParams();
  queryParams.append('page', page.toString());
  queryParams.append('limit', limit.toString());
  queryParams.append('sortBy', sortBy);
  queryParams.append('sortOrder', sortOrder);

  if (status && status !== 'all') {
    queryParams.append('status', status);
  }
  if (search) {
    queryParams.append('search', search);
  }

  const url = `/api/contact-support/fetch-all-tickets?${queryParams.toString()}`;

  const { data, error, isLoading, mutate } = useSWR(url, fetcher, {
    revalidateOnFocus: true,
    dedupingInterval: 30000, // Cache for 30 seconds
  });

  return {
    tickets: data?.data || [],
    pagination: data?.pagination,
    filters: data?.filters,
    isLoading,
    error,
    mutate,
  };
};
