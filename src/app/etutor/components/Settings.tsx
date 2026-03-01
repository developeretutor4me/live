import React, { useEffect, useState } from "react";
import Image from "next/image";
import plusicon from "../../../../public/plus circle icon purple.svg";
import editicon from "../../../../public/edit icon.svg";
import alerticon from "../../../../public/alert.svg";
import { useSession } from "next-auth/react";
import { ChevronDown, Edit2, Menu } from "lucide-react";
import Germany from "../../../../public/Flag_of_Germany.svg.webp";
import editiconwhite from "../../../../public/editiconwhite.svg";
import UnitedKingdom from "../../../../public/Flag_of_the_United_Kingdom_(1-2).svg.webp";
import UnitedStates from "../../../../public/america.png";
import France from "../../../../public/Flag-France.webp";
import Italy from "../../../../public/images.png";
import Ireland from "../../../../public/Irish_Flag__86476.jpg";
import Canada from "../../../../public/Flag-Canada.webp";
import Malta from "../../../../public/Flag-Malta.webp";
import Belize from "../../../../public/Belize.jpg";
import Belgium from "../../../../public/Belgium.webp";
import Switzerland from "../../../../public/Switzerland.png";
import Luxembourg from "../../../../public/Luxembourg.jpeg";
import Monaco from "../../../../public/Monaco.png";
import Haiti from "../../../../public/Haiti.png";
import Austria from "../../../../public/Flag_of_Austria.png";
import Liechtenstein from "../../../../public/liechtenstein.webp";
import Jamaica from "../../../../public/Flag_of_Jamaica.png";
import Barbados from "../../../../public/Flag_of_Barbados.svg";
import SaintLucia from "../../../../public/Saint Lucia.png";
import BurkinaFaso from "../../../../public/Flag-of-Burkina-Faso.webp";
import IvoryCoas from "../../../../public/ivory-coast.webp";
import useSWR from "swr";
import { useToast } from "@/hooks/use-toast";

interface CountryCode {
  code: string;
  flag: string;
  name: string;
}
const countryCodes: CountryCode[] = [
  { code: "+49", flag: Germany, name: "Germany" },
  { code: "+44", flag: UnitedKingdom, name: "United Kingdom" },
  { code: "+1", flag: UnitedStates, name: "United States" },
  { code: "+33", flag: France, name: "France" },
  { code: "+39", flag: Italy, name: "Italy" },
  { code: "+353", flag: Ireland, name: "Ireland" },
  { code: "+1", flag: Canada, name: "Canada" },
  { code: "+356", flag: Malta, name: "Malta" },
  { code: "+501", flag: Belize, name: "Belize" },
  { code: "+32", flag: Belgium, name: "Belgium" },
  { code: "+41", flag: Switzerland, name: "Switzerland" },
  { code: "+352", flag: Luxembourg, name: "Luxembourg" },
  { code: "+377", flag: Monaco, name: "Monaco" },
  { code: "+509", flag: Haiti, name: "Haiti" },
  { code: "+43", flag: Austria, name: "Austria" },
  { code: "+423", flag: Liechtenstein, name: "Liechtenstein" },
  { code: "+1 876", flag: Jamaica, name: "Jamaica" },
  { code: "+1 246", flag: Barbados, name: "Barbados" },
  { code: "+1 758", flag: SaintLucia, name: "Saint Lucia" },
  { code: "+226", flag: BurkinaFaso, name: "Burkina Faso" },
  { code: "+225", flag: IvoryCoas, name: "Ivory Coast" },
];

