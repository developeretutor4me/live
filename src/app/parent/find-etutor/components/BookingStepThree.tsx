import React from 'react';
import SidebarSessionsList from './SidebarSessionsList';
import { Loader2 } from 'lucide-react';

interface BookingStepThreeProps {
  bookingStep: number;
  sessions: any[];
  tutorContactInfo: any;
  subjects: any[];
  level: any;
  groupBookingRequestHandler: () => void;
  trailBookingRequestHandler: () => void;
  sedningBooking: boolean;
  isTrialSessionLeft: boolean;
}

const BookingStepThree = ({
  bookingStep,
  sessions,
  tutorContactInfo,
  subjects,
  level,
  groupBookingRequestHandler,
  trailBookingRequestHandler,
  sedningBooking,
  isTrialSessionLeft,
}: BookingStepThreeProps) => {
  return (
    <div className="w-full flex mb-10 overflow-hidden">
      {/* Left Sidebar */}
      {!isTrialSessionLeft && (
        <div className="w-1/3 bg-white p-6 border-r border-gray-200">
          <SidebarSessionsList bookingSessions={sessions} />
        </div>
      )}

      {/* Main Content Area */}
      <div
        className={` bg-[#EDE8FA] p-10 rounded-3xl ${isTrialSessionLeft ? 'w-[50%] mx-auto' : 'w-2/3'}`}
      >
        <div className="w-full flex flex-col items-center">
          <div className="w-full bg-[#e9deff] rounded-full h-1 my-5">
            <div
              className="bg-[#6949ff] h-1 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${bookingStep * 33.33}%` }}
            />
          </div>

          <h1 className="text-[#685AAD] font-bold text-[20px] md:text-[35px] my-8">
            Confirm your booking
          </h1>

          {/* Main Content Card */}
          <div className="bg-[#E2D6FD] rounded-2xl p-8 w-full max-w-2xl shadow-lg">
            {/* Booking Details */}
            <div className="space-y-4 mb-6">
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

              <div className="flex justify-between items-center">
                <span className="text-[#9184D2] text-[16.67px] uppercase font-normal">LEVEL</span>
                <span className="text-[#685AAD] text-[16.78px] uppercase font-medium">{level}</span>
              </div>

              {isTrialSessionLeft && (
                <div className="flex justify-between items-center">
                  <span className="text-[#9184D2] text-[16.67px] uppercase font-normal">
                    Duration
                  </span>
                  <span className="text-[#685AAD] text-[16.78px] uppercase font-medium">
                    30 minutes
                  </span>
                </div>
              )}

              {isTrialSessionLeft && (
                <div className="flex justify-between items-center">
                  <span className="text-[#9184D2] text-[16.67px] uppercase font-normal">DATE</span>
                  <span className="text-[#685AAD] text-[16.78px] uppercase font-medium">
                    {(() => {
                      const sessionDate = sessions[0]?.date;
                      if (!sessionDate) return '';

                      // Parse the date (assuming it's in DD/MM/YYYY format)
                      const [day, month, year] = sessionDate.split('/');
                      const dateObj = new Date(year, month - 1, day);

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

                      // Format as "17 - June - 12:00PM"
                      return `${day} - ${monthName} - ${sessions[0]?.time || '12:00PM'}`;
                    })()}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span className="text-[#9184D2] text-[16.67px] uppercase font-normal">
                  NUMBER OF SESSIONS
                </span>
                <span className="text-[#685AAD] text-[16.78px] uppercase font-medium">
                  {isTrialSessionLeft ? '1 Free' : sessions.length} sessions
                </span>
              </div>
            </div>

            {/* Separator Line */}
            <hr className="border-[#9284D2] mb-6" />

            {/* Cost Summary */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-[#685AAD] text-[16.78px] uppercase font-normal">
                  TOTAL COST
                </span>
                <span className="text-[#685AAD] text-[16.78px] uppercase font-medium">
                  $
                  {isTrialSessionLeft
                    ? '0.00'
                    : sessions.reduce((total, session) => total + session.cost, 0).toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[#685AAD] text-[16.78px] uppercase font-normal">
                  DISCOUNT
                </span>
                <span className="text-[#685AAD] text-[16.78px] uppercase font-medium">-</span>
              </div>

              <hr className="border-[#9284D2] mb-4" />

              <div className="flex justify-between items-center">
                <span className="text-[#685AAD] text-[16.78px] uppercase font-normal">
                  TOTAL COST
                </span>
                <span className="text-[#685AAD] text-[16.78px] uppercase font-medium">
                  $
                  {isTrialSessionLeft
                    ? '0.00'
                    : sessions.reduce((total, session) => total + session.cost, 0).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Important Notice */}
          </div>

          <div className="p-4 my-6 text-center">
            <p className="text-[#685AAD] text-[14px] leading-relaxed">
              <span className="font-medium">Important Notice:</span> For the Pay As You Go plan and
              any additional sessions booked,<br></br> you will not be charged immediately.<br></br>{' '}
              Charges will be applied only after you complete your session with the eTutors.
            </p>
          </div>

          <button
            onClick={isTrialSessionLeft ? trailBookingRequestHandler : groupBookingRequestHandler}
            disabled={sedningBooking}
            className="bg-[#8558F9] text-white font-medium text-[25px] px-12 py-4 rounded-full hover:bg-[#6B47B8] transition-colors mt-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {sedningBooking && <Loader2 className="w-6 h-6 animate-spin" />}
            {sedningBooking ? 'Sending...' : 'Send Request'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingStepThree;
