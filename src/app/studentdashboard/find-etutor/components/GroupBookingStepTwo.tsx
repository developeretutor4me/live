import React, { useState, useRef } from 'react';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import BookingForm from './BookingForm';
import SidebarCalendar from './SidebarCalendar';
import { v4 as uuidv4 } from 'uuid';
import Add_Icon from '../../../../../public/add-rounded.png';
import Delete_Icon from '../../../../../public/del-icon.png';
import Edit_Icon from '../../../../../public/edit-icon.png';
import Left_Arrow_Icon from '../../../../../public/765BAF-left-icon.png';
import Right_Arrow_Icon from '../../../../../public/765BAF-right-icon.png';
import Image from 'next/image';

interface BookingStepTwoProps {
  bookingStep: number;
  selectedSubjects: string[];
  nextBookingStepHandler: (allSessions: any) => void;
}

interface BookingInfo {
  id: string;
  subjects: string[];
  date: string;
  time: string;
  timeZone: string;
  duration: string;
  studentNote: string;
  cost: number;
}

const GroupBookingStepTwo = ({
  bookingStep,
  selectedSubjects,
  nextBookingStepHandler,
}: BookingStepTwoProps) => {
  const { toast } = useToast();

  const [allBookingSessions, setAllBookingSessions] = useState<any>([]);
  const [editBookingSession, setEditBookingSession] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [bookingInfo, setBookingInfo] = useState<BookingInfo>({
    id: '',
    subjects: [],
    date: '',
    time: '',
    timeZone: '',
    duration: '',
    studentNote: '',
    cost: 200,
  });
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [sessionToDelete, setSessionToDelete] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  console.log('allBookingSessions : ', allBookingSessions);

  const onAddBookingHandler = () => {
    const errors: { [key: string]: string } = {};

    if (!bookingInfo.subjects || bookingInfo.subjects.length === 0) {
      errors.subject = 'Please select a subject';
    }

    if (!bookingInfo.date || bookingInfo.date.trim() === '') {
      errors.date = 'Please select a date';
    }

    if (!bookingInfo.time || bookingInfo.time.trim() === '') {
      errors.time = 'Please select a time';
    }

    if (!bookingInfo.duration || bookingInfo.duration.trim() === '') {
      errors.duration = 'Please select a duration';
    }

    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    if (editBookingSession) {
      const updatedAllBookingSessions = [...allBookingSessions];
      const sessionFindIndex = allBookingSessions.findIndex(
        (session: any) => session.id === editBookingSession.id
      );
      updatedAllBookingSessions[sessionFindIndex] = bookingInfo;
      setAllBookingSessions(updatedAllBookingSessions);
      setBookingInfo({
        id: '',
        subjects: [],
        date: '',
        time: '',
        timeZone: '',
        duration: '',
        studentNote: '',
        cost: 200,
      });
      setEditBookingSession(null);
      setIsEditMode(false);
    } else {
      bookingInfo.id = uuidv4();
      setAllBookingSessions([...allBookingSessions, bookingInfo]);
      setBookingInfo({
        id: '',
        subjects: [],
        date: '',
        time: '',
        timeZone: '',
        duration: '',
        studentNote: '',
        cost: 200,
      });
    }
  };

  const editBookingSessionHandler = (session: any) => {
    setEditBookingSession(session);
    setBookingInfo({
      id: session.id,
      subjects: session.subjects,
      date: session.date,
      time: session.time,
      timeZone: session.timeZone,
      duration: session.duration,
      studentNote: session.studentNote,
      cost: 100,
    });
    setIsEditMode(true);
    setValidationErrors({});
  };

  const deleteBookingSessionHandler = (sessionId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setSessionToDelete(sessionId);
    setShowDeleteModal(true);
  };

  const confirmDeleteSession = () => {
    if (sessionToDelete) {
      const updatedAllBookingSessions = allBookingSessions.filter(
        (session: any) => session.id !== sessionToDelete
      );
      setAllBookingSessions(updatedAllBookingSessions);
      setShowDeleteModal(false);
      setSessionToDelete(null);
    }
  };

  const cancelDeleteSession = () => {
    setShowDeleteModal(false);
    setSessionToDelete(null);
  };

  const editIconClickHandler = (session: any, event: React.MouseEvent) => {
    event.stopPropagation();
    // editBookingSessionHandler(session);
  };

  const onCancelEditBookingHandler = () => {
    setEditBookingSession(null);
    setIsEditMode(false);
    setBookingInfo({
      id: '',
      subjects: [],
      date: '',
      time: '',
      timeZone: '',
      duration: '',
      studentNote: '',
      cost: 200,
    });
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -200,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Sidebar */}
      <div className="w-1/4 bg-white p-6 border-r border-gray-200">
        {/* Sessions Left Counter */}
        <div className="bg-[#ECE8FC] rounded-2xl p-4 mb-6">
          <div className="text-[#685AAD] font-normal text-lg sm:text-xl lg:text-[25.44px]">
            SESSIONS LEFT: <span className="font-bold">0</span>
          </div>
        </div>

        {/* Calendar */}
        <SidebarCalendar />
      </div>

      {/* Right Panel */}
      <div className="w-1/2 bg-[#EDE8FA] p-8 rounded-2xl">
        {/* Progress Bar */}
        <div className="w-full bg-[#e9deff] rounded-full h-1 mb-8">
          <div
            className="bg-[#6949ff] h-1 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${bookingStep * 33.33}%` }}
          />
        </div>

        {/* Session Navigation Bar */}
        <div className="rounded-2xl p-4 mb-8">
          <div className="flex items-center gap-3">
            {/* Left Arrow Button */}
            <button
              onClick={scrollLeft}
              className="bg-[#C2ABFA] text-[#9993A1] hover:bg-[#D5CCE0] rounded-full w-10 h-[75px] flex items-center justify-center transition-colors flex-shrink-0"
            >
              <Image src={Left_Arrow_Icon} alt="Scroll Left" className="w-5 h-5" />
            </button>

            {/* Session Buttons - Scrollable Container */}
            <div
              ref={scrollContainerRef}
              className="flex gap-3 flex-1 overflow-x-auto min-w-0 scrollbar-none"
            >
              <div className="flex gap-3">
                {allBookingSessions.length > 0 &&
                  allBookingSessions.map((session: any, index: number) => {
                    const isSelected = editBookingSession?.id === session.id;

                    return (
                      <button
                        key={session.id}
                        onClick={() => editBookingSessionHandler(session)}
                        className={`px-6 py-3 rounded-2xl text-white font-medium transition-all whitespace-nowrap flex-shrink-0 hover:opacity-90 flex items-center gap-3 ${
                          isSelected ? 'bg-[#8558F9]' : 'bg-[#C2ABFA]'
                        }`}
                      >
                        <span className="text-[18px] md:text-[22px] font-medium">
                          Session {index + 1}
                        </span>
                        {isSelected && (
                          <div className="flex flex-col gap-1">
                            <button
                              onClick={e => deleteBookingSessionHandler(session.id, e)}
                              className="w-4 h-4 flex items-center justify-center hover:bg-white/20 rounded p-0.5 transition-colors"
                            >
                              <Image src={Delete_Icon} alt="Delete" className="w-3 h-3" />
                            </button>
                            <button
                              onClick={e => editIconClickHandler(session, e)}
                              className="w-4 h-4 flex items-center justify-center hover:bg-white/20 rounded p-0.5 transition-colors"
                            >
                              <Image src={Edit_Icon} alt="Edit" className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </button>
                    );
                  })}

                {/* Add Session Button */}
                <button
                  onClick={onAddBookingHandler}
                  className="bg-[#8558F9] text-white px-5 py-2 rounded-2xl flex flex-col items-center hover:bg-[#6B47B8] transition-colors flex-shrink-0"
                >
                  <Image src={Add_Icon} alt="add" className="w-4 h-4" />
                  <span className="text-[18px] md:text-[22px] font-medium">Add session</span>
                </button>
              </div>
            </div>

            {/* Right Arrow Button */}
            <button
              onClick={scrollRight}
              className="bg-[#C2ABFA] text-[#9993A1] hover:bg-[#D5CCE0] rounded-full w-10 h-[75px] flex items-center justify-center transition-colors flex-shrink-0"
            >
              <Image src={Right_Arrow_Icon} alt="Scroll Right" className="w-5 h-5" />
            </button>
          </div>
        </div>

        <BookingForm
          subjects={selectedSubjects}
          bookingInfo={bookingInfo}
          setBookingInfo={setBookingInfo}
          validationErrors={validationErrors}
          setValidationErrors={setValidationErrors}
          isEditMode={isEditMode}
          onCancelEditBookingHandler={onCancelEditBookingHandler}
          onAddBookingHandler={onAddBookingHandler}
          nextBookingStepHandler={() => nextBookingStepHandler(allBookingSessions)}
        />
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={cancelDeleteSession}
        >
          <div
            className="bg-[#EDE8FA] rounded-3xl p-8 mx-4 max-w-[700px] w-full shadow-xl"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-[#FC7777] font-bold text-[20px] sm:text-[25px] md:text-[35px] lg:text-[45px] xl:text-[55px] 2xl:text-[65px] text-center mb-4">
              Are You Sure?
            </h2>
            <p className="text-[#685AAD] text-center text-[1y6px] sm:text-[18px] md:text-[22px] lg:text-[25px] xl:text-[30px] 2xl:text-[35px] mb-8 leading-8">
              Deleting this session is permanent and cannot be undone. Please confirm if you want to
              proceed.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDeleteSession}
                className="bg-[#FC7777] text-[#FFFFFF] text-[34.07px] font-semibold py-3 px-12 rounded-2xl hover:bg-[#e06666] transition-colors"
              >
                Yes, Delete.
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupBookingStepTwo;
