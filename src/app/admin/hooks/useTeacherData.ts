import useSWR from "swr";
import { Teacher } from "@/app/etutor/profile/components/Data";

const fetchTeacher = async (): Promise<Teacher> => {
  const res = await fetch("/api/Teacher-Apis/teacher-data");
  if (!res.ok) throw new Error("Failed to fetch teacher data");
  return res.json();
};

export const useTeacherData = () => {
  const { data, error, isLoading } = useSWR(
    "/api/Teacher-Apis/teacher-data",
    fetchTeacher,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );

  return {
    teacher: data,
    isLoading,
    teachererror:error,
  };
};