interface UserProfileprops {
  teacher: any
  profilePicture: any
}
const UserProfile = ({ teacher, profilePicture }: UserProfileprops) => {
  const [activeTab, setActiveTab] = useState<
    "personal" | "account" | "Academic"
  >("personal");
  const { toast } = useToast();
  const [subactive, setsubactive] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstNames, setFirstName] = useState("Loading...");
  const [Lastname, setLastname] = useState("Loading...");
  const [Age, setAge] = useState("Loading...");
  const [grade, setGrade] = useState("Loading...");
  const [studentid, Setstudentid] = useState("Loading...");
  const [Institution, setInstitution] = useState("Loading...");
  const [additionalinfo, setAdditionalinfo] = useState("Loading...");
  const [parentData, setParentData] = useState<any>(null);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [userId, setUserId] = useState("");
  const [Phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const { data: session, status } = useSession();
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [imagePreview, setImagePreview] = useState("/assets/heroimg.png");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [completephonenumber, setCompletephonenumber] = useState("");
  const [fetchedPhonenumber, setfetchedPhonenumber] = useState("")

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [pictureuploadloading, setpictureuploadloading] = useState(false)
  const [image, setImage] = useState<File | null>(null); // State to hold the selected image
  const [isUploading, setIsUploading] = useState(false); // State to show the uploading status

  const [uploadedImage, setUploadedImage] = useState<string | null>("");

  // Handle the image selection
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImage(file);
      setError(""); // Reset any previous error
    }
  };

  // Handle image upload
  const handleUpload = async () => {
    setpictureuploadloading(true)
    if (!image) {
      setError("Please select an image first.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const imageBase64 = reader.result as string;

      setIsUploading(true); // Show the uploading status

      try {
        // Call the API to upload the image to S3 and store the URL in the database
        const response = await fetch('/api/upload-profile-picture', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: session?.user.id,
            imageBase64: imageBase64.split(',')[1], // Send only base64 data (not the prefix)
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setImage(null)
          // Successfully uploaded the image, update the profile picture URL
          setUploadedImage(data.profilePictureUrl);
          profilePicture(data.profilePictureUrl)
          setpictureuploadloading(false)
        } else {
          setImage(null)
          setpictureuploadloading(false)
          setError(data.message || 'Failed to upload the image.');
        }
      } catch (error) {
        setImage(null)
        setpictureuploadloading(false)
        console.error("Error uploading profile picture:", error);
        setError("An error occurred while uploading the image.");
      } finally {
        setIsUploading(false); // Hide the uploading status
      }
    };

    reader.readAsDataURL(image); // Convert the image file to base64
  };









  const handleEdit = () => {
    setIsEditing(true);
    setShowDropdown(false);
  };

  async function updatePhoneNumber() {
    try {
      const response = await fetch("/api/update-phone-number", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber: completephonenumber }),
      });

      const result = await response.json();
      if (response.ok) {
        // Success message
      } else {
        console.error(result.message); // Error message
      }
    } catch (error) {
      console.error("Error updating phone number:", error);
    }
  }
  const handleSave = async () => {
    setfetchedPhonenumber(`(${selectedCountry.code}) ${phoneNumber}`)
    await setCompletephonenumber(`(${selectedCountry.code}) ${phoneNumber}`)
    setIsEditing(false);
    setShowDropdown(false);
    updatePhoneNumber();
  };




  const handleCancel = () => {
    setIsEditing(false);
    setShowDropdown(false);
  };

  const fetcher = async (url: string, userId: string) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      console.error("Failed to fetch parent data");
      throw new Error("Failed to fetch parent data");
    }

    const data = await response.json();
    return data.parentData;
  };

  // Use SWR hook
  //@ts-ignore
  const { data: parentDataSWR, err: any } = useSWR(
    session?.user.id
      ? ["/api/parentapis/fetch-parent-data", session.user.id]
      : null,
    ([url, userId]) => fetcher(url, userId),
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      onSuccess: (data) => {

        setParentData(data);
      },
      onError: (err) => {
        console.error("Error fetching parent data:", err);
      },
    }
  );


  // Update all the states when parentDataSWR changes
  useEffect(() => {
    try {
      if (isEditing !== true) {

        setfetchedPhonenumber(teacher?.contactInformation?.phone)

        setEmail(teacher?.user?.email);

        setFirstName(teacher?.contactInformation?.firstName);
        setLastname(teacher?.contactInformation?.lastName);

        setGrade(teacher?.grade);
      }




    } catch (err) {
      console.error(err);
    }
  }, [activeTab]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/update-email", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newEmail, password }),
    });

    const data = await response.json();
    if (response.ok) {

      toast({
        title: "Email updated successfully",
        description: "",
        variant: "default",
      });
      setNewEmail("");
      setPassword("");
    } else {

      toast({
        title: `Error: ${data.message}`,
        description: "",
        variant: "destructive",
      });
    }
  };

  const handleEditClick = () => setIsEditing(true);
  const handleCancelClick = () => {
    setIsEditing(false);
    setPhoneNumber(""); // Reset or keep existing value when canceling
  };
  const handleSaveClick = () => setIsEditing(false);

  const hanldeupdatepassword = async (e: any) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Check if the new password meets the minimum length requirement
    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters long");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    // Check if the new password and confirmation password match
    if (newPassword !== confirmNewPassword) {
      setError("New passwords don't match");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    try {
      const response = await fetch("/api/update-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess(data.message); // Password updated successfully
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      } else {
        setError(data.message); // Error message from the backend
      }
    } catch (error) {
      setError("An error occurred while updating the password");
      console.error(error);
    } finally {
      setTimeout(() => {
        setError("");
        setSuccess("");
      }, 3000);
    }
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  return (
    <div className="custom-xl:max-h-[896px] h-full overflow-hidden rounded-[30px] relative  bg-[#EDE8FA] text-white mt-[66px]">
      <div className="px-5 custom-xl:px-[42px] py-5 custom-xl:py-[46px] flex gap-2 sm:gap-8 custom-xl:gap-[68px]  h-full">
        {/* left side bar */}
        <div
          // className="bg-[#B4A5D7]  max-w-[20rem] custom-xl:max-w-[26.4rem] w-full  rounded-3xl  min-h-screen  px-5 custom-xl:px-10 "
          className={` ${isSidebarOpen ? "-translate-x-96 custom-xl:translate-x-0" : ""
            } bg-[#b4a5d7]  absolute transform transition-all duration-500 z-50 overflow-y-auto scrollbar-none custom-xl:static  max-w-[20rem] custom-xl:max-w-[26.4rem] w-full  rounded-[30px]  min-h-full  px-5 custom-xl:px-9 `}


        >
          <div className="m-auto w-full  flex flex-col items-center  mt-20">
            <div className="rounded-full w-[5rem] h-[5rem] custom-xl:w-[11.4rem] custom-xl:h-[11.4rem]  overflow-hidden flex items-center">

              <img
                src={uploadedImage || teacher?.user?.profilePicture}
                alt="Profile"

                className=" object-cover object-center "
              />
            </div>

            <p className="relative text-sm sm:text-lg custom-xl:text-xl  text-[#534988] font-bold mt-2 cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              Upload photo



            </p>
            {image && (
              <button
                className="w-full sm:w-auto py-1 px-9 mt-6 text-base custom-xl:text-base rounded-sm bg-[#8358F7] hover:bg-[#4a3683] capitalize hover:bg-opacity-90 transition-colors"
                onClick={() => {
                  handleUpload()
                }}
              >
                {pictureuploadloading ? "wait..." : "upload"}

              </button>
            )}


          </div>

          <div className="space-y-4 mt-[137px] ">
            <button
              className={`w-[99%] py-4  px-[38px] text-center rounded-3xl text-sm custom-xl:text-lg custom-xl:text-[30px] custom-xl:leading-[2rem]  font-roboto font-medium transition-all flex  ${activeTab === "personal"
                ? "bg-white text-[#685AAD]"
                : " text-[#685AAD]"
                }`}
              onClick={() => {
                setActiveTab("personal");
                setIsSidebarOpen(true)
                setsubactive("");
              }}
            >
              Personal information
            </button>
            <button
              className={`w-[99%] py-4  px-[38px] rounded-3xl text-sm custom-xl:text-lg custom-xl:text-[30px] custom-xl:leading-[2rem]  font-roboto font-medium transition-all flex ${activeTab === "account"
                ? "bg-white text-[#685AAD]"
                : "text-[#685AAD]"
                }`}
              onClick={() => {
                setActiveTab("account")
                setIsSidebarOpen(true)
              }}
            >
              Account settings
            </button>
            <button
              className={`w-[99%] py-4  px-[38px] rounded-3xl text-sm custom-xl:text-lg custom-xl:text-[30px] custom-xl:leading-[2rem]  font-roboto font-medium transition-all flex ${activeTab === "Academic"
                ? "bg-white text-[#685AAD]"
                : "text-[#685AAD]"
                }`}
              onClick={() => {
                setActiveTab("Academic")
                setIsSidebarOpen(true)
              }}
            >
              Academic records
            </button>
          </div>
        </div>

        {/* right side content */}
        <div className="w-full  relative ">
          <Menu className="text-black  absolute right-0 custom-xl:hidden block" onClick={toggleSidebar} />
          {activeTab === "personal" && (
            <div className="space-y-4 mt-8 sm:mt-12 md:mt-[70px] ">
              <h2 className="text-3xl sm:text-4xl md:text-[67px] font-roboto  text-[#685AAD] font-bold ">
                Personal information
              </h2>
              <div className="grid grid-cols-1 custom-xl:grid-cols-[45.4%_45.4%] gap-6 sm:gap-8 md:gap-[53px] pt-8 sm:pt-12 md:pt-[72px] ">
                <div className="w-full">
                  <label className="block text-lg sm:text-3xl font-medium font-roboto text-[#685AAD]">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="mt-2 sm:mt-4 pl-4 sm:pl-8 md:pl-12 pr-4 py-2 sm:py-3 custom-xl:py-5 block w-full rounded-xl text-white bg-[#B4A5D7] text-lg sm:text-xl md:text-3xl"
                    disabled
                    value={firstNames}
                  />
                </div>
                <div className="w-full">
                  <label className="block text-lg sm:text-3xl font-medium font-roboto text-[#685AAD]">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="mt-2 sm:mt-4 pl-4 sm:pl-8 md:pl-12 pr-4 py-2 sm:py-3 custom-xl:py-5 block w-full rounded-xl text-white bg-[#B4A5D7] text-lg sm:text-xl md:text-3xl"
                    disabled
                    value={Lastname}
                  />
                </div>
                <div className="w-full">
                  <label className="block text-lg sm:text-3xl font-medium font-roboto text-[#685AAD]">
                    Country
                  </label>
                  <input
                    type="text"
                    className="mt-2 sm:mt-4 pl-4 sm:pl-8 md:pl-12 pr-4 py-2 sm:py-3 custom-xl:py-5 block w-full rounded-xl text-white bg-[#B4A5D7] text-lg sm:text-xl md:text-3xl"
                    disabled
                    value={teacher?.contactInformation?.country || "Not Available"}
                  />
                </div>
                <div className="w-full">
                  <label className="block text-lg sm:text-3xl font-medium font-roboto text-[#685AAD]">
                    State / City
                  </label>
                  <input
                    type="text"
                    className="mt-2 sm:mt-4 pl-4 sm:pl-8 md:pl-12 pr-4 py-2 sm:py-3 custom-xl:py-5 block w-full rounded-xl text-white bg-[#B4A5D7] text-lg sm:text-xl md:text-3xl"
                    disabled
                    value={teacher?.contactInformation.city || "Not Available"}
                  />
                </div>
                <div className="w-full custom-xl:col-span-2 ">
                  <label className="block text-lg sm:text-3xl font-medium font-roboto text-[#685AAD]">
                    Street Name
                  </label>
                  <input
                    type="text"
                    className="mt-2 sm:mt-4 pl-4 sm:pl-8 md:pl-12 pr-4 py-2 sm:py-3 custom-xl:py-5 block w-full custom-xl:w-[47%] rounded-xl text-white bg-[#B4A5D7] text-lg sm:text-xl md:text-3xl"
                    disabled
                    value={teacher?.contactInformation?.streetname || "Not Available"}
                  />
                </div>
              </div>
            </div>
          )}
          {activeTab === "account" && subactive === "" && (
            <div className="space-y-4 mt-8">
              <div className="flex flex-col gap-5">
                <div className=" custom-xl:max-w-[54%] w-full mb-2.5">
                  <div className="max-w-xl ">
                    <div className="flex justify-between items-center  mb-2.5">
                      <label className="block text-lg sm:text-[27.08px] sm:leading-[2.25rem] font-medium font-roboto text-[#685AAD] ">
                        Phone Number
                      </label>
                      {!isEditing ? (
                        <Image loading="lazy"
                          src={editicon}
                          alt=""
                          className="w-10 cursor-pointer"
                          onClick={handleEdit}
                        />
                      ) : (
                        <div className="flex justify-end space-x-3">
                          <button
                            onClick={handleCancel}
                            className="  text-sm text-[#8653FF] px-4 py-1 rounded-lg"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleSave}
                            className=" text-white text-sm bg-[#8653FF] px-4 py-1 rounded-lg"
                          >
                            Save
                          </button>
                        </div>
                      )}
                    </div>

                    {!isEditing ? (
                      <div className="bg-purple-100 rounded-xl py-5 px-10  text-white bg-[#B4A5D7]">
                        <p className="text-[#F0EDF7] bg-[#B4A5D7] text-[24.37px] leading-[1.75rem] truncate">
                          {fetchedPhonenumber}
                        </p>
                      </div>
                    ) : (
                      <div className=" text-[#F0EDF7]  bg-[#B4A5D7] rounded-xl">
                        <div className="relative">
                          <div className="bg-purple-100 rounded-xl py-[18px] px-10 flex items-center ">
                            <button
                              onClick={() => setShowDropdown(!showDropdown)}
                              className="flex items-center  pr-3 min-w-fit"
                            >
                              <div className="flex items-center gap-4  ">
                                <span className="">
                                  <Image loading="lazy"
                                    src={selectedCountry.flag}
                                    alt=""
                                    className="w-8 h-8 rounded-full"
                                  />
                                </span>
                                <span className="text-white text-xl">
                                  {selectedCountry.code}
                                </span>
                              </div>

                              <ChevronDown className="ml-5 w-5 h-5 text-white font-bold" />
                            </button>
                            <input
                              type="tel"
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              className="bg-transparent ml-6 w-full outline-none text-[#F0EDF7] bg-[#B4A5D7] text-[24.37px] leading-[1.75rem] placeholder-[#F0EDF7]  font-roboto truncate"
                              placeholder="Phone number"
                            />
                          </div>

                          {showDropdown && (
                            <div className="absolute top-full left-0 mt-2 w-44 bg-[#B4A5D7] text-white rounded-3xl shadow-lg py-2  max-h-[12.5rem] px-3 overflow-y-auto scrollbar-none">
                              {countryCodes.map((country) => (
                                <button
                                  key={country.code}
                                  onClick={() => {
                                    setSelectedCountry(country);
                                    setShowDropdown(false);
                                  }}
                                  className="flex items-center space-x-3 w-full p-3 hover:bg-purple-50 transition-colors border-b border-[#0000004b] last:border-b-0  "
                                >
                                  <span className="rounded-full relative  flex items-center justify-center">
                                    <Image loading="lazy"
                                      src={country.flag}
                                      alt=""
                                      className="w-6 h-6 rounded-full"
                                    />
                                  </span>
                                  <span className="text-white">
                                    {country.code}
                                  </span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="custom-xl:max-w-[54%] w-full">
                  <div className="flex justify-between items-center ">
                    <label className="block text-lg sm:text-[27.08px] sm:leading-[2.25rem] font-medium font-roboto text-[#685AAD] ">
                      Email Address
                    </label>
                    <Image loading="lazy"
                      src={editicon}
                      alt=""
                      className="w-10 cursor-pointer"
                      onClick={() => setsubactive("email")}
                    />
                  </div>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="text"
                      className="mt-2 sm:mt-2 pl-4 sm:pl-8 md:pl-12 pr-4 py-2 sm:py-3 custom-xl:py-5 block w-full rounded-xl bg-[#B4A5D7] text-[#F0EDF7]    leading-[1.75rem] text-lg sm:text-xl md:text-[24.37px]  "
                      value={email}
                    />
                  </div>
                </div>

                <div className="w-[90%] border-t border-[#685aad89] mt-11 mb-6 mx-auto"></div>
              </div>

              <div className="grid grid-cols-1 custom-xl:grid-cols-[45.8%_45.8%] gap-8">
                <div>
                  <label className="block text-lg sm:text-[27.08px] sm:leading-[2.25rem] font-medium font-roboto text-[#685AAD] ">
                    Old password
                  </label>
                  <input
                    type="password"
                    className="mt-4  placeholder-[#F0EDF7]  sm:mt-4 pl-4 sm:pl-8 md:pl-12 pr-4 py-2 sm:py-3 custom-xl:py-5 block w-full rounded-xl  bg-[#B4A5D7] text-lg sm:text-xl text-[#F0EDF7]  md:text-[24.37px]   leading-[1.75rem]"
                    placeholder="old password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center ">
                  {success && <p className="text-green-500">{success}</p>}
                  {error && (
                    <div className="flex items-center gap-3 text-xs text-[#FF9580]">
                      <Image loading="lazy" src={alerticon} alt="" className="h-7 w-7" />
                      {error && <p className="">{error} </p>}
                      {/* <p>The password you entered is incorrect. Please enter the correct password, or click here to receive an email to reset it </p> */}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-lg sm:text-[27.08px] sm:leading-[2.25rem] font-medium font-roboto text-[#685AAD] ">
                    New password
                  </label>
                  <input
                    type="password"
                    className="mt-4 placeholder-[#F0EDF7]  sm:mt-4 pl-4 sm:pl-8 md:pl-12 pr-4 py-2 sm:py-3 custom-xl:py-5 block w-full rounded-xl  bg-[#B4A5D7] text-lg sm:text-xl text-[#F0EDF7]  md:text-[24.37px]   leading-[1.75rem]"
                    placeholder="new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-lg sm:text-[27.08px] sm:leading-[2.25rem] font-medium font-roboto text-[#685AAD] ">
                    Repeat new password
                  </label>
                  <input
                    type="password"
                    className="mt-4 placeholder-[#F0EDF7]   sm:mt-4 pl-4 sm:pl-8 md:pl-12 pr-4 py-2 sm:py-3 custom-xl:py-5 block w-full rounded-xl  bg-[#B4A5D7] text-lg sm:text-xl text-[#F0EDF7]  md:text-[24.37px]   leading-[1.75rem]"
                    placeholder="repeat password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-7 ">
                <button onClick={() => {
                  setCurrentPassword("");
                  setNewPassword("");
                  setConfirmNewPassword("");
                }} className={` ${currentPassword != "" && newPassword != "" && confirmNewPassword != "" ? " bg-[#FC7777]" : "bg-[#f0d1e0]"} rounded-lg text-sm sm:text-lg custom-xl:text-2xl font-medium  px-3 sm:px-5 custom-xl:px-10  py-1 sm:py-2 custom-xl:py-3`}>
                  cancel
                </button>
                <button
                  disabled={(currentPassword === "" && newPassword === "" && confirmNewPassword === "")}
                  onClick={hanldeupdatepassword}
                  className={` ${currentPassword != "" && newPassword != "" && confirmNewPassword != "" ? " bg-[#8653FF]" : "bg-[#D8CAFB]"}  rounded-lg text-sm sm:text-lg custom-xl:text-2xl font-medium  px-3 sm:px-5 custom-xl:px-10  py-1 sm:py-2 custom-xl:py-3`}
                >
                  save changes
                </button>
              </div>
            </div>
          )}
          {subactive === "email" && (
            <div className="mt-40 flex flex-col gap-12 items-center ">
              <div className=" w-full custom-xl:w-[90%]">
                <label className="text-lg sm:text-[34px] sm:leading-[2rem] font-semibold   text-[#685AAD] ">
                  New Email Address{" "}
                </label>
                <input
                  type="email"
                  className="mt-4  placeholder-[#F0EDF7]   sm:mt-4 pl-4 sm:pl-8 md:pl-12 pr-4 py-2 sm:py-3 custom-xl:py-5 block w-full rounded-xl  text-[#F0EDF7]  bg-[#B4A5D7] text-lg sm:text-xl md:text-[27px] leading-[1.75rem]"
                  placeholder="enter new email address"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  required
                />
              </div>
              <div className="w-full custom-xl:w-[90%]">
                <label className="text-lg sm:text-[34px] sm:leading-[2rem] font-semibold   text-[#685AAD] ">
                  Current Password{" "}
                </label>
                <input
                  type="password"
                  className="mt-4  placeholder-[#F0EDF7]   sm:mt-4 pl-4 sm:pl-8 md:pl-12 pr-4 py-2 sm:py-3 custom-xl:py-5 block w-full rounded-xl  text-[#F0EDF7]  bg-[#B4A5D7] text-lg sm:text-xl md:text-[27px] leading-[1.75rem]"
                  placeholder="enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end space-x-3 pt-7 ">
                <button
                  onClick={() => setsubactive("")}
                  className=" bg-[#FC7777] rounded-lg text-sm sm:text-lg custom-xl:text-[32.08px] custom-xl:leading-[2rem] font-medium  px-3 sm:px-5 custom-xl:px-10  py-1 sm:py-2 custom-xl:py-4"
                >
                  cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-[#8653FF]  rounded-lg text-sm sm:text-lg custom-xl:text-[32.08px] custom-xl:leading-[2rem] font-medium  px-3 sm:px-5 custom-xl:px-10  py-1 sm:py-2 custom-xl:py-4"
                >
                  save changes
                </button>
              </div>
            </div>
          )}

          {activeTab === "Academic" && (
            <div className="space-y-4 mt-8 sm:mt-12 md:mt-16 relative ">
              <h2 className="text-3xl sm:text-4xl md:text-[67px] font-roboto  text-[#685AAD] font-bold ">
                Academic records
              </h2>
              <div className=" grid grid-cols-1 custom-xl:grid-cols-[45.4%_45.4%] gap-6 sm:gap-8 md:gap-12 pt-8 sm:pt-12 md:pt-20 ">
                <div className="w-full">
                  <label className="block text-lg sm:text-3xl font-medium font-roboto text-[#685AAD]">
                    Highest Degree
                  </label>
                  <input
                    type="text"
                    className="mt-2 sm:mt-4 pl-4 sm:pl-8 md:pl-12 pr-4 py-2 sm:py-3 custom-xl:py-5 block w-full rounded-xl text-white bg-[#B4A5D7] text-lg sm:text-xl md:text-3xl"
                    disabled
                    value={teacher?.education?.highestDegree || "Not Available"}
                  />
                </div>

                <div className="w-full">
                  <label className="block text-lg sm:text-3xl font-medium font-roboto text-[#685AAD]">
                    International Experience
                  </label>
                  <input
                    type="text"
                    className="mt-2 sm:mt-4 pl-4 sm:pl-8 md:pl-12 pr-4 py-2 sm:py-3 custom-xl:py-5 block w-full rounded-xl text-white bg-[#B4A5D7] text-lg sm:text-xl md:text-3xl"
                    disabled
                    value={teacher?.experience?.internationalExperience || "Not Available"}
                  />
                </div>

                <div className="w-full">
                  <label className="block text-lg sm:text-3xl font-medium font-roboto text-[#685AAD]">
                    Graduation School
                  </label>
                  <input
                    type="text"
                    className="mt-2 sm:mt-4 pl-4 sm:pl-8 md:pl-12 pr-4 py-2 sm:py-3 custom-xl:py-5 block w-full rounded-xl text-white bg-[#B4A5D7] text-lg sm:text-xl md:text-3xl"
                    disabled
                    value={teacher?.education?.graduationSchool || "Not Available"}
                  />
                </div>

                <div className="w-full hidden custom-xl:block">
                  <label className="block text-lg sm:text-xl font-semibold text-transparent">
                    State / City
                  </label>
                  <input
                    type="text"
                    className="mt-2 sm:mt-4 pl-4 sm:pl-8 md:pl-12 pr-4 py-2 sm:py-3 custom-xl:py-5 block w-full rounded-xl text-white bg-[#B4A5D7] text-lg sm:text-xl md:text-3xl"
                    disabled
                    value={"Not Available"}
                  />
                </div>

                <div className="w-full custom-xl:col-span-2 ">
                  <label className="block text-lg sm:text-3xl font-medium font-roboto text-[#685AAD]">
                    Language Skills
                  </label>
                  <input
                    type="text"
                    className="mt-2 sm:mt-4 pl-4 sm:pl-8 md:pl-12 pr-4 py-2 sm:py-3 custom-xl:py-5 block w-full custom-xl:w-[47%] rounded-xl text-white bg-[#B4A5D7] text-lg sm:text-xl md:text-2xl"
                    disabled
                    value={teacher?.experience?.languages || "Not Available"}
                  />
                </div>
              </div>
            </div>
          )}
          {activeTab === "Academic" && (
            <button className="bg-[#FC7777] float-right custom-xl:absolute bottom-0 right-0 px-8 py-2 rounded-lg mt-12">
              <Image loading="lazy" src={editiconwhite} alt="" className="w-16" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
