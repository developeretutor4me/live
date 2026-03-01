import React, { useState } from 'react';
import BookingStepOne from './BookingStepOne';
import GroupBookingStepTwo from './GroupBookingStepTwo';
import TrailBookingStepTwo from './TrailBookingStepTwo';
import BookingStepThree from './BookingStepThree';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface BookingProps {
  selectedTutor: any;
  isTrialSessionLeft: boolean;
  bookingStep: number;
  setBookingStep: (step: number) => void;
}

interface BookingRequestsProps {
  id: string;
  subjects: string[];
  date: string;
  time: string;
  timeZone: string;
  duration: string;
  studentNote: string;
  cost: number;
}

const Booking = ({
  selectedTutor,
  isTrialSessionLeft,
  bookingStep,
  setBookingStep,
}: BookingProps) => {
  const [selectedSubjects, setSelectedSubjects] = useState<any>([]);
  const [selectedLevel, setSelectedLevel] = useState<String>('');
  const [bookingRequestsList, setBookingRequestsList] = useState<BookingRequestsProps[]>([]);
  const [sedningBooking, setSedningBooking] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

  const nextBookingStepHandler = (allSessions: any) => {
    if (!allSessions || allSessions.length === 0) {
      toast({
        title: 'No Sessions Added',
        description: 'Please add at least one session before proceeding.',
        variant: 'destructive',
      });
      return;
    }

    setBookingRequestsList(allSessions);
    setBookingStep(3);
  };

  const groupBookingRequestHandler = async () => {
    setSedningBooking(true);
    try {
      const dataSessions = bookingRequestsList.map((session: any) => {
        const [day, month, year] = session.date.split('/');
        const formattedDate = `${year}-${month}-${day}`;

        return {
          date: formattedDate,
          time: session.time,
          timeZone: session.timeZone,
          duration: session.duration,
          studentNote: session.studentNote,
          subjects: session.subjects,
        };
      });

      const data = {
        teacherId: selectedTutor._id,
        level: selectedLevel,
        sessions: dataSessions,
      };

      const response = await axios.post('/api/booking/in-groups', data);

      if (response.data.success) {
        toast({
          title: 'Booking Successful',
          description: `${response.data.data.totalSessions} session(s) booked successfully!`,
          variant: 'default',
        });

        setTimeout(() => {
          router.push('/parent/sessions');
        }, 1500);
      } else {
        toast({
          title: 'Booking Failed',
          description: response.data.message || 'Failed to create booking. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      console.error('error : ', error);
      toast({
        title: 'Error',
        description: 'An error occurred while creating the booking. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSedningBooking(false);
    }
  };

  const trailBookingRequestHandler = async () => {
    setSedningBooking(true);
    try {
      const formatDateForAPI = (dateStr: string) => {
        if (!dateStr) return '';
        const [day, month, year] = dateStr.split('/');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      };

      const data = {
        teacherId: selectedTutor._id,
        level: selectedLevel,
        date: formatDateForAPI(bookingRequestsList[0].date),
        time: bookingRequestsList[0].time,
        timeZone: bookingRequestsList[0].timeZone,
        duration: '30 min',
        studentnote: bookingRequestsList[0].studentNote,
        subjects: selectedSubjects,
      };

      const response = await axios.post('/api/booking/trial', data);

      if (response.status === 201) {
        toast({
          title: 'Booking Successful',
          description: `Trial session booked successfully!`,
          variant: 'default',
        });

        setTimeout(() => {
          router.push('/parent/sessions');
        }, 1500);
      } else {
        toast({
          title: 'Booking Failed',
          description: response.data.message || 'Failed to create booking. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      console.error('error : ', error);
      toast({
        title: 'Error',
        description: 'An error occurred while creating the booking. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSedningBooking(false);
    }
  };

  if (bookingStep === 1) {
    return (
      <BookingStepOne
        bookingStep={bookingStep}
        setBookingStep={setBookingStep}
        selectedTutor={selectedTutor}
        selectedSubjects={selectedSubjects}
        setSelectedSubjects={setSelectedSubjects}
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
      />
    );
  } else if (bookingStep === 2 && !isTrialSessionLeft) {
    return (
      <GroupBookingStepTwo
        bookingStep={bookingStep}
        selectedSubjects={selectedSubjects}
        nextBookingStepHandler={nextBookingStepHandler}
      />
    );
  } else if (bookingStep === 2 && isTrialSessionLeft) {
    return (
      <TrailBookingStepTwo
        bookingStep={bookingStep}
        selectedSubjects={selectedSubjects}
        nextBookingStepHandler={nextBookingStepHandler}
      />
    );
  } else if (bookingStep === 3) {
    return (
      <BookingStepThree
        bookingStep={bookingStep}
        sessions={bookingRequestsList}
        tutorContactInfo={selectedTutor.contactInformation}
        subjects={selectedSubjects}
        level={selectedLevel}
        groupBookingRequestHandler={groupBookingRequestHandler}
        trailBookingRequestHandler={trailBookingRequestHandler}
        sedningBooking={sedningBooking}
        isTrialSessionLeft={isTrialSessionLeft}
      />
    );
  }
};

export default Booking;
