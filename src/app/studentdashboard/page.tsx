'use client';
import React, { useEffect, useMemo, useState } from 'react';
import Layout from './components/Layout';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/utils/helpers';
import { useSocket } from '@/hooks/useSocket';
import { useToast } from '@/hooks/use-toast';
import { eachDayOfInterval, endOfMonth, isSameDay, startOfMonth, startOfWeek } from 'date-fns';
import useSWR from 'swr';
import DashboardGrid from './DashboardGrid';
import PageLoaderSpinner from '@/components/ui/PageLoaderSpinner';
import ErrorPageLoader from '@/components/ui/ErrorPageLoader';

const Page: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();

  // Layout data
  const [parentData, setParentData] = useState<any>(null);
  const [fetchedUserData, setFetchedUserData] = useState<any>(null);
  const [bookingRequests, setBookingRequests] = useState<any>(null);
  const [firstName, setFirstName] = useState<any>(null);
  const [profilePicture, setProfilePicture] = useState<any>(null);
  const [notifications, setNotifications] = useState<any>({});
  const [notificationError, setNotificationError] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Dashboard-specific state
  const [sessionData, setSessionData] = useState<any[]>([]);
  const [etokies, setEtokies] = useState(0);
  const [setsessionleft, setSetsessionleft] = useState(0);
  const [redeem, setredeem] = useState(false);
  const [radeemLoading, setRadeemLoading] = useState(false);
  const [currentDate] = useState(new Date());
  const [view] = useState('month');
  const [popup, setpopup] = useState(null);
  const [, Setsetcomingvalue] = useState('');
  const [recievedmessages, setRecievedmessages] = useState([]);
  const [, setchat] = useState(false);
  const [, settutortomessage] = useState(null);

  const { updateNotificationStatusHandler: socketUpdateNotificationStatusHandler } = useSocket({
    userId: session?.user?.id || '',
    onError: () => {},
    onUserNotifications: data => {
      if (data.success) {
        setNotifications({
          notifications: data.notifications,
          count: data.count,
          unreadCount: data.unreadCount,
        });
      }
    },
    onUserNotificationsError: err => {
      setNotifications({ notifications: [], count: 0, unreadCount: 0 });
      setNotificationError(err.message || 'Failed to load notifications');
      toast({
        title: 'Notification Error',
        description: err.message || 'Failed to load notifications',
        variant: 'destructive',
      });
    },
  });

  useEffect(() => {
    if (session?.user?.role === 'teacher') router.push('/etutor');
    else if (session?.user?.role === 'parent') router.push('/parent');
  }, [session?.user?.role, router]);

  useEffect(() => {
    getUserData();
  }, [session?.user?.id]);

  const getUserData = async () => {
    if (!session?.user?.id) return;
    try {
      setError(null);
      setLoading(true);
      const [
        parentDataResult,
        userDataResult,
        bookingRequestsResult,
        firstNameResult,
        profilePictureResult,
      ] = await Promise.all([
        apiClient.fetchParentData(session.user.id),
        apiClient.fetchUserData(session.user.id),
        apiClient.fetchBookingRequests(),
        apiClient.fetchFirstName(),
        apiClient.fetchProfilePicture(),
      ]);
      setParentData(parentDataResult);
      setFetchedUserData(userDataResult);
      setBookingRequests(bookingRequestsResult);
      setFirstName(firstNameResult || '');
      setProfilePicture(profilePictureResult?.profilePicture || null);
      setEtokies(userDataResult?.etokis || 0);
      setSetsessionleft(userDataResult?.sessionsPerMonth || 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchSessionData = async () => {
      if (!session?.user?.id) return;
      try {
        const response = await fetch('/api/fetch-send-requests');
        if (response.ok) {
          const data = await response.json();
          setSessionData(data.bookingRequests || []);
        }
      } catch {}
    };
    fetchSessionData();
  }, [session?.user?.id]);

  const { data: senderMessages } = useSWR(
    session?.user?.id ? `/api/recipient/messages?recipientId=${session.user.id}` : null,
    async (url: string) => {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch senders');
      return res.json();
    }
  );

  useEffect(() => {
    if (senderMessages) setRecievedmessages(senderMessages);
  }, [senderMessages]);

  const calendarDays = useMemo(() => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    const days = eachDayOfInterval({ start, end });
    const firstDay = startOfWeek(start);
    const preDays = eachDayOfInterval({ start: firstDay, end: start });
    return [...preDays.slice(0, -1), ...days];
  }, [currentDate, view]);

  const getSessionForDate = (date: any) =>
    sessionData
      .filter((s: any) => !s.meetingCompleted)
      .find((s: any) => isSameDay(new Date(s.date), date));

  const handleRedeem = async () => {
    if (etokies < 50) {
      toast({
        title: 'Insufficient eTokens',
        description: 'You need at least 50 eTokens to redeem.',
        variant: 'default',
      });
      return;
    }
    setRadeemLoading(true);
    try {
      const response = await fetch('/api/redeem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ etokies }),
      });
      if (!response.ok) throw new Error('Failed to redeem');
      const data = await response.json();
      if (data.success) {
        setSetsessionleft(prev => prev + 1);
        setEtokies(prev => prev - 50);
        toast({
          title: 'Redeem Successful',
          description: 'You have successfully redeemed 50 eTokens.',
          variant: 'default',
        });
      } else {
        toast({ title: 'Redeem Failed', description: 'Something went wrong.', variant: 'default' });
      }
    } catch {
      toast({
        title: 'Error',
        description: 'An error occurred while redeeming.',
        variant: 'default',
      });
    } finally {
      setRadeemLoading(false);
    }
  };

  const navigateFromDashboard = (itemName: string) => {
    const routeMap: Record<string, string> = {
      'My Sessions': '/studentdashboard/sessions',
      Calendar: '/studentdashboard/calendar',
      'My eTutor': '/studentdashboard/my-etutor',
      'Find eTutor': '/studentdashboard/find-etutor',
      'My Membership': '/studentdashboard/membership',
      'Refer your Friends': '/studentdashboard/refer',
      'Contact Support': '/studentdashboard/support',
      Settings: '/studentdashboard/settings',
      'Useful links': '/studentdashboard/useful-links',
    };
    const route = routeMap[itemName];
    if (route) router.push(route);
  };

  const onNotificationClickHandler = async (notification: any) => {
    if (socketUpdateNotificationStatusHandler) {
      socketUpdateNotificationStatusHandler(notification._id);
    } else {
      try {
        await fetch(`/api/notifications/status?notificationId=${notification._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
        });
      } catch {}
    }
  };

  if (loading) return <PageLoaderSpinner />;
  if (error) return <ErrorPageLoader error={error} />;

  return (
    <Layout
      handleBackNavigationHandler={() => router.push('/studentdashboard')}
      parentData={parentData}
      fetchedUserData={fetchedUserData}
      bookingRequests={bookingRequests}
      firstName={firstName}
      profilePicture={profilePicture}
      notifications={notifications}
      notificationError={notificationError}
      onNotificationClickHandler={onNotificationClickHandler}
    >
      <DashboardGrid
        isOpenNoti={false}
        etokies={etokies}
        setActiveSidebarItem={navigateFromDashboard}
        handleRedeem={handleRedeem}
        setredeem={setredeem}
        radeemLoading={radeemLoading}
        redeem={redeem}
        setsessionleft={setsessionleft}
        currentDate={currentDate}
        view={view}
        calendarDays={calendarDays}
        getSessionForDate={getSessionForDate}
        setpopup={setpopup}
        popup={popup}
        sessionData={sessionData}
        Setsetcomingvalue={Setsetcomingvalue}
        recievedmessages={recievedmessages}
        setchat={setchat}
        settutortomessage={settutortomessage}
      />
    </Layout>
  );
};

export default Page;
