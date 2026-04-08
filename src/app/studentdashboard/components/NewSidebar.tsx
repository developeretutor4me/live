import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useSession } from 'next-auth/react';
import logo from '../../../../public/studentdashlogo.svg';
import styles from '../DashboardGrid.module.css';

interface SidebarItem {
  name: string;
  icon: any;
  route: string;
}

interface SidebarProps {
  isSidebarOpen: boolean;
  sidebarItems: SidebarItem[];
  activeSidebarItem: string;
  setIsSidebarOpen: (open: boolean) => void;
}

function Sidebar({
  isSidebarOpen,
  sidebarItems,
  activeSidebarItem,
  setIsSidebarOpen,
}: SidebarProps) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSidebarItemClick = (item: SidebarItem) => {
    router.push(item.route);

    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Toggle Button - Shows when sidebar is hidden */}
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed left-4 top-4 z-[11111111110] bg-darkpurple text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 hover:scale-110"
          aria-label="Open sidebar"
        >
          <Menu size={24} />
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } ${styles.sidebar} fixed inset-y-0 left-0 z-[11111111111] max-w-[20rem] custom-2xl:max-w-[400.6px] w-full h-screen overflow-y-auto scrollbar-none rounded-tr-[35px] rounded-br-3xl bg-darkpurple text-white flex flex-col transition-transform duration-300 ease-in-out pl-5 pr-9 pt-8 custom-2xl:pt-[42px] pb-4`}
      >
        <div className="flex items-center justify-between mb-[24.5%] pb-2 pl-[22px]">
          <Image loading="lazy" src={logo} alt="" className="w-52 sm:w-[17rem]" />

          {/* Close button inside sidebar - Hidden on screens 1920px and larger */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-all duration-200 max-[1920px]:block hidden"
            aria-label="Close sidebar"
          >
            <X size={24} />
          </button>
        </div>
        <nav className="flex-grow flex flex-col">
          <ul className="space-y-[11px] flex-grow">
            {sidebarItems
              .filter(
                item =>
                  !['Settings', 'Useful links'].includes(item.name) &&
                  (item.name !== 'Activity' || session?.user?.isAdmin)
              )
              .map(item => (
                <li key={item.name}>
                  <button
                    onClick={() => handleSidebarItemClick(item)}
                    className={`flex   hover:shadow-[0px_0px_5px_1px_rgba(255,255,255,0.3)] hover:transition-all duration-1000  items-center w-full px-6 custom-2xl:px-[29px]  py-3 sm:py-[13px] rounded-[22px]  transition-all  ${
                      activeSidebarItem === item.name
                        ? 'bg-white  transition-all'
                        : 'hover:bg-darkpurple transition-all'
                    }`}
                  >
                    <Image
                      loading="lazy"
                      src={item.icon}
                      className="w-5 sm:w-[24.4px] h-5 sm:h-[24.4px] mr-4 custom-2xl:mr-8"
                      alt=""
                      style={{
                        filter:
                          activeSidebarItem === item.name
                            ? 'none'
                            : 'invert(1) sepia(1) saturate(0) brightness(140%) opacity(.8)',
                      }}
                    />
                    <p
                      className={`text-[#cac7d8] text-[20px] custom-2xl:text-[25px] font-normal ${
                        activeSidebarItem === item.name ? 'text-customBlue' : 'text-[#cac7d8]'
                      }`}
                    >
                      {item.name}
                    </p>
                  </button>
                </li>
              ))}
          </ul>
          <ul className="space-y-[11px] mt-6 ">
            {sidebarItems
              .filter(item => ['Settings', 'Useful links'].includes(item.name))
              .map(item => (
                <li key={item.name}>
                  <button
                    onClick={() => handleSidebarItemClick(item)}
                    className={`flex   hover:shadow-[0px_0px_5px_1px_rgba(255,255,255,0.3)] hover:transition-all duration-1000  items-center w-full px-6 custom-2xl:px-[29px]  py-3 sm:py-[13px] rounded-[22px]  transition-all  ${
                      activeSidebarItem === item.name
                        ? 'bg-white text-customBlue'
                        : 'hover:bg-darkpurple'
                    }`}
                  >
                    <Image
                      loading="lazy"
                      src={item.icon}
                      className="w-5 sm:w-[24.4px] h-5 sm:h-[24.4px] mr-8"
                      alt=""
                      style={{
                        filter:
                          activeSidebarItem === item.name
                            ? 'none'
                            : 'invert(1) sepia(1) saturate(0) brightness(140%) opacity(.8)',
                      }}
                    />
                    <p
                      className={`text-[#cac7d8] text-[25px] font-normal ${
                        activeSidebarItem === item.name ? 'text-customBlue' : ''
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
    </>
  );
}

export default Sidebar;
