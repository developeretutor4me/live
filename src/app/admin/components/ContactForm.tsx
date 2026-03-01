import {  useToast } from "@/hooks/use-toast";
import React, { useState } from "react";

const ContactForm = () => {
  const { toast } = useToast();
  const [firstName, setFirstName] = useState("")
  const [Lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const [Topic, setTopic] = useState("")
  const [additionalinfo, setAdditionalinfo] = useState("")
  const [loading, setLoading] = useState("Submit")



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading("Please wait...")
    const response = await fetch('/api/submit-form-to-admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: Lastname,
        email: email,
        topic: Topic,
        additionalInformation: additionalinfo,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      setLoading("Done!")
    
      toast({
        title: "Form submitted successfully",
        description: "",
        variant: "default",
      });

      setFirstName("")
      setLastname("")
      setTopic("")
      setEmail("")
      setAdditionalinfo("")
      setLoading("Submit")
    } else {
    
      toast({
        title: "!",
        description: data.message,
        variant: "destructive",
      });
    }


  };

  return (
    <div className=" w-full  px-7">
      <h2 className="text-[#685AAD]  text-xl sm:text-2xl custom-2xl:text-5xl font-bold mb-9">
        Please provide your details and describe your issue
      </h2>
      <form className="" onSubmit={handleSubmit}>
        <div className="mb-8 sm:mb-16 grid grid-cols-1 gap-x-16 gap-y-10 max-w-[51rem]  custom-2xl:grid-cols-2">
          {/* First Name in the first column */}
          <input
            type="text"
            placeholder="First Name"
            className="px-5 sm:px-10 py-2 sm:py-5  rounded-xl bg-[#B4A5D7] text-sm sm:text-lg text-white placeholder-white"
            value={firstName}
            onChange={(e)=>{setFirstName(e.target.value)}}
          />
          {/* Last Name in the second column */}
          <input
            type="text"
            placeholder="Last Name"
            className="w-full px-5 sm:px-10 py-2 sm:py-5  rounded-xl bg-[#B4A5D7] text-sm sm:text-lg text-white placeholder-white"
            value={Lastname}
            onChange={(e)=>{setLastname(e.target.value)}}
          />
          {/* Email in the first column */}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-5 sm:px-10 py-2 sm:py-5  rounded-xl bg-[#B4A5D7] text-sm sm:text-lg text-white placeholder-white"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}

          />
          {/* Empty space to maintain 2-column layout */}
          <div className="hidden custom-2xl:block"></div>
          {/* Topic in the first column */}
          <input
            type="text"
            placeholder="Topic"
            className="w-full px-5 sm:px-10 py-2 sm:py-5  rounded-xl bg-[#B4A5D7] text-sm sm:text-lg text-white placeholder-white"
            value={Topic}
            onChange={(e)=>{setTopic(e.target.value)}}
          />
        </div>

        <div>
          <h3 className="text-[#685AAD]  text-xl sm:text-2xl custom-2xl:text-5xl font-bold mb-5 sm:mb-10">
            Additional Information
          </h3>
          <textarea
          value={additionalinfo}
          onChange={(e)=>{setAdditionalinfo(e.target.value)}}
            placeholder="Type here"
            rows={6}
            className="w-full rounded-xl p-3 text-sm sm:p-5 font-medium border-none ring-0 focus:ring-0 focus:ring-transparent text-white bg-[#B4A5D7] placeholder:text-white te"
          ></textarea>
        </div>
        <button
          type="submit"
          
          className="w-fit mt-7 sm:mt-14 float-right bg-[#8558F9] text-white py-2 sm:py-5 px-12 sm:px-24  text-sm custom-xl:text-2xl rounded-xl"
        >
          {loading}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
