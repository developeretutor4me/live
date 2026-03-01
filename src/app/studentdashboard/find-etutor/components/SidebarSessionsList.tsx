import React from 'react';

const SidebarSessionsList = ({ bookingSessions }: any) => {
  const formatDate = (dateString: string, timeString: string) => {
    if (!dateString || !timeString) return 'Not specified';

    try {
      // Handle date format like "22/10/2025" (DD/MM/YYYY)
      if (dateString.includes('/')) {
        const [day, month, year] = dateString.split('/');
        const date = new Date(`${year}-${month}-${day}`);
        const monthName = date.toLocaleDateString('en-US', { month: 'long' });
        return `${day} - ${monthName} - ${timeString}`;
      }

      // Handle ISO date format
      const date = new Date(dateString);
      const month = date.toLocaleDateString('en-US', { month: 'long' });
      const day = date.getDate();
      return `${day} - ${month} - ${timeString}`;
    } catch (error) {
      return `${dateString} - ${timeString}`;
    }
  };

  const formatDuration = (duration: string) => {
    if (!duration) return 'Not specified';

    // If duration already includes "min" or "minutes", return as is
    if (duration.includes('min')) {
      return duration;
    }

    return `${duration} minutes`;
  };

  return (
    <div className="space-y-4">
      {bookingSessions.map((session: any, index: number) => (
        <div key={session.id} className="bg-[#EDE8FA] rounded-2xl p-6 shadow-sm">
          {/* Session Title */}
          <h3 className="text-[#685AAD] font-bold text-[20px] md:text-[34px] uppercase mb-4">
            SESSION {index + 1}
          </h3>

          {/* Session Details */}
          <div className="space-y-3">
            {/* Session Length */}
            <div className="flex justify-between items-center">
              <span className="text-[#685AAD] font-normal text-[20px]">SESSION&apos;S LENGTH</span>
              <span className="text-[#685AAD] font-normal text-[20px]">
                {formatDuration(session.duration)}
              </span>
            </div>

            {/* Date and Time */}
            <div className="flex justify-between items-center">
              <span className="text-[#685AAD] font-normal text-[20px]">DATE AND TIME</span>
              <span className="text-[#685AAD] font-normal text-[20px]">
                {formatDate(session.date, session.time)}
              </span>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center">
              <span className="text-[#685AAD] font-normal text-[20px]">TOTAL</span>
              <span className="text-[#685AAD] font-normal text-[20px]">
                ${session?.cost.toFixed(2)}
              </span>
            </div>

            {/* Subject */}
            <div className="flex justify-between items-center">
              <span className="text-[#685AAD] font-normal text-[20px]">SUBJECT</span>
              <span className="text-[#685AAD] font-normal text-[20px]">
                {session.subjects.join(' / ') || 'Not specified'}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SidebarSessionsList;
