import Image from "next/image";
import React, { useState } from "react";
import etokiicon from "../../../../public/etokiIcon.svg";
import plus from "../../../../public/plusIncrease.svg";
import minus from "../../../../public/minusDecrease.svg";
import minuscircle from "../../../../public/minuscircle.svg";
import pluscircle from "../../../../public/plusecircle.svg";
import axios from "axios";
import { useSession } from "next-auth/react";
interface activityprops {
  parent: any;
  etokiesprop: any;
  sessionData: any;
}
function Activity({ parent, etokiesprop, sessionData }: activityprops) {
  const { data: session } = useSession();
  const [etokies, setetokies] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [trialSessionsLeft, setTrialSessionsLeft] = useState(
    Number(parent?.user?.TrialSessionLeft) || 0
  );
  const [etokieEdit, setetokieEdit] = useState(false);
  const sendRedeemRequest = async () => {
    setLoading(true);
    // Reset success message
    try {
      const response = await axios.post("/api/UpdateEtokies", { etokies });
      if (response.data.success) {
        etokiesprop(etokies);
      } else {
      }
    } catch (error) {
      console.error("Error redeeming etokies:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    // Call API to update trial sessions
    setLoading(true);
    const response = await fetch("/api/updateTrialsessions", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: session?.user.id, trialSessionsLeft }),
    });

    if (response.ok) {
      setIsEditing(false);
      setLoading(false);
    } else {
      console.error("Failed to update trial sessions");
      setLoading(false);
    }
  };

  return (
    <div className="h-fit   p-3 sm:p-6 custom-lg:p-8 custom-xl:px-14 custom-xl:py-12 rounded-md sm:rounded-xl  custom-lg:rounded-3xl bg-[#ede8fa]">
      <div className=" ">
        <div className="flex gap-4 sm:gap-8 custom-lg:gap-16 custom-xl:gap-16 items-center ">
          <div className="img  rounded-full h-[70px] sm:h-[100px] custom-xl:h-[200px] w-[70px] sm:w-[100px] custom-xl:w-[200px] flex items-center justify-center overflow-hidden">
            <img
              src={parent?.user?.profilePicture}
              alt=""
              className="object-cover w-full"
            />
          </div>

          <div className="flex flex-col gap-1 custom-xl:gap-3">
            <span className=" text-2xl custom-lg:text-4xl custom-xl:text-[55px] leading-none font-bold  text-[#6c5baa]">
              {parent?.firstName} {parent?.lastName}
            </span>
            <span className=" text-lg custom-lg:text-xl custom-xl:text-[33px] leading-none   text-[#6c5baa]">
              Student ID: {parent?.user?._id.substring(0, 6)}
            </span>
            <span className=" text-lg custom-lg:text-xl custom-xl:text-[26px] leading-none font-medium text-[#6c5baa]">
              {parent?.user?.email || ""}
            </span>
          </div>
        </div>

        <div className="data px-2 grid grid-cols-1 custom-lg:grid-cols-2 custom-xl:grid-cols-3  mt-3 sm:mt-6 custom-lg:mt-8 custom-xl:mt-16 gap-x-9 custom-xl:gap-x-20 gap-y-2 sm:gap-y-4 custom-lg:gap-y-7 custom-xl:gap-y-10">
          <div className="">
            <label className="block text-lg sm:text-3xl  font-medium text-[#685aad]">
              Membership
            </label>
            <input
              type="text"
              className="mt-2 sm:mt-4 px-9 py-2 sm:py-3 custom-xl:py-5 outline-none block w-full rounded-xl text-white bg-[#b4a5d7] text-base sm:text-lg custom-xl:text-2xl "
              value={parent?.user?.planType?.type || "-"}
              disabled
            />
          </div>
          <div className="">
            <label className="block text-lg sm:text-3xl  font-medium text-[#685aad]">
              Package Duration
            </label>
            <input
              type="text"
              className="mt-2 sm:mt-4 px-9 py-2 sm:py-3 custom-xl:py-5 outline-none block w-full rounded-xl text-white bg-[#b4a5d7] text-base sm:text-lg custom-xl:text-2xl "
              value={parent?.user?.durationMonths || "-"}
              disabled
            />
          </div>
          <div className="">
            <label className="block text-lg sm:text-3xl  font-medium text-[#685aad]">
              eTutor’s Level
            </label>
            <input
              type="text"
              className="mt-2 sm:mt-4 px-9 py-2 sm:py-3 custom-xl:py-5 outline-none block w-full rounded-xl text-white bg-[#b4a5d7] text-base sm:text-lg custom-xl:text-2xl "
              value={parent?.user?.tutorLevel || "-"}
              disabled
            />
          </div>
          <div className="">
            <label className="block text-lg sm:text-3xl  font-medium text-[#685aad]">
              Activation Date
            </label>
            <input
              type="text"
              className="mt-2 sm:mt-4 px-9 py-2 sm:py-3 custom-xl:py-5 outline-none block w-full rounded-xl text-white bg-[#b4a5d7] text-base sm:text-lg custom-xl:text-2xl "
              value={new Date(
                parent?.user?.planType?.updatedAt
              ).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
              disabled
            />
          </div>
          <div className="">
            <label className="block text-lg sm:text-3xl  font-medium text-[#685aad]">
              Age
            </label>
            <input
              type="text"
              className="mt-2 sm:mt-4 px-9 py-2 sm:py-3 custom-xl:py-5 outline-none block w-full rounded-xl text-white bg-[#b4a5d7] text-base sm:text-lg custom-xl:text-2xl "
              value={
                parent?.user?.role === "student"
                  ? parent?.personalInformation.age
                  : parent?.user?.role === "parent"
                  ? parent?.childInformation.age
                  : "Not Available"
              }
              disabled
            />
          </div>
          <div className="">
            <label className="block text-lg sm:text-3xl  font-medium text-[#685aad]">
              Grade Level
            </label>
            <input
              type="text"
              className="mt-2 sm:mt-4 px-9 py-2 sm:py-3 custom-xl:py-5 outline-none block w-full rounded-xl text-white bg-[#b4a5d7] text-base sm:text-lg custom-xl:text-2xl "
              value={parent?.grade || "Not Available"}
              disabled
            />
          </div>
          <div className="">
            <label className="block text-lg sm:text-3xl  font-medium text-[#685aad]">
              Institution
            </label>
            <input
              type="text"
              className="mt-2 sm:mt-4 px-9 py-2 sm:py-3 custom-xl:py-5 outline-none block w-full rounded-xl text-white bg-[#b4a5d7] text-base sm:text-lg custom-xl:text-2xl "
              value={
                parent?.user?.role === "student"
                  ? parent?.personalInformation.institution
                  : parent?.user?.role === "parent"
                  ? parent?.childInformation.institution
                  : "Not Available"
              }
              disabled
            />
          </div>
          <div className="">
            <label className="block text-lg sm:text-3xl  font-medium text-[#685aad]">
              Signup Date
            </label>
            <input
              type="text"
              className="mt-2 sm:mt-4 px-9 py-2 sm:py-3 custom-xl:py-5 outline-none block w-full rounded-xl text-white bg-[#b4a5d7] text-base sm:text-lg custom-xl:text-2xl "
              value={new Date(parent?.user?.createdAt).toLocaleDateString(
                "en-GB",
                {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                }
              )}
              disabled
            />
          </div>
          <div className="">
            <label className="block text-lg sm:text-3xl  font-medium text-[#685aad]">
              Sessions Completed
            </label>
            <input
              type="text"
              className="mt-2 sm:mt-4 px-9 py-2 sm:py-3 custom-xl:py-5 outline-none block w-full rounded-xl text-white bg-[#b4a5d7] text-base sm:text-lg custom-xl:text-2xl "
              value={
                sessionData.filter(
                  (request: any) =>
                    request.status === "accepted" &&
                    request.meetingCompleted === true
                ).length || 0
              }
            />
          </div>
          <div className="">
            <label className="block text-lg sm:text-3xl  font-medium text-[#685aad]">
              Sessions Left
            </label>
            <input
              type="text"
              className="mt-2 sm:mt-4 px-9 py-2 sm:py-3 custom-xl:py-5 outline-none block w-full rounded-xl text-white bg-[#b4a5d7] text-base sm:text-lg custom-xl:text-2xl "
              value={parent?.user?.sessionsPerMonth || 0}
              disabled
            />
          </div>
          <div className="">
            <label className="block text-lg sm:text-3xl  font-medium text-[#685aad]">
              Sessions Booked
            </label>
            <input
              type="text"
              className="mt-2 sm:mt-4 px-9 py-2 sm:py-3 custom-xl:py-5 outline-none block w-full rounded-xl text-white bg-[#b4a5d7] text-base sm:text-lg custom-xl:text-2xl "
              value={
                sessionData.filter(
                  (request: any) =>
                    request.status === "accepted" && !request.meetingCompleted
                ).length || 0
              }
              disabled
            />
          </div>
          <div className="">
            <label className="block text-lg sm:text-3xl  font-medium text-[#685aad]">
              Free Trials completed
            </label>

            <input
              type="text"
              className="mt-2 sm:mt-4 px-9 py-2 sm:py-3 custom-xl:py-5 outline-none block w-full rounded-xl text-white bg-[#b4a5d7] text-base sm:text-lg custom-xl:text-2xl "
              value={
                sessionData.filter(
                  (request: any) =>
                    request.status === "accepted" &&
                    request.meetingCompleted === true &&
                    request.IsTrialSession === true
                ).length || 0
              }
              disabled
            />
          </div>

          <div className="">
            <label className="block text-lg sm:text-3xl  font-medium text-[#685aad]">
              Free Trials Left
            </label>
            <div className="relative">
              <input
                type="text"
                className="mt-2 sm:mt-4 px-9 py-2 sm:py-3 custom-xl:py-5 outline-none block w-full rounded-xl text-white bg-[#b4a5d7] text-base sm:text-lg custom-xl:text-2xl "
                value={trialSessionsLeft}
                onChange={(e: any) => {
                  const value = e.target.value;
                  if (!isNaN(Number(value))) {
                    setTrialSessionsLeft(value);
                  }
                }}
                disabled={isEditing}
              />
              {isEditing ? (
                <div className="flex gap-2 absolute top-1/2  transform  -translate-y-1/2 right-3">
                  <Image
                    className="hover:cursor-pointer w-[25px] sm:w-[35px] custom-xl:w-[51px] "
                    onClick={(e) => {
                      e.preventDefault();
                      setTrialSessionsLeft((prev) => Math.max(prev - 1, 0));
                    }}
                    src={minuscircle}
                    alt=""
                  />
                  <Image
                    className="hover:cursor-pointer w-[25px] sm:w-[35px] custom-xl:w-[51px] "
                    onClick={(e) => {
                      e.preventDefault();
                      setTrialSessionsLeft(Number(trialSessionsLeft) + 1);
                    }}
                    src={pluscircle}
                    alt=""
                  />
                </div>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsEditing((prev) => !prev);
                  }}
                  className="absolute top-1/2  transform  -translate-y-1/2 right-3 rounded-lg bg-[#8653ff] px-12 text-lg py-2 sm:py-2.5 custom-xl:py-3.5 "
                >
                  Edit
                </button>
              )}
            </div>

            <div className="mt-2 sm:mt-3 pt-1 px-1 flex justify-between items-center sm:flex-row flex-col gap-3">
              {isEditing && (
                <div className="flex gap-x-2 sm:order-1 order-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setTrialSessionsLeft(
                        Number(parent?.user?.TrialSessionLeft)
                      );
                      setIsEditing(false);
                    }}
                    className="px-4 sm:px-8 py-0.5 sm:py-2 rounded-xl bg-[#ff6c72] text-white text-base sm:text-2xl"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 sm:px-9 py-0.5 sm:py-2 rounded-xl bg-[#8653ff] text-white text-base sm:text-2xl"
                  >
                    {loading ? "wait..." : "Save"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          <label className="block text-lg sm:text-3xl  font-medium text-[#685aad]   custom-xl:gap-x-12 mt-2 sm:mt-4 custom-lg:mt-7 custom-xl:mt-10">
            Subjects Needed
          </label>
          {parent?.user?.role === "parent"
            ? parent?.subjectChildNeeds?.length > 0 && (
                <div className="flex flex-wrap items-start justify-start gap-2 mt-6  max-w-[26rem]  min-h-[5rem]">
                  {parent?.subjectChildNeeds.map((subject: any) => (
                    <span
                      key={subject}
                      className="bg-[#b4a5d7] text-white px-10 w-full flex items-center  text-base custom-lg:text-2xl max-w-[187px] py-3 custom-lg:py-5 rounded-xl justify-center "
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              )
            : parent?.subjects?.length > 0 && (
                <div className="flex flex-wrap items-start justify-start gap-2 mt-6  max-w-[26rem]  min-h-[5rem]">
                  {parent?.subjects?.map((subject: any) => (
                    <span
                      key={subject}
                      className="bg-[#b4a5d7] text-white px-10 w-full flex items-center  text-base custom-lg:text-2xl max-w-[187px] py-3 custom-lg:py-5 rounded-xl justify-center "
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              )}
        </div>
      </div>

      <div className="flex justify-between gap-6 custom-xl:flex-row flex-col  mt-20 pt-3 ">
        <div className=" w-full max-w-[28rem] custom-xl:order-1 order-2">
          <label className="block text-lg sm:text-3xl  font-medium text-[#685aad]">
            Students etokis
          </label>

          <div className="relative">
            <input
              type="text"
              className="mt-2 sm:mt-4 px-11 py-2 sm:py-3 custom-xl:py-4 outline-none block w-full rounded-xl text-white bg-[#b4a5d7] text-base sm:text-lg custom-xl:text-5xl font-bold "
              value={etokies || 0}
              onChange={(e: any) => {
                const value = e.target.value;
                if (!isNaN(Number(value))) {
                  setetokies(value);
                }
              }}
            />
            <Image
              loading="lazy"
              src={etokiicon}
              alt=""
              className="w-8 custom-xl:w-16 h-8 custom-xl:h-16 absolute top-1/2  transform  -translate-y-1/2 right-8"
            />
          </div>

          <div className="mt-2 sm:mt-5 pt-1 px-5 flex justify-between items-center sm:flex-row flex-col gap-3">
            {etokieEdit ? (
              <>
                <div className="flex gap-x-2 ">
                <button
                    onClick={(e) => {
                      e.preventDefault();
                      setetokies(Number(parent?.user?.etokis));
                      setetokieEdit(false);
                    }}
                    className="py-2 sm:py-2.5 custom-xl:py-3.5  px-6 rounded-xl bg-[#ff6c72] text-white text-base sm:text-2xl"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={sendRedeemRequest}
                    className="py-2 sm:py-2.5 custom-xl:py-3.5 px-8 rounded-xl bg-[#8653ff] text-white text-base sm:text-2xl"
                  >
                    {loading ? "wait..." : "Save"}
                  </button>
               
                </div>

                


                <div className="flex gap-2 ">
                  <Image
                    className="hover:cursor-pointer w-[25px] sm:w-[35px] custom-xl:w-[51px] "
                    onClick={(e) => {
                      e.preventDefault();
                      setetokies(Number(etokies) - 1);
                    }}
                    src={minuscircle}
                    alt=""
                  />
                  <Image
                    className="hover:cursor-pointer w-[25px] sm:w-[35px] custom-xl:w-[51px] "
                    onClick={(e) => {
                      e.preventDefault();
                      setetokies(Number(etokies) + 1);
                    }}
                    src={pluscircle}
                    alt=""
                  />
                </div>



                
             
              </>
            ) : (
              <div className="flex justify-between w-full">
                <div></div>
              <button
              onClick={(e) => {
                e.preventDefault();
                setetokieEdit((prev) => !prev);
              }}
              className="rounded-lg bg-[#8653ff] px-12 text-lg py-2 sm:py-2.5 custom-xl:py-3.5 "
            >
              Edit
            </button>

              </div>
            )}
          </div>
        </div>

        {/* additional information */}
        <div className="space-y-2 custom-lg:col-span-2 w-full max-w-[50rem] custom-xl:order-2 order-1">
          <label className="block text-lg sm:text-2xl font-semibold text-[#685aad] pl-3">
            Additional Information
          </label>

          <div className="bg-[#ece6ff] rounded-2xl p-4 ">
            <textarea
              value={parent?.additionalInformation}
              disabled
              className="w-full bg-[#b4a5d7] outline-none text-white min-h-[200px] text-xl font-medium   rounded-3xl px-7 py-4 resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Activity;
