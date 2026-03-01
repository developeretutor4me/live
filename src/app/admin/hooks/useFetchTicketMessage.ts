import useSWR from "swr";

// Custom fetch function to handle API requests
const fetchMessages = async (ticketId: string) => {
  const response = await fetch(`/api/contact-support/messages/${ticketId}`);
  const data = await response.json();
  
  if (!response.ok || !data.success) {
    throw new Error(data.error || "Failed to fetch messages");
  }
  
  return data.messages;
};

// Custom hook
export const useMessages = (ticketId: string) => {
  const { data, error, isLoading,mutate} = useSWR(
    ticketId ? `/api/contact-support/messages/${ticketId}` : null, 
    () => fetchMessages(ticketId),
    {
      revalidateOnFocus: true // This will enable refetching when the tab/window is focused
    }
  );

  return {
    Ticketmessages: data,
    TicketmessageError: error ? error.message : null,
    isTicketmessageLoading:isLoading,
    mutate
  };
};


