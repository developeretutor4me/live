"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ChevronDown, ChevronUp, ChevronLeft, Menu } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import styles from "../DashboardGrid.module.css";

import logo from "../../../../public/etutorlogo.svg";
import adminLogo from "../../../../public/etutuorAdminLogo.svg";
import Home1 from "../../../../public/homeicon.svg";
import translate from "../../../../public/translateicon.svg";
import dark from "../../../../public/darkicon.svg";
import homeinactive from "../../../../public/home inactive.svg";
import bell from "../../../../public/bellicon.svg";
import profile from "../../../../public/profile.svg";
import activeprofile from "../../../../public/activeprofileicon.svg";
import bankdetails from "../../../../public/bankdetails.svg";
import activebankdetails from "../../../../public/activeBankdetails.svg";
import taxinformation from "../../../../public/taxinformation.svg";
import activetaxinformation from "../../../../public/activeTaxinfo.svg";
import awards from "../../../../public/awards.svg";
import activeawards from "../../../../public/activeAwards.svg";
import myfiles from "../../../../public/myfiles.svg";
import activemyfiles from "../../../../public/activeMyfiles.svg";
import pause from "../../../../public/pauseorresign.svg";
import activepause from "../../../../public/activePauseOrresign.svg";

import Profile from "./components/Profile";
import BankDetails from "./components/BankDetails";
import TaxInfo from "./components/TaxInfo";
import Awards from "./components/Awards";
import MyFiles from "./components/MyFiles";
import PauseOrResign from "./components/PauseOrResign";

interface ContactInformation {
  firstName: string;
  country: string;
  phone: string;
  address: string;
}

interface Student {
  profile: {
    firstName: string;
  };
  email: string;
  contactInformation: Pick<ContactInformation, "country" | "phone" | "address">;
}

interface Teacher {
  name: string;
  email: string;
  contactInformation: ContactInformation;
  user?: {
    profilePicture?: string;
  };
}

interface BookingRequest {
  meetingCompleted: boolean;
  joinLink?: string;
  _id: string;
  student: Student;
  teacher: Teacher;
  subjects: string[];
  level: string;
  date: string;
  time: string;
  status: string;
}

interface SidebarItem {
  name: string;
  icon: string;
}

type SidebarItemName =
  | "Profile"
  | "Bank Details"
  | "Tax Information"
  | "Awards"
  | "My Files"
  | "Pause or Resign"
  | "Dashboard";

const MEDIA_QUERY_BREAKPOINT = "(min-width: 1849px)";
const MOBILE_BREAKPOINT = 1024;
const TEACHER_API_ENDPOINT = "/api/Teacher-Apis/teacher-data";
const ADMIN_ROUTE = "/admin";
const ETUTOR_ROUTE = "/etutor";
const PROFILE_ROUTE = "/etutor/profile";

