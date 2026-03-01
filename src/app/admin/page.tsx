'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, ChevronUp, ChevronLeft, Menu } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import logo from '../../../public/etutorAdminLogo.svg';
import Image from 'next/image';
import Home1 from '../../../public/homeicon.svg';
import transactionActive from '../../../public/activeTransaction.svg';
import transactionInActive from '../../../public/Inactive_transection.svg';
import activePricing from '../../../public/activePricing.svg';
import inactivePricing from '../../../public/inactivePricing.svg';
import activeGroup from '../../../public/activeGroup.svg';
import inactivegroup from '../../../public/inactiveGroup.svg';
import activeTutor from '../../../public/activeEtutor.svg';
import inactivetutor from '../../../public/inactiveEtutor.svg';
import ActiveActivity from '../../../public/activeActivity.svg';
import inactiveactivity from '../../../public/inactiveActivity.svg';
import InactiveLogActivity from '../../../public/inactiveLogActivity.svg';
import activeLogactivity from '../../../public/ActiveLogActivity.svg';
import setting from '../../../public/settingicon.svg';
import link from '../../../public/linkicons.svg';
import bell from '../../../public/bellicon.svg';
import translate from '../../../public/translateicon.svg';
import dark from '../../../public/darkicon.svg';
import homeinactive from '../../../public/home inactive.svg';
import supportinactive from '../../../public/support inactive.svg';
import activeSupport from '../../../public/contactandsupporticon.svg';
import settinginactive from '../../../public/settings inactive.svg';
import linksinactive from '../../../public/links inactive.svg';
import levellogo from '../../../public/level5 logo.svg';
import level1 from '../../../public/level-1.svg';
import level2 from '../../../public/level-2.svg';
import level3 from '../../../public/level-3.svg';
import level4 from '../../../public/level-4.svg';
import level5 from '../../../public/level-5.svg';
import level6 from '../../../public/level-6.svg';
import level7 from '../../../public/level-7.svg';
import level8 from '../../../public/level-8.svg';
import level9 from '../../../public/level-9.svg';
import level10 from '../../../public/level-10.svg';
import useSWR from 'swr';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Transaction from './components/Transaction';
import Pricing from './components/Pricing';
import Students from './components/Students';
import Etutors from './components/Etutors';
import Activity from './components/Activity';
import e from '../../../public/eicon.svg';
import Support from './components/Support';
import { usePlandata } from './hooks/usePlandata';
import Dashboard from './components/Dashboard';

interface Student {
  profile: {
    firstName: String;
  };
  email: string;
  contactInformation: {
    country: string;
    phone: string;
    address: string;
  };
}

interface Teacher {
  name: string;
  email: string;
  contactInformation: {
    firstName: string;
    country: string;
    phone: string;
    address: string;
  };
}

interface BookingRequest {
  studentdetails: any;
  startLink: string;
  meetingCompleted: boolean;
  joinLink: string | undefined;
  _id: string;
  student: Student;
  teacher: Teacher;
  subjects: string[];
  level: string;
  date: string;
  time: string;
  status: string;
}

