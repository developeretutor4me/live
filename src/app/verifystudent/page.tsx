"use client";
import axios from "axios";
/* eslint-disable react-hooks/rules-of-hooks */
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function page() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [loading, setloading] = useState(false);

  const userupdate = async () => {
    const formData = {
      userId: session?.user?.id,
      userUpdates: {
        role: "student",
        profilePicture: session?.user.image,
      },
    };

    try {
      const response = await fetch("/api/UpdateUser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
      } else {
      }
    } catch (error) {
    } finally {
    }
  };

  const handleSubmit = async () => {
    let getFormData: any = await localStorage.getItem("formData");
    let formData = await JSON.parse(getFormData);

    await session;
    if (session?.user?.name) {
      const [firstName, ...lastNameParts] = session.user.name.split(" ");

    
      formData = {
        ...formData, 
          firstName: firstName, 
          lastName: lastNameParts.join(" "), 
      
      };

    } else {
      console.error("Session user name is undefined or invalid.");
    }

    try {
      const response = await fetch("/api/updatestudentdata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session?.user?.id,
          studentData: formData,
        }),
      });

      const result = await response.json();
      if (response.ok) {
      } else {
      }
    } catch (error) {
    } finally {
    }
  };

  const updatesession = async () => {
    setloading(true);
    await update({
      user: {
        email: session?.user.email,
        role: "student",
        id: session?.user.id,
        isParent: false,
        isAdmin: false,
      },
    });

    await handleSubmit();

    await userupdate();

    router.push("/studentdashboard");
    router.refresh();

    localStorage.removeItem("formData");
    setloading(false);
  };


  
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <button
        onClick={async (e: any) => {
          e.preventDefault();
          await updatesession();
        }}
        className="px-12 py-4 bg-[#8653ff] rounded-full text-white  capitalize"
      >
        {loading ? "Please Wait..." : "continue"}
      </button>
    </div>
  );
}

export default page;