export default function Home() {
  const router = useRouter();
  const { data: session, update } = useSession();
  const targetRef = useRef<HTMLDivElement>(null);
  const [firstName, setfirstName] = useState("");
  const [profilepicture, setprofilePicture] = useState("")
  const [activeSidebarItem, setActiveSidebarItem] =
    useState<SidebarItemName>("Profile");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [previousSidebarItem, setPreviousSidebarItem] = useState<string>("");
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);
  const [teacher, setTeacher] = useState<Teacher>();

  const fetcher = useCallback(
    async (url: string): Promise<Teacher> => {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `HTTP ${response.status}: Teacher not found or internal server error`
        );
      }

      return response.json();
    },
    [session]
  );

  const {
    data: teacherData,
    isLoading,
    error,
  } = useSWR<Teacher>(TEACHER_API_ENDPOINT, fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    onSuccess: setTeacher,
    onError: (err: Error) => {
      console.error("Failed to fetch teacher data:", err);
    },
  });

  const sidebarItems = useMemo(
    (): SidebarItem[] => [
      {
        name: "Profile",
        icon: activeSidebarItem === "Profile" ? activeprofile : profile,
      },
      {
        name: "Bank Details",
        icon:
          activeSidebarItem === "Bank Details"
            ? activebankdetails
            : bankdetails,
      },
      {
        name: "Tax Information",
        icon:
          activeSidebarItem === "Tax Information"
            ? activetaxinformation
            : taxinformation,
      },
      {
        name: "Awards",
        icon: activeSidebarItem === "Awards" ? activeawards : awards,
      },
      {
        name: "My Files",
        icon: activeSidebarItem === "My Files" ? activemyfiles : myfiles,
      },
      {
        name: "Pause or Resign",
        icon: activeSidebarItem === "Pause or Resign" ? activepause : pause,
      },
      {
        name: "Dashboard",
        icon: activeSidebarItem === "Dashboard" ? Home1 : homeinactive,
      },
    ],
    [activeSidebarItem]
  );

  const handleImpersonate = useCallback(async (): Promise<void> => {
    try {
      await update({
        user: {
          email: "admin@gmail.com",
          role: "admin",
          id: "admin",
          isAdmin: true,
          isParent: false,
        },
      });

      setTimeout(() => {
        router.push(ADMIN_ROUTE);
      }, 3000);
    } catch (error) {
      console.error("Failed to impersonate admin:", error);
    }
  }, [update, router]);

  const handleSidebarItemClick = useCallback(
    (itemName: SidebarItemName): void => {
      localStorage.removeItem("active");
      setPreviousSidebarItem(activeSidebarItem);
      setActiveSidebarItem(itemName);

      if (window.innerWidth < MOBILE_BREAKPOINT) {
      }
      setIsSidebarOpen(false);
    },
    [activeSidebarItem]
  );

  const handleBackNavigation = useCallback((): void => {
    if (previousSidebarItem) {
      setActiveSidebarItem(previousSidebarItem as SidebarItemName);
    }
  }, [previousSidebarItem]);

  const toggleSidebar = useCallback((): void => {
    localStorage.removeItem("active");
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const toggleProfile = useCallback((): void => {
    setIsProfileOpen((prev) => !prev);
  }, []);

  const handleSignOut = useCallback((): void => {
    signOut({ callbackUrl: "/" });
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia(MEDIA_QUERY_BREAKPOINT);
    setIsLargeScreen(mediaQuery.matches);

    const handleMediaChange = (event: MediaQueryListEvent): void => {
      setIsLargeScreen(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaChange);
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  const renderSidebarItems = useCallback(
    (items: SidebarItem[], isFooterSection = false): JSX.Element => (
      <ul className={`space-y-2 ${isFooterSection ? "mt-6" : "flex-grow"}`}>
        {items.map((item) => (
          <li key={item.name}>
            <button
              onClick={() =>
                handleSidebarItemClick(item.name as SidebarItemName)
              }
              className={`flex hover:shadow-[0px_0px_5px_1px_rgba(255,255,255,0.3)] hover:transition-all duration-1000 items-center w-full px-6 custom-xl:px-9 py-3 sm:py-[18px] rounded-[22px] transition-all ${activeSidebarItem === item.name
                ? "bg-white transition-all"
                : "hover:bg-darkpurple hover:bg-transparent transition-all"
                }`}
            >
              <Image
                loading="lazy"
                src={item.icon}
                className="w-5 sm:w-6 h-5 sm:h-6 mr-7"
                alt={`${item.name} icon`}
              />
              <p
                className={`text-xl font-medium ${activeSidebarItem === item.name
                  ? "text-customBlue"
                  : "text-darkpurple"
                  }`}
              >
                {item.name}
              </p>
            </button>
          </li>
        ))}
      </ul>
    ),
    [activeSidebarItem, handleSidebarItemClick]
  );

  const handleFnameChange = useCallback((newFname: string) => {
    setfirstName(newFname);
  }, []);
  const handleProfileChange = useCallback((newFname: string) => {
    setprofilePicture(newFname);
  }, []);
  const renderContent = useCallback((): JSX.Element | null => {
    const contentMap: Record<SidebarItemName, JSX.Element | null> = {
      Profile: (
        <Profile
          onFnameChange={handleFnameChange}
          onprofilepicture={handleProfileChange}
        />
      ),
      "Bank Details": <BankDetails />,
      "Tax Information": <TaxInfo />,
      Awards: <Awards />,
      "My Files": <MyFiles />,
      "Pause or Resign": <PauseOrResign teacher={teacher} />,
      Dashboard: null,
    };

    if (activeSidebarItem === "Dashboard") {
      router.push(ETUTOR_ROUTE);
      return null;
    }

    return (
      contentMap[activeSidebarItem] || <div>Select a tab from the sidebar</div>
    );
  }, [activeSidebarItem, teacher, router]);

  const mainSidebarItems = useMemo(
    () => sidebarItems.filter((item) => !["Dashboard"].includes(item.name)),
    [sidebarItems]
  );

  const footerSidebarItems = useMemo(
    () => sidebarItems.filter((item) => ["Dashboard"].includes(item.name)),
    [sidebarItems]
  );

  if (error) {
    console.error("Teacher data fetch error:", error);
  }

  return (
    <div className="flex h-screen bg-white relative z-0">
      <aside
        className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } ${styles.sidebar}  inset-y-0 left-0 z-50 max-w-[20rem] sm:max-w-[25rem] w-full overflow-y-auto scrollbar-none h-screen rounded-tr-3xl rounded-br-3xl bg-[#E6E4F2] text-white flex flex-col transition-transform duration-300 ease-in-out pl-5 pr-9 pt-8 custom-xl:pt-11 pb-4`}
      >
        <div className="flex items-center mb-[23.5%] pb-2 pl-7">
          <Image
            loading="lazy"
            src={session?.user?.isAdmin ? adminLogo : logo}
            alt="Company Logo"
            className="w-52 sm:w-[17rem]"
          />
        </div>

        <nav className="flex-grow flex flex-col">
          {renderSidebarItems(mainSidebarItems)}
          {renderSidebarItems(footerSidebarItems, true)}
        </nav>
      </aside>

      <main className="flex-1 px-2 custom-lg:px-10 py-4 overflow-auto bg-transparent">
        <header
          className={`flex justify-between items-center px-4 custom-lg:px-0 ${activeSidebarItem === "Dashboard" ? "mb-2" : "mb-8"
            }`}
        >
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className={` ${styles.menu} mr-4 text-darkBlue`}
              aria-label="Toggle sidebar"
            >
              <Menu size={24} />
            </button>

            {activeSidebarItem !== "Dashboard" && (
              <div
                onClick={handleBackNavigation}
                className="flex cursor-pointer items-center"
              >
                <ChevronLeft
                  className="mr-2 cursor-pointer text-[#685AAD]"
                  size={24}
                />
                <h1 className="text-[#685AAD] text-xs sm:text-sm custom-lg:text-xl hidden sm:block">
                  Back
                </h1>
              </div>
            )}
          </div>

          <div
            ref={targetRef}
            className="flex items-center space-x-4 relative -right-4 select-none"
          >
            <div className="flex gap-4 custom-xl:gap-6 mr-2">
              <Image
                loading="lazy"
                src={dark}
                alt="Dark mode toggle"
                className="w-5 h-5 custom-xl:w-6 custom-xl:h-6"
              />
              <Image
                loading="lazy"
                src={translate}
                alt="Translate"
                className="w-5 h-5 custom-xl:w-6 custom-xl:h-6"
              />
              <Image
                loading="lazy"
                src={bell}
                alt="Notifications"
                className="w-5 h-5 custom-xl:w-6 custom-xl:h-6"
              />
            </div>

            <div
              onClick={toggleProfile}
              className={`flex bg-[#EDE8FA] hover:cursor-pointer  px-2 py-1 justify-between w-[9rem] custom-xl:w-[12.5rem]   h-10 custom-xl:h-11 items-center rounded-md ${isProfileOpen ? "border border-[#685aad7a]" : "border-0"
                }`}
            >
              <div className=" flex gap-2 items-center justify-center">
                <div className="w-6 custom-xl:min-w-7 h-6 custom-xl:min-h-7  rounded-full overflow-hidden flex items-center">
                  <img
                    src={profilepicture}
                    alt=""
                    className="object-cover object-center"
                  />
                </div>

                <span className="text-sm custom-xl:text-base font-bold text-[#685AAD]">
                  {firstName && firstName.length > 8
                    ? `${firstName.slice(0, 8)}...`
                    : firstName || ""}

                </span>
              </div>

              {isProfileOpen ? (
                <ChevronUp
                  size={18}
                  className="cursor-pointer  text-[#685AAD] "
                />
              ) : (
                <ChevronDown
                  size={18}
                  className="cursor-pointer  text-[#685AAD] "
                />
              )}
            </div>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 hover:cursor-pointer bg-[#EDE8FA] font-bold rounded-md shadow-lg py-1 z-10 top-full w-[9rem] custom-xl:w-[12.5rem] px-4 border border-[#685aad7a]">
                <Link
                  href={PROFILE_ROUTE}
                  className="block px-2 py-2 custom-xl:py-3 text-sm text-[#685AAD] border-b border-[#685aad7a]"
                >
                  Profile
                </Link>

                {session?.user?.isAdmin && (
                  <button
                    onClick={handleImpersonate}
                    className="block w-full text-left px-2 py-2 custom-xl:py-3 text-sm text-[#685AAD] border-b border-[#685aad7a]"
                  >
                    Back to Admin
                  </button>
                )}

                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-2 py-2 custom-xl:py-3 text-sm text-[#685AAD]"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {renderContent()}
      </main>
    </div>
  );
}
