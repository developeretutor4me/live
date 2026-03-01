import Image from "next/image";
import React from "react";
import logo from "../../../../public/studentdashlogo.svg";
import Adminlogo from "../../../../public/StudentAdminLogo.svg";
import styles from "../DashboardGrid.module.css";


interface SidebarProps {
    isSidebarOpen: boolean;
    session: any;
    sidebarItems: Array<any>;
    setPreviousSidebarItem: (item: any) => void;
    setActiveSidebarItem: (item: any) => void;
    setTutor: (tutor: any) => void;
    Setsetcomingvalue: (value: any) => void;
    activeSidebarItem: any;
    setIsSidebarOpen: (open: boolean) => void;
}

function Sidebar({
    isSidebarOpen,
    session,
    sidebarItems,
    setPreviousSidebarItem,
    setActiveSidebarItem,
    setTutor,
    Setsetcomingvalue,
    activeSidebarItem,
    setIsSidebarOpen,
}: SidebarProps) {
    return (
        <aside
            className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } ${styles.sidebar} inset-y-0 left-0 z-[1111111111111] max-w-[20rem] custom-2xl:max-w-[400.6px] w-full  overflow-y-auto scrollbar-none h-screen  rounded-tr-[35px] rounded-br-3xl bg-[#534988] text-white flex flex-col transition-transform duration-300 ease-in-out pl-5 pr-9 pt-8 custom-2xl:pt-[42px] pb-4`}
        >
            <div className="flex items-center mb-[24.5%] pb-2 pl-[22px] ">
                {session.user.isAdmin === true ? (
                    <Image
                        loading="lazy"
                        src={Adminlogo}
                        alt=""
                        className="w-52 sm:w-[17rem]"
                    />
                ) : (
                    <Image
                        loading="lazy"
                        src={logo}
                        alt=""
                        className="w-52 sm:w-[17rem]"
                    />
                )}
            </div>
            <nav className="flex-grow flex flex-col">
                <ul className="space-y-[11px] flex-grow">
                    {sidebarItems
                        .filter((item) => !["Settings", "Useful links"].includes(item.name))
                        .filter((item) =>
                            session.user.isAdmin ? item : !["Activity"].includes(item.name)
                        )
                        .map((item) => (
                            <li key={item.name}>
                                <button
                                    onClick={() => {
                                        setPreviousSidebarItem(activeSidebarItem);
                                        setActiveSidebarItem(item.name);
                                        setTutor(null);
                                        if (item.name === "My Sessions") {
                                            Setsetcomingvalue("upcoming");
                                        }

                                        if (window.innerWidth < 1024) {
                                        }
                                        setIsSidebarOpen(false);
                                    }}
                                    className={`flex   hover:shadow-[0px_0px_5px_1px_rgba(255,255,255,0.3)] hover:transition-all duration-1000  items-center w-full px-6 custom-2xl:px-[29px]  py-3 sm:py-[13px] rounded-[22px]  transition-all  ${activeSidebarItem === item.name
                                        ? "bg-white  transition-all"
                                        : "hover:bg-darkpurple transition-all"
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
                                                    ? "none"
                                                    : "invert(1) sepia(1) saturate(0) brightness(140%) opacity(.8)",
                                        }}
                                    />
                                    <p
                                        className={`text-[#cac7d8] text-[20px] custom-2xl:text-[25px] font-normal ${activeSidebarItem === item.name
                                            ? "text-customBlue"
                                            : "text-[#cac7d8]"
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
                        .filter((item) => ["Settings", "Useful links"].includes(item.name))
                        .map((item) => (
                            <li key={item.name}>
                                <button
                                    onClick={() => {
                                        setActiveSidebarItem(item.name);
                                        if (window.innerWidth < 1024) {
                                        }
                                        setIsSidebarOpen(false);
                                    }}
                                    className={`flex   hover:shadow-[0px_0px_5px_1px_rgba(255,255,255,0.3)] hover:transition-all duration-1000  items-center w-full px-6 custom-2xl:px-[29px]  py-3 sm:py-[13px] rounded-[22px]  transition-all  ${activeSidebarItem === item.name
                                        ? "bg-white text-customBlue"
                                        : "hover:bg-darkpurple"
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
                                                    ? "none"
                                                    : "invert(1) sepia(1) saturate(0) brightness(140%) opacity(.8)",
                                        }}
                                    />
                                    <p
                                        className={`text-[#cac7d8] text-[25px] font-normal ${activeSidebarItem === item.name ? "text-customBlue" : ""
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
    );
}

export default Sidebar;
