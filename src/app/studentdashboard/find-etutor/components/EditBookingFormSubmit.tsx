import React from 'react';
import { Loader2 } from 'lucide-react';

interface EditBookingFormSubmitProps {
  bookingStep: number;
  bookingData: any;
  tutorContactInfo: any;
  subjects: any[];
  level: any;
  editBookingHandler: () => void;
  loadingEditBookingRequest: boolean;
}

const EditBookingFormSubmit = ({
  bookingStep,
  bookingData,
  tutorContactInfo,
  subjects,
  level,
  editBookingHandler,
  loadingEditBookingRequest,
}: EditBookingFormSubmitProps) => {
  return (
    <div className="w-full flex mb-10 overflow-hidden">
      {/* Main Content Area */}
      <div className="bg-[#EDE8FA] p-10 rounded-3xl w-[50%] mx-auto">
        <div className="w-full flex flex-col items-center">
          <div className="w-full bg-[#e9deff] rounded-full h-1 my-5">
            <div
              className="bg-[#6949ff] h-1 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${bookingStep * 33.33}%` }}
            />
          </div>

          <h1 className="text-[#685AAD] font-bold text-[20px] md:text-[35px] my-8">
            Confirm your edit booking
          </h1>

          {/* Main Content Card */}
          <div className="bg-[#E2D6FD] rounded-2xl p-8 w-full max-w-2xl shadow-lg">
            {/* Booking Details */}
            <div className="space-y-4 mb-12">
              <div className="flex justify-between items-center">
                <span className="text-[#9184D2] text-[16.67px] uppercase font-normal">TUTOR</span>
                <span className="text-[#685AAD] text-[16.78px] uppercase font-medium">
                  {tutorContactInfo.firstName} &nbsp; {tutorContactInfo.lastName}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[#9184D2] text-[16.67px] uppercase font-normal">SUBJECT</span>
                <span className="text-[#685AAD] text-[16.78px] uppercase font-medium">
                  {subjects.join(' - ')}
                </span>
              </div>

              <div className="flex justify-between items-center mb-10">
                <span className="text-[#9184D2] text-[16.67px] uppercase font-normal">LEVEL</span>
                <span className="text-[#685AAD] text-[16.78px] uppercase font-medium">{level}</span>
              </div>

              <div className="flex justify-between items-center mb-10">
                <span className="text-[#9184D2] text-[16.67px] uppercase font-normal">
                  Duration
                </span>
                <span className="text-[#685AAD] text-[16.78px] uppercase font-medium">
                  {bookingData?.duration} minutes
                </span>
              </div>

              <div className="flex justify-between items-center mb-10">
                <span className="text-[#9184D2] text-[16.67px] uppercase font-normal">DATE</span>
                <span className="text-[#685AAD] text-[16.78px] uppercase font-medium">
                  {(() => {
                    const sessionDate = bookingData?.date;
                    if (!sessionDate) return '';

                    // Handle different date formats (DD/MM/YYYY or MM/DD/YYYY)
                    let day, month, year;
                    if (sessionDate.includes('/')) {
                      const parts = sessionDate.split('/');
                      // Assume DD/MM/YYYY format
                      day = parts[0];
                      month = parts[1];
                      year = parts[2];
                    } else {
                      // Handle ISO date format (YYYY-MM-DD)
                      const dateObj = new Date(sessionDate);
                      day = dateObj.getDate().toString().padStart(2, '0');
                      month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
                      year = dateObj.getFullYear().toString();
                    }

                    const dateObj = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

                    // Get the month name
                    const monthNames = [
                      'January',
                      'February',
                      'March',
                      'April',
                      'May',
                      'June',
                      'July',
                      'August',
                      'September',
                      'October',
                      'November',
                      'December',
                    ];
                    const monthName = monthNames[dateObj.getMonth()];

                    // Format time with AM/PM
                    const time = bookingData?.time || '12:00';
                    const [hours, minutes] = time.split(':');
                    const hour12 = parseInt(hours) % 12 || 12;
                    const ampm = parseInt(hours) >= 12 ? 'PM' : 'AM';
                    const formattedTime = `${hour12}:${minutes} ${ampm}`;

                    return `${day} - ${monthName} - ${formattedTime}`;
                  })()}
                </span>
              </div>

              <div className="flex justify-between items-center mb-10">
                <span className="text-[#9184D2] text-[16.67px] uppercase font-normal">
                  TIMEZONE
                </span>
                <span className="text-[#685AAD] text-[16.78px] uppercase font-medium">
                  {bookingData?.timeZone || 'UTC'}
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 my-6 text-center">
            <p className="text-[#685AAD] text-[14px] leading-relaxed">
              <span className="font-medium">Important Notice:</span> For the Pay As You Go plan and
              any additional sessions booked,<br></br> you will not be charged immediately.<br></br>{' '}
              Charges will be applied only after you complete your session with the eTutors.
            </p>
          </div>

          <button
            onClick={() => editBookingHandler()}
            className="bg-[#8558F9] w-full text-white font-medium text-[25px] px-12 py-4 rounded-full hover:bg-[#6B47B8] transition-colors mt-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loadingEditBookingRequest && <Loader2 className="w-6 h-6 animate-spin" />}
            {loadingEditBookingRequest ? 'Editing...' : 'Edit Booking'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBookingFormSubmit;
