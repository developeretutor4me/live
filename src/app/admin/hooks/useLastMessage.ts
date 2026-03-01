import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => {
  if (!res.ok) throw new Error('Failed to fetch last message');
  return res.json();
});

interface LastMessageParams {
  userId: string;
  recipientId: string;
}

export function useLastMessage({ userId, recipientId }: LastMessageParams) {
  const shouldFetch = Boolean(userId && recipientId);

  const { data, error, isLoading, mutate } = useSWR(
    shouldFetch
      ? `/api/messages?userId=${userId}&recipientId=${recipientId}&limit=1`
      : null,
    fetcher
  );

  return {
    lastMessage: data?.messages?.[0] || null,
    isLoading,
    error,
    mutate,
  };
}
