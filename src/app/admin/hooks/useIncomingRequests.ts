import { BookingRequest } from "@/app/etutor/profile/components/Data";
import useSWR from "swr";

interface IncomingRequestsResponse {
  bookingRequests: BookingRequest[];
}

const fetcher = async <T>(url: string): Promise<T> => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
};

export const useIncomingRequests = (session: any) => {
  const shouldFetch = Boolean(session);

  const { data, error, isLoading } = useSWR<IncomingRequestsResponse>(
    shouldFetch ? "/api/get-incoming-requests-from-student" : null,
    fetcher
  );

  return {
    sessionData: data?.bookingRequests ?? [],
    reqloading: isLoading,
    reqerr: error?.message ?? null,
  };
};