const SessionsDashboard = () => {
  const [activeSidebarItem, setActiveSidebarItem] = useState('Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { data: session } = useSession(); // Get the session data
  const targetRef = useRef<HTMLDivElement>(null); // Reference to your component
  const [firstname, setFirstname] = useState('');
  const [profilepicture, setProfilepicture] = useState('');

  // const { PlanData, isLoading, mutate, error } = usePlandata();

  // If the click is outside the component (targetRef), close the dropdown/modal/etc.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (targetRef.current && !targetRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // if (isLoading) {
  //   return <p className="text-black">Loading...</p>;
  // } else if (error) {
  //   return <p>wait...</p>;
  // }

  const sidebarItems = [
    {
      name: 'Dashboard',
      icon: activeSidebarItem === 'Dashboard' ? Home1 : homeinactive,
    },
    {
      name: 'Transactions',
      icon: activeSidebarItem === 'Transaction' ? transactionActive : transactionInActive,
    },
    {
      name: 'Pricing',
      icon: activeSidebarItem === 'Pricing' ? activePricing : inactivePricing,
    },
    {
      name: 'Students',
      icon: activeSidebarItem === 'Students' ? activeGroup : inactivegroup,
    },

    {
      name: 'eTutors',
      icon: activeSidebarItem === 'eTutors' ? activeTutor : inactivetutor,
    },
    {
      name: 'Activity',
      icon: activeSidebarItem === 'Activity' ? ActiveActivity : inactiveactivity,
    },
    {
      name: 'Log activity',
      icon: activeSidebarItem === 'Log activity' ? activeLogactivity : InactiveLogActivity,
    },
    {
      name: 'Support',
      icon: activeSidebarItem === 'Support' ? activeSupport : supportinactive,
    },
    // { name: "Activity", icon: activity },
    {
      name: 'Settings',
      icon: activeSidebarItem === 'Settings' ? setting : settinginactive,
    },
    {
      name: 'Useful links',
      icon: activeSidebarItem === 'Useful links' ? link : linksinactive,
    },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const PlanData = {
    data: {
      standard: [],
      premium: [],
      payasyougo: [],
      bundles: [],
    },
  };

  const renderContent = () => {
    switch (activeSidebarItem) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Transactions':
        return <Transaction />;
      case 'Pricing':
        return <Pricing plandata={PlanData} />;
      case 'Students':
        return <Students />;
      case 'eTutors':
        return <Etutors />;
      case 'Activity':
        return <Activity />;
      case 'Support':
        return <Support />;
      default:
        return null;
    }
  };

  return (
    session?.user?.role === 'admin' && (
      <div className="flex min-h-screen bg-white relative z-0 max-w-[1920px] w-full mx-auto">
        {/* Sidebar */}
        <aside
          className={` ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } 2xl:translate-x-0 fixed 2xl:static inset-y-0 left-0 z-50 max-w-[20rem] sm:max-w-[25rem] w-full min-h-screen 2xl:h-screen  rounded-tr-3xl rounded-br-3xl bg-[#E6E4F2] text-white flex flex-col transition-transform duration-300 ease-in-out pl-5 pr-9 pt-8 custom-2xl:pt-11 pb-4`}
        >
          <div className="flex items-center mb-[23.5%] pb-2 pl-7">
            <Image loading="lazy" src={logo} alt="" className="w-52 sm:w-[17rem]" />
          </div>
          <nav className="flex-grow flex flex-col">
            <ul className="space-y-2 flex-grow">
              {sidebarItems
                .filter(item => !['Settings', 'Useful links'].includes(item.name))
                .map(item => (
                  <li key={item.name}>
                    <button
                      onClick={() => {
                        setActiveSidebarItem(item.name);
                        if (window.innerWidth < 1600) {
                          setIsSidebarOpen(false);
                        }
                      }}
                      className={`flex    hover:shadow-[0px_0px_5px_1px_rgba(255,255,255,0.3)] hover:transition-all duration-1000  items-center w-full px-6 custom-2xl:px-9 py-3 sm:py-[18px] rounded-[22px]  transition-all  ${
                        activeSidebarItem === item.name
                          ? 'bg-white  transition-all'
                          : 'hover:bg-darkpurple hover:bg-transparent transition-all'
                      }`}
                    >
                      <Image
                        loading="lazy"
                        src={item.icon}
                        className="w-5 sm:w-6 h-5 sm:h-6 mr-7"
                        alt=""
                      />
                      <p
                        className={`text-[#cac7d8] text-xl font-medium ${
                          activeSidebarItem === item.name ? 'text-customBlue' : 'text-darkpurple'
                        }`}
                      >
                        {item.name}
                      </p>
                    </button>
                  </li>
                ))}
            </ul>
            <ul className="space-y-2 mt-6 ">
              {sidebarItems
                .filter(item => ['Settings', 'Useful links'].includes(item.name))
                .map(item => (
                  <li key={item.name}>
                    <button
                      onClick={() => {
                        setActiveSidebarItem(item.name);
                        if (window.innerWidth < 1600) {
                          setIsSidebarOpen(false);
                        }
                      }}
                      className={`flex   hover:shadow-[0px_0px_5px_1px_rgba(255,255,255,0.3)] hover:transition-all duration-1000  items-center w-full px-6 custom-2xl:px-9 py-3 sm:py-[18px] rounded-[22px]  transition-all  ${
                        activeSidebarItem === item.name
                          ? 'bg-white text-customBlue'
                          : 'hover:bg-darkpurple hover:bg-transparent'
                      }`}
                    >
                      <Image
                        loading="lazy"
                        src={item.icon}
                        className="w-5 sm:w-6 h-5 sm:h-6 mr-7"
                        alt=""
                      />
                      <p
                        className={`text-[#cac7d8] text-xl font-medium ${
                          activeSidebarItem === item.name ? 'text-customBlue' : 'text-darkpurple'
                        }`}
                      >
                        {item.name}
                      </p>
                    </button>
                  </li>
                ))}
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <main
          className={`flex-1 px-4 max-h-screen overflow-auto ${
            activeSidebarItem === 'Support'
              ? 'custom-lg:px-[25px]'
              : activeSidebarItem === 'Dashboard'
                ? 'custom-lg:px-[24px]'
                : 'custom-lg:px-[42px]'
          }  py-4 overflow-auto  bg-transparent`}
        >
          <header
            className={` ${
              activeSidebarItem === '' ? 'hidden' : 'flex justify-between items-center'
            }  ${activeSidebarItem === 'Session overview' ? 'mb-2' : 'mb-8'}`}
          >
            <div className="flex items-center">
              <button onClick={toggleSidebar} className="2xl:hidden mr-4 text-darkBlue">
                <Menu size={24} />
              </button>

              {activeSidebarItem === 'Dashboard' ? <></> : ''}
              {activeSidebarItem === 'My Sessions' && (
                <h1 className="text-[#685AAD]  text-sm sm:text-md custom-lg:text-5xl  font-extrabold ml-0 sm:ml-6 absolute top-16 left-16 sm:static">
                  My&nbsp;Sessions
                </h1>
              )}
            </div>

            <div
              ref={targetRef}
              className="flex items-center   space-x-4 relative -right-5 top-1 select-none "
            >
              {/* <Bell size={24} className="cursor-pointer text-darkBlue" /> */}
              <div className="flex gap-4 custom-2xl:gap-9 mr-10  max-w-[9rem] w-full">
                <Image
                  loading="lazy"
                  src={dark}
                  alt=""
                  className="w-5 h-5 custom-2xl:w-[28px] custom-2xl:h-[28px]"
                />
                <Image
                  loading="lazy"
                  src={translate}
                  alt=""
                  className="w-5 h-5 custom-2xl:w-[28px] custom-2xl:h-[28px]"
                />
                <Image
                  loading="lazy"
                  src={bell}
                  alt=""
                  className="w-5 h-5 custom-2xl:w-[28px] custom-2xl:h-[28px]"
                />
              </div>

              <div
                onClick={toggleProfile}
                className={`flex bg-[#EDE8FA] hover:cursor-pointer  px-4 py-2 justify-between w-[9rem] custom-2xl:w-[12.5rem]   h-10 custom-2xl:h-[53px] items-center rounded-xl ${
                  isProfileOpen ? 'border border-[#685aad7a]' : 'border-0'
                }`}
              >
                <div className="flex gap-3 items-center">
                  <div className="w-6 custom-2xl:w-[35px] h-6 custom-2xl:h-[35px]    rounded-full overflow-hidden flex items-center justify-center">
                    <Image src={e} alt="" className="  object-cover " />
                  </div>
                  {/* <div className="flex items-center  w-full  gap-2 custom-2xl:gap-4">
    
                  </div> */}
                  <span className="text-sm custom-2xl:text-base font-bold text-[#685AAD]">
                    Admin
                  </span>
                </div>

                {isProfileOpen ? (
                  <ChevronUp size={18} className="cursor-pointer  text-[#685AAD] " />
                ) : (
                  <ChevronDown size={18} className="cursor-pointer  text-[#685AAD] " />
                )}
              </div>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 hover:cursor-pointer  bg-[#EDE8FA] font-bold rounded-md shadow-lg py-1 z-10 top-full w-[9rem] custom-2xl:w-[12.5rem] px-4 border border-[#685aad7a]">
                  {/* <Link
                    href="#"
                    className="block px-2 py-2 custom-2xl:py-3 text-sm text-[#685AAD]  border-b border-[#685aad7a] "
                  >
                    Profile
                  </Link> */}

                  <a
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="block px-2 py-2 custom-2xl:py-3 text-sm text-[#685AAD] "
                  >
                    Logout
                  </a>
                </div>
              )}
            </div>
          </header>
          {renderContent()}
        </main>
      </div>
    )
  );
};

export default SessionsDashboard;
