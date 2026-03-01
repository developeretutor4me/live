'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const ParentDashboard = () => {
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status ,update} = useSession();
  const router = useRouter();

 
  useEffect(() => {
    const fetchStudents = async () => {
        if (!session?.user?.id) return;
  
        try {
          const userId = session.user.id; 
          const response = await axios.get('/api/parent-Student-Relationship/parent-side-api/fetchAcceptedRequests', {
            params: { parentUserId: userId  }, // Send userId to the backend
          });
          setAcceptedRequests(response.data.requests);
         
        } catch (error) {
          console.error('Error fetching students:', error);
        } finally {
          setLoading(false);
        }
      };
    fetchStudents();
  }, [session]);

  const handleImpersonate = async (studentUserId: string, StudentEmail:string) => {
   
    await update({
      user:{
        email:StudentEmail,
        role:"student",
        id:studentUserId,
        isParent:true,
        isAdmin:false
      }
    })
    setTimeout(() => {
        router.push('/studentdashboard')
    }, 3000);
  
  };
 

  

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 space-y-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">
        Accepted Requests
      </h1>

      {/* Display list of accepted requests */}
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 space-y-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">
        Accepted Requests
      </h1>

    
      {/* Display list of accepted requests */}
      <ul className="divide-y divide-gray-200">
        {acceptedRequests.length === 0 ? (
          <p className="text-center text-gray-500 italic">No accepted requests</p>
        ) : (
          acceptedRequests.map((request:any) => (
            <li
              key={request.requestId}
              className="flex items-center justify-between py-3 hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">
                  {request.studentName} ({request.studentEmail})
                </span>
              </div>
              <span className="text-gray-500 text-sm">{new Date(request.requestDate).toLocaleDateString()}</span>

              {/* Impersonate button */}
              <button
                className="text-blue-500 hover:text-blue-700"
                onClick={() => handleImpersonate(request.studentUserId,request.StudentEmail)}
              >
                Impersonate
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
    </div>
  );
};

export default ParentDashboard;
