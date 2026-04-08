'use client';
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { apiClient } from '@/utils/helpers';
import { useSocket } from '@/hooks/useSocket';
import { useToast } from '@/hooks/use-toast';
import MyEtutor from '../components/MyEtutor';
import PageLoaderSpinner from '@/components/ui/PageLoaderSpinner';
import ErrorPageLoader from '@/components/ui/ErrorPageLoader';

const MyEtutorPage: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();

  const etutorIdParam = searchParams.get('etutor_id');
  const chatParam = searchParams.get('chat');

  const [parentData, setParentData] = useState<any>(null);
  const [fetchedUserData, setFetchedUserData] = useState<any>(null);
  const [bookingRequests, setBookingRequests] = useState<any>(null);
  const [firstName, setFirstName] = useState<any>(null);
  const [profilePicture, setProfilePicture] = useState<any>(null);
  const [notifications, setNotifications] = useState<any>({});
  const [notificationError, setNotificationError] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [tutortomessage, settutortomessage] = useState<any>(null);
  const [showchatvalue, setShowchatvalue] = useState<boolean>(false);
  const [tutor, setTutor] = useState<any>(null);
  const [terminateeng, setterminateeng] = useState<any>(null);

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
    const chatValue = chatParam === 'true';
    setShowchatvalue(chatValue);
  }, [chatParam]);

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
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user data');
    } finally {
      setLoading(false);
    }
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
      <MyEtutor
        tutorimp={tutortomessage}
        showchatvalue={showchatvalue}
        setActiveFindEtutor={() => router.push('/studentdashboard/find-etutor')}
        setTutor={setTutor}
        showTerminateEngament={setterminateeng}
      />
    </Layout>
  );
};

export default MyEtutorPage;
