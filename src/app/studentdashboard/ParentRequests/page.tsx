'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const StudentDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();

  // Function to handle request status update (Accept/Reject)
  const handleResponse = async (relationshipId: string, status: string) => {
    try {
      const response = await axios.post('/api/parent-Student-Relationship/Student-Side-api/Update-request-status', {
        relationshipId,
        status,
      });

      // Update the requests state after successfully updating the status
      if (response.data.message === 'Request status updated successfully') {
        setRequests((prevRequests:any) =>
          prevRequests.map((request:any) =>
            request.requestId === relationshipId
              ? { ...request, status: status }
              : request
          )
        );
      }
    } catch (error) {
      console.error('Error updating request status:', error);
    }
  };

  useEffect(() => {
    const fetchRequests = async () => {
      if (!session?.user?.id) return;

      try {
        const response = await axios.get('/api/parent-Student-Relationship/Student-Side-api/fetchRequestsFromParent', {
          params: { studentUserId: session.user.id }, // Send studentUserId to the backend
        });
        setRequests(response.data.requests);
      } catch (error) {
        console.error('Error fetching requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [session?.user?.id]);


  if (loading) return <p>Loading requests...</p>;

  // Filter only pending requests
  // @ts-ignore
  const pendingRequests = requests.filter(request => request.status === 'pending');

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 space-y-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">
        Parent Requests
      </h1>

      {/* Display request list */}
      <ul className="divide-y divide-gray-200">
        {pendingRequests.length === 0 ? (
          <p className="text-center text-gray-500 italic">No pending requests found</p>
        ) : (
          pendingRequests.map((request:any) => (
            <li
              key={request.requestId}
              className="flex items-center justify-between py-3 hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">
                  {request.parentName} ({request.parentEmail})
                </span>
              </div>
              <span className="text-gray-500 text-sm">{new Date(request.requestDate).toLocaleDateString()}</span>

              {/* Accept/Reject buttons */}
              {request.status === 'pending' && (
                <div className="flex space-x-4">
                  <button
                    className="text-green-500 hover:text-green-700"
                    onClick={() => handleResponse(request.requestId, 'accepted')}
                  >
                    Accept
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleResponse(request.requestId, 'rejected')}
                  >
                    Reject
                  </button>
                </div>
              )}

              {/* Display status */}
              {request.status !== 'pending' && (
                <span className={`text-sm ${request.status === 'accepted' ? 'text-green-500' : 'text-red-500'}`}>
                  {request.status === 'accepted' ? 'Accepted' : 'Rejected'}
                </span>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default StudentDashboard;
