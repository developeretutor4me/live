import useSWR from 'swr';

const fetcher = async (url: string) => {
    try {
        const res = await fetch(url);

        if (!res.ok) {
            // Handle HTTP errors
            throw new Error(`HTTP Error: ${res.status} - ${res.statusText}`);
        }

        // Attempt to parse the response as JSON
        try {
            return await res.json();
        } catch (jsonError) {
            // Handle JSON parsing errors
            throw new Error('Failed to parse JSON response');
        }
    } catch (error: any) {
        // Handle network or other errors
        if (error instanceof Error) {
            throw new Error(`Fetcher Error: ${error.message}`);
        }
        throw new Error('An unknown error occurred');
    }
};

export const useEtokies = () => {
    const { data, error, isLoading, mutate } = useSWR('/api/EtutorEarning', fetcher, {
        revalidateOnFocus: true, // Re-fetch on window focus
    });

    // Handle SWR's internal errors (e.g., network issues)
    if (error) {
        console.error('Error fetching etokies data:', error);
    }

    return {
        etokies: data?.data,
        isLoadingetokies:isLoading,
        erroretokies: error ? error.message : null, // Return error message for easier access in the UI
        mutate, // Can be used to manually revalidate the data
    };
};
