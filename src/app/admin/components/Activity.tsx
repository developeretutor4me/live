import React, { useState } from "react";
import SubscriptionOverTime from "./SubscriptionOverTime";
import LiveSessions from "./LiveSessions";
import ActiveStudents from "./ActiveStudents";
import ActiveEtutor from "./ActiveEtutor";
import ActiveUsers from "./ActiveUsers";
import ActiveLiveSession from "./ActiveLiveSession";
import GeneralSubscriptionOverTime from "./GeneralSubscriptionOverTime";
import WebsiteVisits from "./WebsiteVisits";
import SubscriptionGraph from "./SubscriptionGraph";
import SiteVisits from "./SiteVisits";
import TotalSubscription from "./TotalSubscription";
import TotalAccounts from "./TotalAccounts";
import Atss from "./Atss";
import WebsiteSpeed from "./WebsiteSpeed";
import DemoGraphicReport from "./DemoGraphicReport";
import ActiveEtutorOverview from "./ActiveEtutorOverview";
import TotalEtutorAccounts from "./TotalEtutorAccounts";
import SessionOverview from "./SessionOverview";
import { useUsers } from "../hooks/useUser";

function Activity() {
  const [generalOverview, setGeneralOverview] = useState(false);
  const [EtutorOverview, setEtutorOverview] = useState(false)
  const { users, isLoading, error } = useUsers();

  if(isLoading){
    return <p>Loading...</p>
  }
  if(error){
    return <p></p>
  }
  return (
    <>
      {(generalOverview===false && EtutorOverview===false) && (
        <div className="pl-8 pr-3">
          <div className="pt-4">
            <h1 className="text-5xl text-[#685aad] font-medium">General</h1>
            <section className=" mt-5 custom-xl:mt-10 grid grid-cols-1 custom-xl:grid-cols-2   min-h-[15.5rem] gap-7">
              <div
                onClick={() => {
                  setGeneralOverview(true);
                }}
                className=""
              >
                <SubscriptionOverTime user={users} />
              </div>

              <div className="  rounded-md sm:rounded-xl  custom-lg:rounded-3xl       px-3 custom-xl:px-6 py-3 custom-xl:py-6  bg-[#ede8fa] ">
                <LiveSessions />
              </div>
            </section>
          </div>
          <div className="mt-16">
            <h1 className="text-5xl text-[#685aad] font-medium">
              Students / Parents
            </h1>
            <section className=" mt-5 custom-xl:mt-10 grid grid-cols-1 custom-xl:grid-cols-2   items-start  min-h-[15.5rem] gap-10">
              <div className="px-3 custom-xl:px-6 py-3 custom-xl:py-6  bg-[#ede8fa]  rounded-md sm:rounded-xl  custom-lg:rounded-3xl">
                <ActiveStudents />
              </div>

              <div
                onClick={()=>{
                  setEtutorOverview(true)
                }}
              className="  ">
                <ActiveEtutor />
              </div>
            </section>
          </div>
        </div>
      )}

      {generalOverview && (
        <div className="mt-20  bg-[#f6f4fd] rounded-3xl py-[60px] px-6">
          <h1 className="text-[45px] leading-none text-[#685aad] font-medium pl-11">
            General Website Overview
          </h1>
          <div className="grid grid-cols-1 custom-xl:grid-cols-2 gap-10 mt-12 pt-1">
            <ActiveUsers/>
            <ActiveLiveSession/>
          </div>

          <div className="mt-12 grid grid-cols-1 custom-xl:grid-cols-2 gap-10">
              <GeneralSubscriptionOverTime user={users}/>
              <WebsiteVisits/>
          </div>
          <div className="mt-5 grid grid-cols-1 custom-xl:grid-cols-2 gap-10">
            <SubscriptionGraph/>
            <SiteVisits/>
          </div>
          <div className="mt-14 grid grid-cols-1 custom-xl:grid-cols-2 gap-10">
            <TotalSubscription/>
            <TotalAccounts/>
            
          </div>
          <div className="mt-14 grid grid-cols-1 custom-xl:grid-cols-2 gap-10">
            <Atss/>
            <WebsiteSpeed/>
            
            
          </div>
          <div className="mt-14 ">
            <DemoGraphicReport/>
           
            
            
          </div>

        </div>
      )}


      {EtutorOverview && (
        <div className="mt-20  bg-[#f6f4fd] rounded-3xl py-[60px] px-6">
          <h1 className="text-[45px] leading-none text-[#685aad] font-medium pl-11">
           eTutors Activity Overview
          </h1>
          <div className="grid grid-cols-1 custom-xl:grid-cols-2 gap-10 mt-12 pt-1">
            <ActiveEtutorOverview/>
            <TotalEtutorAccounts user={users}/>
          </div>

         
          <div className="mt-14 ">
            <SessionOverview/>
           
            
            
          </div>

        </div>
      )}

    </>
  );
}

export default Activity;
