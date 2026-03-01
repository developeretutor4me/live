import React from "react";
import Totalincome from "./Totalincome";
import TotalPayouts from "./TotalPayouts";
import TotalincomeDashboard from "./TotalincomeDashboard";
import TotalPayoutsDashboard from "./TotalPayoutsDashboard";
import WebsiteVisitsDashbaord from "./WebsiteVisitsDashbaord";
import LiveSessionsDashboard from "./LiveSessionsDashboard";
import TicketInboxDashboard from "./TicketInboxDashboard";
import ChatInboxDashboard from "./ChatInbox";
import SiteVisitsDashboard from "./SiteVisitsDashboard";
import TotalAccountsDashboard from "./TotalAccountsDashboard";

function Dashboard() {
  return (
    <div className="">

      <div className="grid grid-cols-1 md:grid-cols-2 custom-xl:grid-cols-[31.3%_38.3%_auto] min-h-[168.61px] gap-7   ">
        <div className="h-[9rem]  md:h-auto">
          <TotalincomeDashboard />
        </div>
        <div className="h-[9rem]  md:h-auto">
          <LiveSessionsDashboard />
        </div>
        <div className="h-[9rem]  md:h-auto">
          <TicketInboxDashboard />
        </div>
        <div className="h-[9rem]  md:h-auto">
          <TotalPayoutsDashboard />
        </div>
        <div className="h-[9rem]  md:h-auto">
          <WebsiteVisitsDashbaord />
        </div>
        <div className="h-[9rem]  md:h-auto">
          <ChatInboxDashboard />
        </div>
      </div>

      <div className="grid grid-cols-1 2xl:grid-cols-2 h-[440px] mb-28  mt-7 gap-7">
        <div className="h-full">
          <SiteVisitsDashboard />
        </div>
        <div className="">
          <TotalAccountsDashboard />
        </div>
      </div>

    </div>
  );
}

export default Dashboard;
