import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useUsers } from "../hooks/useUser";

const TotalSubscription: React.FC = () => {
  const [hover, setHover] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);
  const { users, isLoading, error } = useUsers();
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [roleFilter, setRoleFilter] = useState("all");

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleSelect = (value:any) => {
    setRoleFilter(value);
    setDropdownOpen(false); // Close dropdown after selection
  };

  const [subscriptionData, setSubscriptionData] = useState({
    payAsYouGo: 0,
    premium: 0,
    standard: 0,
  });

  useEffect(() => {
    if (!users) return;

    // Filter users based on selected role
    const filtered =
      roleFilter === "all"
        ? users
        : users.filter((user: { role: string; }) => user.role === roleFilter);
    setFilteredUsers(filtered);
  }, [users, roleFilter]);

  useEffect(() => {
    // Update subscription data based on filtered users
    const updatedData = { payAsYouGo: 0, premium: 0, standard: 0 };

    filteredUsers.forEach((user) => {
      switch (user.planType?.type) {
        case "payasyougo":
          updatedData.payAsYouGo += 1;
          break;
        case "premium":
          updatedData.premium += 1;
          break;
        case "standard":
          updatedData.standard += 1;
          break;
        default:
          break;
      }
    });

    setSubscriptionData(updatedData);
    drawChart(updatedData);
  }, [filteredUsers]);

  const drawChart = async (chartData: {
    payAsYouGo: number;
    premium: number;
    standard: number;
  }) => {
    // Load Google Charts
    await new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://www.gstatic.com/charts/loader.js";
      script.onload = resolve;
      document.head.appendChild(script);
    });

    await google.charts.load("current", { packages: ["corechart"] });

    const renderChart = () => {
      if (!chartRef.current) return;

      const data = google.visualization.arrayToDataTable([
        ["Type", "Count"],
        ["payasyougo", chartData.payAsYouGo],
        ["premium", chartData.premium],
        ["standard", chartData.standard],
      ]);

      const options = {
        pieHole: 0.75, // Creates a donut chart
        pieSliceText: "none", // Hides text on slices
        legend: "none", // Hides legend
        slices: {
          0: { color: "#fc7777" }, // Pay-as-you-go - Coral
          1: { color: "#685AAD" }, // Premium - Purple
          2: { color: "#00DAE5" }, // Standard - Cyan
        },
        backgroundColor: "transparent", // Transparent background
        chartArea: {
          width: "100%", // Full width of the container
          height: "100%", // Full height of the container
        },
        tooltip: {
          trigger: "selection", // Shows tooltips on hover
          textStyle: {
            fontSize: 14, // Adjust tooltip font size
            color: "#ffffff", // Tooltip text color
          },
          showColorCode: true, // Show color code in tooltip
        },
        animation: {
          startup: true, // Enables startup animation
          duration: 1000, // Animation duration in ms
          easing: "easeOut", // Smooth easing
        },
        pieSliceBorderColor: "transparent", // Removes white borders
        pieSliceTextStyle: {
          fontSize: 12, // Customize slice text font size
          color: "white", // Customize slice text color
        },
        sliceVisibilityThreshold: 0.02, // Minimum visible slice size
        enableInteractivity: true, // Enables hover effects
        slicesSpacing: 0.05, // Adds space between slices
        roundedCorners: true, // Custom property to handle rounded corners
        pieSliceBorderWidth: 0, // Remove slice borders
      };

      const chart = new google.visualization.PieChart(chartRef.current);
      chart.draw(data, options);
    };

    google.charts.setOnLoadCallback(renderChart);

    const handleResize = () => {
      renderChart();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  };

  const total =
    subscriptionData.payAsYouGo +
    subscriptionData.premium +
    subscriptionData.standard;

  return (
    <div className="min-h-[631px] bg-[#ede8fa] px-3 custom-xl:px-6 py-3 custom-xl:py-8 col-span-1 row-span-2 rounded-md sm:rounded-xl custom-lg:rounded-3xl relative">
      <div className="flex items-start justify-between gap-2 pt-1.5">
        <div className="text-[#7669b5] font-medium pl-7">
          <h1 className="text-5xl">Total Subscriptions</h1>
          <div className="relative">
            {/* <select
              className="bg-transparent text-2xl text-[#7669b5] mt-2 focus:outline-none cursor-pointer outline-none focus:ring-0"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option
                className="bg-[#ede8fa] outline-none focus:ring-0"
                value="all"
              >
                All
              </option>
              <option
                className="bg-[#ede8fa] outline-none focus:ring-0"
                value="student"
              >
                Students
              </option>
              <option
                className="bg-[#ede8fa] outline-none focus:ring-0"
                value="parent"
              >
                Parents
              </option>
            </select> */}

            <div className="relative inline-block text-left">
      {/* Button to toggle dropdown */}
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleDropdown();
        }}
        className="bg-transparent text-2xl text-[#9d93cc] mt-2 focus:outline-none cursor-pointer outline-none focus:ring-0 flex gap-4 items-center"
        type="button"
      >
        {roleFilter === "all"
          ? "All"
          : roleFilter.charAt(0).toUpperCase() + roleFilter.slice(1)}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div className="absolute z-10 bg-transparent text-2xl text-[#9d93cc] focus:outline-none cursor-pointer outline-none focus:ring-0 flex gap-4 items-center mt-2">
          <ul className=" flex gap-y-2 flex-col  ">
            <li
              onClick={() => handleSelect("all")}
              className="block  bg-transparent text-2xl text-[#9d93cc] text-start w-full  focus:outline-none cursor-pointer outline-none focus:ring-0 "
            >
              All
            </li>
            <li
              onClick={() => handleSelect("student")}
              className="block  bg-transparent text-2xl text-[#9d93cc] text-start w-full  focus:outline-none cursor-pointer outline-none focus:ring-0"
            >
              Students
            </li>
            <li
              onClick={() => handleSelect("parent")}
              className="block  bg-transparent text-2xl text-[#9d93cc] text-start w-full  focus:outline-none cursor-pointer outline-none focus:ring-0"
            >
              Parents
            </li>
          </ul>
        </div>
      )}
    </div>
          </div>
        </div>

        <div className="w-fit">
          <Image  loading="lazy" 
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            src="/downloadReport.svg"
            alt=""
            width={28}
            height={28}
            className="w-7 hover:cursor-pointer"
          />
          <div
            className={`absolute w-fit -top-5 right-4 bg-[#7669b5] px-3.5 py-1.5 text-xl rounded-xl text-white transition-all duration-700 transform origin-bottom-right ${
              hover ? "scale-100 opacity-100" : "scale-0 opacity-0"
            }`}
          >
            Download Report
          </div>
        </div>
      </div>

      <div className="chart relative flex justify-center items-center mt-8   ">
        <div className="relative w-[300px] h-[300px]">
          <div ref={chartRef} className="w-full h-full" />
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="text-4xl font-semibold text-[#7669B5]">{total}</div>
            <div className="text-4xl font-semibold text-[#7669B5]">Account</div>
          </div>
        </div>
      </div>

      <div className="flex justify-around gap-8 mt-16">
        <div className="flex flex-col items-end ">
          <div className="flex items-center gap-3 text-base text-[#685AAD] font-bold">
            <div className="bg-[#fc7777] h-[25px] w-[25px] rounded-sm">
              &nbsp;
            </div>{" "}
            Pay as you go
          </div>
          <span className="text-base text-[#685AAD] font-bold">
            {subscriptionData.payAsYouGo} Account
          </span>
        </div>

        <div className="flex flex-col items-end">
          <div className="flex items-center gap-3 text-base text-[#685AAD] font-bold">
            <div className="bg-[#8653FF] h-[25px] w-[25px] rounded-sm">
              &nbsp;
            </div>{" "}
            Premium
          </div>
          <span className="text-base text-[#685AAD] font-bold">
            {subscriptionData.premium} Account
          </span>
        </div>

        <div className="flex flex-col items-end">
          <div className="flex items-center gap-3 text-base text-[#685AAD] font-bold">
            <div className="bg-[#00DAE5] h-[25px] w-[25px] rounded-sm">
              &nbsp;
            </div>{" "}
            Standard
          </div>
          <span className="text-base text-[#685AAD] font-bold">
            {subscriptionData.standard} Account
          </span>
        </div>
      </div>
    </div>
  );
};

export default TotalSubscription;
