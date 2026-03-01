export const apiClient = {
  async fetchParentData(userId: string): Promise<any> {
    const response = await fetch('/api/parentapis/fetch-parent-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch parent data');
    }

    const data = await response.json();
    return data.parentData;
  },

  async fetchUserData(userId: string): Promise<any> {
    const response = await fetch('/api/Fetch-all-users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'An error occurred while fetching the user.');
    }

    const data = await response.json();
    return data.user;
  },

  async fetchBookingRequests(): Promise<any> {
    const response = await fetch('/api/fetch-send-requests', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch requests');
    }

    const data = await response.json();
    return data.bookingRequests;
  },

  async fetchFirstName(): Promise<any> {
    const response = await fetch('/api/first-name');
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch first name');
    }

    return data.firstName;
  },

  async redeemTokens(etokies: number): Promise<any> {
    const response = await fetch('/api/redeem', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ etokies }),
    });

    if (!response.ok) {
      throw new Error(`Failed to redeem: ${response.statusText}`);
    }

    return await response.json();
  },

  async fetchProfilePicture(): Promise<any> {
    const response = await fetch('/api/profile-picture');
    if (!response.ok) {
      throw new Error('Failed to fetch profile picture');
    }
    return await response.json();
  },
};
