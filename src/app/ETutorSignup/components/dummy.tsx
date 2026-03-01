// import React from 'react';

// const ReviewAndSubmit = () => {
//   return (
//     <div className="bg-questionbg px-4 py-6 sm:px-8 sm:py-8 md:px-12  md:py-10 custom-lg:px-16 custom-lg:py-12 custom-xl:px-[64px] custom-xl:py-16 rounded-3xl custom-xl:rounded-[50px] mt-1">
//       <FormHeading
//         className=""
//         heading="Review Appllication"
//         paragraph="Please review each section of your application to insure your information is correct. once you're ready click &lsquo;&rsquo;submit&rsquo;&rsquo; to finalize this portion of the application process "
//       />
//       {/* <ReviewContactInfo /> */}
//       <div className="bg-[#e6ddff]  px-5 custom-xl:px-8 rounded-[30px] mt-12 custom-xl:mt-[70px]">
//         <ReviewFormHead
//           heading="Contact Information"
//           EditActive={EditActive}
//           handleEditToggle={handleEditToggle}
//         />

//         <div className="grid grid-cols-1 custom-2xl:grid-cols-2 gap-3 custom-xl:gap-[4.4rem] py-5 custom-xl:py-12 custom-xl:pl-5">
//           <div>
//             <EnteredInfo
//               EditActive={EditActive}
//               name="Selected Country"
//               // @ts-ignore
//               info={
//                 EditActive ? (
//                   <div className="relative  custom-2xl:max-w-[36rem] flex justify-center items-center">
//                     <div
//                       className="flex justify-between items-center w-full cursor-pointer px-12 py-4 bg-purpleBtn rounded-full text-darkBlue text-2xl mb:text-sm"
//                       onClick={toggleDropdown}
//                     >
//                       <button
//                         className={`bg-purpleBtn focus:outline-none  ${
//                           country ? 'text-darkpurple' : 'text-[#AD9DDE]'
//                         }`}
//                       >
//                         {country ? country : 'Select a country'} {/* Show selected country */}
//                       </button>
//                       {isDropdownOpen ? (
//                         <Image loading="lazy" src={uparrow} alt="dropdown" />
//                       ) : (
//                         <Image loading="lazy" src={dropdown} alt="uparrow" />
//                       )}
//                     </div>

//                     {isDropdownOpen && (
//                       <div
//                         onMouseLeave={() => {
//                           setIsDropdownOpen(false);
//                         }}
//                         className="absolute z-10 w-11/12 mt-20 m-auto top-0 rounded-3xl shadow-lg bg-[#DBCAFF] py-4 px-10 "
//                       >
//                         <div id="style-2" className=" max-h-[20rem] overflow-y-auto">
//                           {countries.map(subject => (
//                             <div
//                               key={subject}
//                               className="flex items-center p-2 text-darkBlue border-b px-5 py-2 text-2xl border-darkBlue cursor-pointer mb:text-sm placeholder-darkpurple max-w-[80%] "
//                               onClick={() => handleCountrySelect(subject)} // Handle country selection
//                             >
//                               <span>{subject}</span>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                     <style jsx>{`
//                       #style-2::-webkit-scrollbar-track {
//                         border-radius: 10px;
//                         background-color: #c9bbef;
//                       }

//                       #style-2::-webkit-scrollbar {
//                         width: 5px;
//                         background-color: transparent;
//                       }

//                       #style-2::-webkit-scrollbar-thumb {
//                         border-radius: 10px;

//                         background-color: #8f81c7;
//                       }
//                     `}</style>
//                   </div>
//                 ) : (
//                   country
//                 )
//               }
//               info2={''}
//               info3={''}
//               info4={''}
//               span={''}
//             />
//           </div>
//           <EnteredInfo
//             EditActive={EditActive}
//             name="ZIP Code"
//             // @ts-ignore
//             info={
//               EditActive ? (
//                 <div className="rounded-full bg-purpleBtn px-10 py-4 ">
//                   <input
//                     type="text"
//                     className="placeholder-darkpurple text-2xl text-[#685AAD]  placeholder:text-[#AD9DDE] w-full bg-transparent outline-none mb:text-xs"
//                     placeholder="Zip Code"
//                     value={Zip}
//                     onChange={e => {
//                       setZip(e.target.value);
//                     }}
//                   />
//                 </div>
//               ) : (
//                 Zip
//               )
//             }
//             info2={''}
//             info3={''}
//             info4={''}
//             span={''}
//           />
//           <EnteredInfo
//             EditActive={EditActive}
//             name="First Name"
//             // @ts-ignore
//             info={
//               EditActive ? (
//                 <div className="rounded-full bg-purpleBtn px-10 py-4 ">
//                   <input
//                     type="text"
//                     className="placeholder-darkpurple text-2xl text-[#685AAD]  placeholder:text-[#AD9DDE] w-full bg-transparent outline-none mb:text-xs"
//                     placeholder="First Name"
//                     value={firstname}
//                     onChange={e => {
//                       setFirstname(e.target.value);
//                     }}
//                   />
//                 </div>
//               ) : (
//                 firstname
//               )
//             }
//             info2={''}
//             info3={''}
//             info4={''}
//             span={''}
//           />

//           <EnteredInfo
//             EditActive={EditActive}
//             name="Email"
//             // @ts-ignore
//             info={
//               EditActive ? (
//                 <div className="rounded-full bg-purpleBtn px-10 py-4 ">
//                   <input
//                     type="email"
//                     required
//                     className="placeholder-darkpurple text-2xl text-[#685AAD]  placeholder:text-[#AD9DDE] w-full bg-transparent outline-none mb:text-xs"
//                     placeholder="Email"
//                     value={email}
//                     onChange={e => {
//                       setemail(e.target.value);
//                     }}
//                   />
//                 </div>
//               ) : (
//                 email
//               )
//             }
//             info2={''}
//             info3={''}
//             info4={''}
//             span={''}
//           />
//           <EnteredInfo
//             EditActive={EditActive}
//             name="Last Name"
//             // @ts-ignore
//             info={
//               EditActive ? (
//                 <div className="rounded-full bg-purpleBtn px-10 py-4 ">
//                   <input
//                     type="text"
//                     className="placeholder-darkpurple  text-2xl text-[#685AAD]  w-full bg-transparent outline-none mb:text-xs"
//                     placeholder="Last Name"
//                     value={lastname}
//                     onChange={e => {
//                       setLastname(e.target.value);
//                     }}
//                   />
//                 </div>
//               ) : (
//                 lastname
//               )
//             }
//             info2={''}
//             info3={''}
//             info4={''}
//             span={''}
//           />
//           <EnteredInfo
//             EditActive={EditActive}
//             name="Phone Number"
//             // @ts-ignore
//             info={
//               EditActive ? (
//                 <div className="rounded-full bg-purpleBtn px-10 py-4 ">
//                   <input
//                     type="text"
//                     className="placeholder-darkpurple  text-2xl text-[#685AAD]  w-full bg-transparent outline-none mb:text-xs"
//                     placeholder="phone"
//                     value={phone}
//                     onChange={e => {
//                       setphone(e.target.value);
//                     }}
//                   />
//                 </div>
//               ) : (
//                 phone
//               )
//             }
//             info2={''}
//             info3={''}
//             info4={''}
//             span={''}
//           />
//         </div>
//       </div>

//       {/* Review education info */}
//       {/* <ReviewEducation /> */}
//       <div className="bg-[#e6ddff]  px-5 custom-xl:px-10  rounded-[30px] mt-5 custom-xl:mt-16">
//         <ReviewFormHead
//           heading="Education"
//           EditActive={EditActiveEducation}
//           handleEditToggle={handleEditEduoggle}
//         />

//         <div className="grid grid-cols-1 custom-2xl:grid-cols-2 gap-3 custom-xl:gap-[4.4rem] py-5 custom-xl:py-12 custom-xl:pl-5">
//           <EnteredInfo
//             EditActive={EditActive}
//             name="University/college"
//             // @ts-ignore
//             info={
//               EditActiveEducation ? (
//                 <div className="rounded-full bg-purpleBtn py-4 custom-xl:py-5 px-5 custom-xl:px-10  ">
//                   <input
//                     type="text"
//                     className="placeholder-darkpurple text-2xl text-[#685AAD]   w-full bg-transparent outline-none mb:text-xs placeholder:text-[#AD9DDE]"
//                     placeholder="Search for your school"
//                     value={universityCollage}
//                     onChange={e => {
//                       setUniversityCollage(e.target.value);
//                     }}
//                   />
//                 </div>
//               ) : (
//                 universityCollage
//               )
//             }
//             info2={''}
//             info3={''}
//             info4={''}
//             span={''}
//           />
//           <EnteredInfo
//             EditActive={EditActive}
//             name="Major"
//             // @ts-ignore
//             info={
//               EditActiveEducation ? (
//                 <div className="relative w-full flex justify-center items-center">
//                   <div
//                     className="flex justify-between items-center w-full cursor-pointer px-12 py-4 bg-purpleBtn rounded-full text-[#AD9DDE] text-2xl mb:text-sm"
//                     onClick={toggleDropdownedumajoredu}
//                   >
//                     <button
//                       className={`bg-purpleBtn focus:outline-none  ${
//                         selectedmajoredu ? 'text-darkpurple' : 'text-[#AD9DDE]'
//                       }`}
//                     >
//                       {selectedmajoredu ? selectedmajoredu : 'Select'}{' '}
//                       {/* Show selected majoredu */}
//                     </button>
//                     {majoredu ? (
//                       <Image loading="lazy" src={uparrow} alt="dropdown" />
//                     ) : (
//                       <Image loading="lazy" src={dropdown} alt="uparrow" />
//                     )}
//                   </div>

//                   {majoredu && (
//                     <div className="absolute z-10 w-11/12 mt-20 m-auto top-0 rounded-3xl shadow-lg bg-purpleBtn  px-8 py-6 ">
//                       <div
//                         id="style-2"
//                         className=" px-2 max-h-[15rem] overflow-y-auto overflow-x-hidden"
//                       >
//                         {subjects.map(subject => (
//                           <div
//                             key={subject}
//                             className="flex items-center p-2 text-darkBlue border-b px-5 py-2 max-w-[80%] truncate text-2xl border-darkBlue cursor-pointer mb:text-sm placeholder-darkpurple"
//                             onClick={() => handlemajoreduSelect(subject)} // Set majoredu and close dropdown
//                           >
//                             <span>{subject}</span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 selectedmajoredu
//               )
//             }
//             info2={''}
//             info3={''}
//             info4={''}
//             span={''}
//           />
//           <EnteredInfo
//             EditActive={EditActive}
//             name="Degree"
//             // @ts-ignore
//             info={
//               EditActiveEducation ? (
//                 <div className="relative w-full flex justify-center items-center">
//                   <div
//                     className="flex justify-between items-center w-full cursor-pointer px-12 py-4 bg-purpleBtn rounded-full text-darkBlue text-2xl mb:text-sm"
//                     onClick={toggleDropdownedu}
//                   >
//                     <button
//                       className={`bg-purpleBtn focus:outline-none truncate  ${
//                         selectedDegree ? 'text-darkpurple' : 'text-[#AD9DDE]'
//                       }`}
//                     >
//                       {selectedDegree ? selectedDegree : 'Select a degree'}
//                       {/* Display selected degree */}
//                     </button>
//                     {degree ? (
//                       <Image loading="lazy" src={uparrow} alt="dropdown" />
//                     ) : (
//                       <Image loading="lazy" src={dropdown} alt="uparrow" />
//                     )}
//                   </div>

//                   {degree && (
//                     <div
//                       onMouseLeave={() => {
//                         setDegree(false);
//                       }}
//                       className="absolute z-10 w-11/12 mt-20 m-auto top-0 rounded-3xl shadow-lg bg-[#DBCAFF] py-4 px-10"
//                     >
//                       <div id="style-2" className=" max-h-[20rem] overflow-y-auto">
//                         {degrees.map(subject => (
//                           <div
//                             key={subject}
//                             className="flex items-center p-2 text-darkBlue border-b  py-2 text-2xl max-w-[80%] border-darkBlue cursor-pointer mb:text-sm placeholder-darkpurple"
//                             onClick={() => handleDegreeSelect(subject)} // Set degree and close dropdown
//                           >
//                             <span>{subject}</span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 selectedDegree
//               )
//             }
//             info2={''}
//             info3={''}
//             info4={''}
//             span={''}
//           />
//           <EnteredInfo
//             EditActive={EditActive}
//             name="Graduation Year "
//             span="(or expected)"
//             // @ts-ignore
//             info={
//               EditActiveEducation ? (
//                 <div className="relative w-full flex justify-center items-center">
//                   <div
//                     className="flex justify-between items-center w-full cursor-pointer px-12 py-4 bg-purpleBtn rounded-full text-darkBlue text-2xl mb:text-sm"
//                     onClick={toggleDropdownedugraduationyear}
//                   >
//                     <button
//                       className={`bg-purpleBtn focus:outline-none  ${
//                         selectedYearedu ? 'text-darkpurple' : 'text-[#AD9DDE]'
//                       }`}
//                     >
//                       {selectedYearedu ? selectedYearedu : 'Select a graduation year'}{' '}
//                       {/* Display selected year */}
//                     </button>
//                     {isDropdownOpenedu ? (
//                       <Image loading="lazy" src={uparrow} alt="dropdown" />
//                     ) : (
//                       <Image loading="lazy" src={dropdown} alt="uparrow" />
//                     )}
//                   </div>

//                   {isDropdownOpenedu && (
//                     <div className="absolute z-10 w-11/12 mt-20 m-auto top-0 rounded-3xl shadow-lg bg-[#DBCAFF] py-4 px-10">
//                       <div id="style-2" className=" max-h-[20rem] overflow-y-auto">
//                         {graduationYears.map(year => (
//                           <div
//                             key={year}
//                             className="flex items-center p-2 text-darkBlue border-b  py-2 text-2xl max-w-[80%] border-darkBlue cursor-pointer mb:text-sm placeholder-darkpurple"
//                             onClick={() => handleYearSelect(year)} // Set selected year and close dropdown
//                           >
//                             <span>{year}</span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 selectedYearedu
//               )
//             }
//             info2={''}
//             info3={''}
//             info4={''}
//           />
//         </div>
//       </div>

//       {/* review exprerience */}
//       <div className="bg-[#e6ddff] px-5 custom-xl:px-10 rounded-[30px] mt-5 custom-xl:mt-16">
//         <ReviewFormHead
//           heading="Education"
//           EditActive={EditActiveTutoringExp}
//           handleEditToggle={handleEditTutoringexpoggle}
//         />

//         <div className="grid grid-cols-1 gap-6 custom-xl:gap-[4.4rem] py-5 custom-xl:py-12 custom-xl:pl-5">
//           <EnteredInfo
//             EditActive={EditActive}
//             name="Do you have tutoring experience?*"
//             // @ts-ignore
//             info={
//               EditActiveTutoringExp ? (
//                 <div>
//                   <RadioInput
//                     id="experienceYes"
//                     name="tutoringExperience"
//                     value="yes"
//                     checked={hasTutoringExperience === 'yes'}
//                     onChange={() => handleRadioChange('yes')}
//                     label="Yes"
//                   />
//                   <RadioInput
//                     id="experienceNo"
//                     name="tutoringExperience"
//                     value="no"
//                     checked={hasTutoringExperience === 'no'}
//                     onChange={() => handleRadioChange('no')}
//                     label="No"
//                   />
//                 </div>
//               ) : (
//                 hasTutoringExperience
//               )
//             }
//             info2={''}
//             info3={''}
//             info4={''}
//             span={''}
//           />
//           <EnteredInfo
//             EditActive={EditActive}
//             name="What level(s) are you interested in tutoring?"
//             // @ts-ignore
//             info={
//               EditActiveTutoringExp ? (
//                 <>
//                   {levels.map(level => {
//                     const clicked = selectedLevelsexp.includes(level); // Check if selected

//                     return (
//                       <div key={level} className="flex items-center py-3 custom-xl:py-6 relative">
//                         <div className="relative flex items-center justify-center w-7 h-7">
//                           <input
//                             type="checkbox"
//                             id={`checkbox-${level}`} // Unique ID for each checkbox
//                             checked={clicked}
//                             onChange={() => handleCheckboxChange(level)}
//                             className="absolute w-6  h-6  custom-xl:w-7  custom-xl:h-7 opacity-0 cursor-pointer hover:!bg-darkBlue "
//                           />
//                           <div
//                             className={`w-6 h-6  custom-xl:w-[26.5px]  custom-xl:h-[26.5px]  border-2 custom-xl:border-[3px] border-[#685AAD] rounded-sm flex items-center justify-center ${
//                               clicked ? 'bg-[#685AAD]' : 'bg-transparent'
//                             }`}
//                           >
//                             {clicked && (
//                               // eslint-disable-next-line react/jsx-no-undef
//                               <Check className="w-10 h-10 text-white" />
//                             )}
//                           </div>
//                         </div>
//                         <label
//                           className="text-darkBlue  text-xl custom-xl:text-2xl pl-3 custom-xl:pl-6"
//                           htmlFor={`checkbox-${level}`}
//                         >
//                           {level}
//                         </label>
//                       </div>
//                     );
//                   })}
//                 </>
//               ) : (
//                 selectedLevelsexp.map(lang => lang.toUpperCase()).join(', ')
//               )
//             }
//             info2=""
//             info3={''}
//             info4={''}
//             span={''}
//           />
//           <EnteredInfo
//             EditActive={EditActive}
//             name="What subject(s) can you tutor in?"
//             // @ts-ignore
//             info={
//               EditActiveTutoringExp ? (
//                 <div className="w-full  mx-auto mt-2 custom-xl:mt-3 mb-3">
//                   <div className="relative  select-none max-w-[28rem]">
//                     <div
//                       className="w-full bg-[#DBCAFF] text-[#ad9dde]  text-sm  custom-2xl:text-[22px] pr-7 sm:pr-8 pl-10 sm:pl-10 py-2 custom-2xl:py-[17px] rounded-full cursor-pointer flex justify-between items-center"
//                       onClick={toggleSubjectDropdown}
//                     >
//                       <span>
//                         {tutoredIN.length > 0 ? `${tutoredIN.length} selected` : 'select a subject'}
//                       </span>
//                       {isSubjectDropdownOpen ? (
//                         <ChevronUp size={30} className="text-[#a394d6] " />
//                       ) : (
//                         <ChevronDown size={30} className="text-[#a394d6] " />
//                       )}
//                     </div>

//                     {isSubjectDropdownOpen && (
//                       <div
//                         onMouseLeave={() => {
//                           setIsSubjectDropdownOpen(false);
//                         }}
//                         className="absolute top-full left-0 right-0 px-8 mt-2 bg-[#DBCAFF] rounded-3xl overflow-hidden z-10 w-[92%] mx-auto py-4 custom-2xl:py-7 "
//                       >
//                         <div id="style-2" className="max-h-[16.4rem] overflow-y-scroll  ">
//                           {subjectOptions.map(subject => (
//                             <div
//                               key={subject.value}
//                               className="  custom-xl:py-2 cursor-pointer flex !items-center"
//                               onClick={() => handleSubjectClick(subject.value)}
//                             >
//                               <div className=" border-b-2 border-[#a394d682] py-2 custom-xl:py-3 flex items-center  gap-4  w-full px-0 custom-xl:px-4 max-w-[90%] truncate">
//                                 <div className="relative">
//                                   <input
//                                     type="checkbox"
//                                     checked={tutoredIN.includes(
//                                       // @ts-ignore
//                                       subject.value
//                                     )}
//                                     onChange={() => {}}
//                                     className="absolute opacity-0 cursor-pointer"
//                                   />
//                                   <div
//                                     className={`h-4 custom-xl:h-7 w-4 custom-xl:w-7  border custom-xl:border-2 border-[#6C5BAA] hover:bg-[#a394d6] hover:border-[#a394d6] rounded-sm custom-xl:rounded-md flex items-center justify-center
//          ${
//            tutoredIN.includes(
//              // @ts-ignore
//              subject.value
//            )
//              ? 'bg-[#6c5baa]'
//              : ''
//          }`}
//                                   >
//                                     {tutoredIN.includes(
//                                       // @ts-ignore
//                                       subject.value
//                                     ) && <Check className="text-white" />}
//                                   </div>
//                                 </div>
//                                 <span className="ml-1 sm:ml-2 text-base sm:text-lg custom-xl:text-2xl text-[#6C5BAA] truncate ">
//                                   {subject.label}
//                                 </span>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                   {tutoredIN.length > 0 && (
//                     <div className="flex flex-wrap items-start justify-start gap-2 mt-3 sm:mt-5 custom-xl:mt-8   px-2 custom-xl:px-6 mx-auto min-h-[3.4rem]">
//                       {tutoredIN.map(subject => (
//                         <span
//                           key={subject}
//                           className="bg-[#6C5BAA] text-white text-xs custom-xl:text-xl leading-none px-5 py-1.5 custom-2xl:py-1.5 rounded-full flex items-center  gap-7  justify-between"
//                         >
//                           {subject}

//                           <X
//                             className="ml-7 h-4 custom-2xl:h-5 w-4 custom-2xl:w-5 cursor-pointer"
//                             onClick={() => removeSubject(subject)}
//                           />
//                         </span>
//                       ))}
//                     </div>
//                   )}
//                   <style jsx>{`
//                     #style-2::-webkit-scrollbar-track {
//                       border-radius: 10px;
//                       background-color: #c9bbef;
//                     }

//                     #style-2::-webkit-scrollbar {
//                       width: 5px;
//                       background-color: transparent;
//                     }

//                     #style-2::-webkit-scrollbar-thumb {
//                       border-radius: 10px;

//                       background-color: #8f81c7;
//                     }
//                   `}</style>
//                 </div>
//               ) : (
//                 // @ts-ignore
//                 tutoredIN.map(lang => lang.toUpperCase()).join(', ')
//               )
//             }
//             info2={''}
//             info3={''}
//             info4={''}
//             span={''}
//           />
//           <EnteredInfo
//             EditActive={EditActive}
//             name="What languages can you tutor in?"
//             // @ts-ignore
//             info={
//               EditActiveTutoringExp ? (
//                 <div className="w-full  mx-auto mt-2 custom-xl:mt-3 mb-4">
//                   <div className="relative  select-none max-w-[28rem] w-full">
//                     <div
//                       className="w-full bg-[#DBCAFF] text-[#ad9dde]  text-sm  custom-2xl:text-[22px] pr-7 sm:pr-8 pl-10 sm:pl-10 py-2 custom-2xl:py-[17px] rounded-full cursor-pointer flex justify-between items-center"
//                       onClick={toggleLanguageDropdown}
//                     >
//                       <span>
//                         {language.length > 0 ? `${language.length} selected` : 'select a language'}
//                       </span>
//                       {isLanguageDropdownOpen ? (
//                         <ChevronUp size={30} className="text-[#a394d6] " />
//                       ) : (
//                         <ChevronDown size={30} className="text-[#a394d6] " />
//                       )}
//                     </div>

//                     {isLanguageDropdownOpen && (
//                       <div
//                         onMouseLeave={() => {
//                           setIsLanguageDropdownOpen(false);
//                         }}
//                         className="absolute top-full left-0 right-0 px-8 mt-2 bg-[#DBCAFF] rounded-3xl overflow-hidden z-10 w-[92%] mx-auto py-4 custom-2xl:py-7  "
//                       >
//                         <div id="style-2" className="max-h-[16.4rem] overflow-y-scroll  ">
//                           {languageoptions.map(subject => (
//                             <div
//                               key={subject.value}
//                               className=" custom-xl:py-2 cursor-pointer flex !items-center"
//                               onClick={() => handleLanguageClick(subject.value)}
//                             >
//                               <div className=" border-b-2 border-[#a394d682] py-2 custom-xl:py-3 flex items-center  gap-4  w-full px-0 custom-xl:px-4 max-w-[90%] truncate">
//                                 <div className="relative">
//                                   <input
//                                     type="checkbox"
//                                     checked={language.includes(
//                                       // @ts-ignore
//                                       subject.value
//                                     )}
//                                     onChange={() => {}}
//                                     className="absolute opacity-0 cursor-pointer"
//                                   />
//                                   <div
//                                     className={`h-4 custom-xl:h-7 w-4 custom-xl:w-7  border custom-xl:border-2 border-[#6C5BAA] hover:bg-[#a394d6] hover:border-[#a394d6] rounded-sm custom-xl:rounded-md flex items-center justify-center
//          ${
//            language.includes(
//              // @ts-ignore
//              subject.value
//            )
//              ? 'bg-[#6c5baa]'
//              : ''
//          }`}
//                                   >
//                                     {language.includes(
//                                       // @ts-ignore
//                                       subject.value
//                                     ) && <Check className="text-white" />}
//                                   </div>
//                                 </div>
//                                 <span className="ml-1 sm:ml-2 text-base sm:text-lg custom-xl:text-2xl text-[#6C5BAA] truncate ">
//                                   {subject.label}
//                                 </span>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                   {language.length > 0 && (
//                     <div className="flex flex-wrap items-start justify-start gap-2 mt-3 sm:mt-5 custom-xl:mt-8   px-2 custom-xl:px-6 mx-auto min-h-[3.4rem]">
//                       {language.map(subject => (
//                         <span
//                           key={subject}
//                           className="bg-[#6C5BAA] text-white text-xs custom-xl:text-xl leading-none px-5 py-1.5 custom-2xl:py-1.5 rounded-full flex items-center  gap-7  justify-between"
//                         >
//                           {subject}
//                           <X
//                             className="ml-7 h-4 custom-2xl:h-5 w-4 custom-2xl:w-5 cursor-pointer"
//                             onClick={() => removeLanguage(subject)}
//                           />
//                         </span>
//                       ))}
//                     </div>
//                   )}
//                   <style jsx>{`
//                     #style-2::-webkit-scrollbar-track {
//                       border-radius: 10px;
//                       background-color: #c9bbef;
//                     }

//                     #style-2::-webkit-scrollbar {
//                       width: 5px;
//                       background-color: transparent;
//                     }

//                     #style-2::-webkit-scrollbar-thumb {
//                       border-radius: 10px;

//                       background-color: #8f81c7;
//                     }
//                   `}</style>
//                 </div>
//               ) : (
//                 // @ts-ignore
//                 language.map(lang => lang.toUpperCase()).join(', ')
//               )
//             }
//             info2={''}
//             info3={''}
//             info4={''}
//             span={''}
//           />
//           <EnteredInfo
//             EditActive={EditActive}
//             name="What type of instruction are you interested in?"
//             // @ts-ignore
//             info={
//               EditActiveTutoringExp ? (
//                 <div className="">
//                   <div className="flex items-center py-3 custom-xl:py-6 relative">
//                     <div className="relative flex items-center justify-center w-7 h-7">
//                       <input
//                         type="checkbox"
//                         id="instructionOne"
//                         checked={selectedInstructionsexp.includes('1-on-1')}
//                         onChange={() => handleCheckboxChangenumberofstudents('1-on-1')}
//                         className="absolute w-6  h-6  custom-xl:w-7  custom-xl:h-7 opacity-0 cursor-pointer hover:!bg-darkBlue "
//                       />
//                       <div
//                         className={`w-6 h-6  custom-xl:w-[26.5px]  custom-xl:h-[26.5px]  border-2 custom-xl:border-[3px] border-[#685AAD] rounded-sm flex items-center justify-center  ${
//                           selectedInstructionsexp.includes('1-on-1')
//                             ? 'bg-[#685AAD]'
//                             : 'bg-transparent'
//                         }`}
//                       >
//                         {selectedInstructionsexp.includes('1-on-1') && (
//                           <Check className="w-10 h-10 text-white" />
//                         )}
//                       </div>
//                     </div>
//                     <label
//                       className="text-[#685AAD]  text-xl custom-xl:text-2xl pl-3 custom-xl:pl-7"
//                       htmlFor="instructionOne"
//                     >
//                       1-on-1
//                     </label>
//                   </div>

//                   <div className="flex items-center py-3 custom-xl:py-6 relative">
//                     <div className="relative flex items-center justify-center w-7 h-7">
//                       <input
//                         type="checkbox"
//                         id="instructionGroup"
//                         checked={selectedInstructionsexp.includes('Small group (5 to 15 students)')}
//                         onChange={() =>
//                           handleCheckboxChangenumberofstudents('Small group (5 to 15 students)')
//                         }
//                         className="absolute w-6  h-6  custom-xl:w-7  custom-xl:h-7 opacity-0 cursor-pointer hover:!bg-darkBlue "
//                       />
//                       <div
//                         className={`w-6 h-6  custom-xl:w-[26.5px]  custom-xl:h-[26.5px]  border-2 custom-xl:border-[3px] border-[#685AAD] rounded-sm flex items-center justify-center  ${
//                           selectedInstructionsexp.includes('Small group (5 to 15 students)')
//                             ? 'bg-[#685AAD]'
//                             : 'bg-transparent'
//                         }`}
//                       >
//                         {selectedInstructionsexp.includes('Small group (5 to 15 students)') && (
//                           <Check className="w-10 h-10 text-white" />
//                         )}
//                       </div>
//                     </div>
//                     <label
//                       className="text-[#685AAD]  text-xl custom-xl:text-2xl pl-3 custom-xl:pl-7"
//                       htmlFor="instructionGroup"
//                     >
//                       Small group (5 to 15 students)
//                     </label>
//                   </div>

//                   {/* Debugging: Display selected instructions */}
//                   {/* <div>Selected Instructions: {selectedInstructionsexp.join(", ")}</div> */}
//                 </div>
//               ) : (
//                 selectedInstructionsexp
//               )
//             }
//             info2={''}
//             info3={''}
//             info4={''}
//             span={''}
//           />
//           <EnteredInfo
//             EditActive={EditActive}
//             name="How many hours are you available to tutor each week?"
//             // @ts-ignore
//             info={
//               EditActiveTutoringExp ? (
//                 <>
//                   <RadioInput
//                     id="hoursLessThan5"
//                     name="tutoringHours"
//                     value="Less than 5 hours"
//                     checked={selectedHoursexp === 'Less than 5 hours'} // Check if selected
//                     onChange={() => handleHoursChange('Less than 5 hours')} // Handle change
//                     label="Less than 5 hours"
//                   />
//                   <RadioInput
//                     id="hours5To10"
//                     name="tutoringHours"
//                     value="5-10 hours"
//                     checked={selectedHoursexp === '5-10 hours'} // Check if selected
//                     onChange={() => handleHoursChange('5-10 hours')} // Handle change
//                     label="5-10 hours"
//                   />
//                   <RadioInput
//                     id="hours10To20"
//                     name="tutoringHours"
//                     value="10-20 hours"
//                     checked={selectedHoursexp === '10-20 hours'} // Check if selected
//                     onChange={() => handleHoursChange('10-20 hours')} // Handle change
//                     label="10-20 hours"
//                   />
//                   <RadioInput
//                     id="hoursMoreThan20"
//                     name="tutoringHours"
//                     value="More than 20 hours"
//                     checked={selectedHoursexp === 'More than 20 hours'} // Check if selected
//                     onChange={() => handleHoursChange('More than 20 hours')} // Handle change
//                     label="More than 20 hours"
//                   />
//                 </>
//               ) : (
//                 selectedHoursexp
//               )
//             }
//             info2={''}
//             info3={''}
//             info4={''}
//             span={''}
//           />
//           <EnteredInfo
//             EditActive={EditActive}
//             name="What date can you start tutoring?"
//             info={
//               EditActiveTutoringExp ? (
//                 <div className="w-full  mx-auto relative  custom-xl:mt-6">
//                   <div className="relative  select-none max-w-[30rem] w-full">
//                     {/* Input field */}
//                     <div
//                       className="w-full bg-[#DBCAFF] text-[#ad9dde]  text-sm  custom-2xl:text-[22px] pr-7 sm:pr-8 pl-10 sm:pl-10 py-2 custom-2xl:py-[17px] rounded-full cursor-pointer flex justify-between items-center"
//                       onClick={() => setIsOpen(!isOpen)}
//                     >
//                       <span className="text-purple-400">
//                         {selectedDate
//                           ? // @ts-ignore
//                             selectedDate.toLocaleDateString()
//                           : 'Select a date'}
//                       </span>
//                       <Image loading="lazy" src={calendaricon} alt="" className="w-6 h-6" />
//                     </div>

//                     {/* Calendar dropdown */}
//                     {isOpen && (
//                       <div className="bg-[#e2d5fd] text-[#a394d6] z-50 rounded-3xl p-4 shadow-lg absolute top-[72px] w-full  px-4 sm:px-10 py-4 sm:py-9">
//                         {/* Header */}
//                         <div className="flex items-center justify-between mb-11  ">
//                           <button onClick={handlePrevMonth} className="text-purple-600">
//                             <ChevronLeft className="w-8 h-8 font-bold" />
//                           </button>
//                           <h2 className="text-[#685AAD] font-medium text-sm sm:text-xl custom-2xl:text-3xl">
//                             {months[currentDate.getMonth()]} {currentDate.getFullYear()}
//                           </h2>
//                           <button onClick={handleNextMonth} className="text-purple-600">
//                             <ChevronRight className="w-8 h-8 font-bold " />
//                           </button>
//                         </div>

//                         {/* Days of week */}
//                         <div className="grid grid-cols-7 gap-1 mb-2 ">
//                           {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
//                             <div
//                               key={index}
//                               className="text-center text-[#76639b] text-sm sm:text-lg custom-2xl:text-2xl font-medium"
//                             >
//                               {day}
//                             </div>
//                           ))}
//                         </div>

//                         {/* Calendar grid */}
//                         <div className="grid grid-cols-7 gap-1">
//                           {generateDays().map((day, index) => (
//                             <button
//                               key={index}
//                               onClick={() => {
//                                 if (day.isCurrentMonth) {
//                                   handleStartTutoringDateChange(
//                                     new Date(
//                                       currentDate.getFullYear(),
//                                       currentDate.getMonth(),
//                                       day.day
//                                     )
//                                   );
//                                 }
//                               }}
//                               className={`
//       p-2 text-center rounded-full text-sm sm:text-lg custom-2xl:text-2xl font-medium
//       ${day.isCurrentMonth ? 'text-[#685aad] ' : 'text-[#d3c6ef]'}
//       ${
//         // @ts-ignore
//         selectedDate &&
//         selectedDate.getDate() === day.day &&
//         selectedDate.getMonth() === currentDate.getMonth() &&
//         selectedDate.getFullYear() === currentDate.getFullYear()
//           ? ''
//           : ''
//       }
//     `}
//                             >
//                               {day.day}
//                             </button>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ) : (
//                 // @ts-ignore
//                 selectedDate?.toLocaleDateString()
//               )
//             }
//             info2={''}
//             info3={''}
//             info4={''}
//             span={''}
//           />
//           <EnteredInfo
//             EditActive={EditActive}
//             name="What's you general availability?"
//             // @ts-ignore
//             info={
//               EditActiveTutoringExp ? (
//                 <div className="w-[81.8%] mt-2.5 ">
//                   {days.map(day => (
//                     <div
//                       key={day}
//                       className="flex custom-xl:pl-[29px] flex-col custom-xl:flex-row items-start custom-xl:justify-between  custom-xl:items-center mb-2"
//                     >
//                       <span className="text-darkBlue  text-xl font-medium custom-xl:font-normal custom-xl:text-[25px]   ">
//                         {day}
//                       </span>
//                       <div className="flex gap-2 flex-col sm:flex-row sm:justify-between custom-xl:w-[71.4%] w-full  ">
//                         {timeSlots.map(timeSlot => {
//                           const isChecked = availabilityexp[day]?.includes(timeSlot) || false;

//                           return (
//                             <div key={timeSlot} className="flex items-center space-x-2">
//                               <div className="flex items-center py-3 custom-xl:py-5 relative">
//                                 <div className="relative flex items-center justify-center w-7 h-7">
//                                   <input
//                                     type="checkbox"
//                                     id={`${day}-${timeSlot}`}
//                                     checked={isChecked}
//                                     onChange={() => handleTimeSlotChange(day, timeSlot)}
//                                     className="absolute w-7 h-7 opacity-0 cursor-pointer hover:!bg-darkBlue"
//                                   />
//                                   <div
//                                     className={`w-6 h-6  custom-xl:w-[26.5px]  custom-xl:h-[26.5px]  border-2 custom-xl:border-[3px] border-[#685AAD] rounded-sm flex items-center justify-center ${
//                                       isChecked ? 'bg-[#685AAD]' : 'bg-transparent '
//                                     }`}
//                                   >
//                                     {isChecked && <Check className="w-10 h-10 text-white" />}
//                                   </div>
//                                 </div>
//                                 <label
//                                   htmlFor={`${day}-${timeSlot}`}
//                                   className="text-[#685AAD]  text-xl custom-xl:text-2xl pl-3 custom-xl:pl-7"
//                                 >
//                                   {timeSlot}
//                                 </label>
//                               </div>
//                             </div>
//                           );
//                         })}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div>
//                   {Object.keys(availabilityexp).map((day, index) => (
//                     <div key={index}>
//                       <h3>
//                         {day}:{' '}
//                         {availabilityexp[day].length > 0
//                           ? availabilityexp[day].join(', ')
//                           : 'No available time slots'}
//                       </h3>
//                     </div>
//                   ))}
//                 </div>
//               )
//             }
//             info2=""
//             info3={''}
//             info4={''}
//             span={''}
//           />
//           <EnteredInfo
//             EditActive={EditActive}
//             name="Do you have classroom teaching experience?"
//             // @ts-ignore
//             info={
//               EditActiveTutoringExp ? (
//                 <>
//                   <RadioInput
//                     id="experienceYes"
//                     name="tutoringExperience"
//                     value="yes"
//                     checked={classroomteachingexp === 'yes'}
//                     onChange={() => setclassroomteachingexp('yes')} // Corrected function name
//                     label="Yes"
//                   />
//                   <RadioInput
//                     id="experienceNo"
//                     name="tutoringExperience"
//                     value="no"
//                     checked={classroomteachingexp === 'no'}
//                     onChange={() => setclassroomteachingexp('no')} // Corrected function name
//                     label="No"
//                   />
//                 </>
//               ) : (
//                 classroomteachingexp
//               )
//             }
//             info2={''}
//             info3={''}
//             info4={''}
//             span={''}
//           />
//         </div>
//       </div>

//       {/* checkbox input */}
//       <div className="mt-5 custom-xl:mt-24">
//         {/* <CheckboxInput onChange={(e)=>{setagreeterms(e.target.value)}} label="I confirm that I am 18 years or older and agree to the eTutor4Me LLC Terms of Use and Privacy Policy." /> */}
//         <div className={`flex items-center py-6 relative`}>
//           <div className="relative flex items-center justify-center  w-7  h-7">
//             <input
//               type="checkbox"
//               id="checkbox"
//               onChange={e => {
//                 setagreeterms(e.target.checked);
//               }}
//               className="absolute min-w-6 custom-xl:w-7  min-h-6 custom-xl:h-7 opacity-0 cursor-pointer hover:!bg-darkBlue"
//             />
//             <div
//               className={`  min-w-6 custom-xl:w-7  min-h-6 custom-xl:h-7 border-2 custom-xl:border-[3px] border-[#685AAD] rounded-md flex items-center justify-center ${
//                 agreeterms === true ? 'bg-[#685AAD]' : 'bg-transparent '
//               }`}
//             >
//               {agreeterms === true && (
//                 <Check className="min-w-6 custom-xl:w-7  min-h-6 custom-xl:h-7 text-white" />
//               )}
//             </div>
//           </div>
//           <label
//             className="text-[#685AAD] text-sm custom-xl:text-2xl pl-3 text-balance custom-xl:pl-6 select-none"
//             htmlFor="checkbox"
//           >
//             I confirm that I am 18 years or older and agree to the eTutor4Me{' '}
//             <span className="!text-[#8458f8] underline font-medium hover:cursor-pointer">
//               LLC Terms of Use
//             </span>{' '}
//             and{' '}
//             <span className="!text-[#8458f8] underline font-medium hover:cursor-pointer">
//               Privacy Policy.
//             </span>
//           </label>
//         </div>
//         {error && <p className="text-red-600 text-base"> {error}</p>}
//         <div className="max-w-[33.2rem]  ml-0 ">
//           {/* <ConfirmBtn
//         btnName={loading}
//         onClick={handleSubmit}
//         className="!text-3xl font-medium mt-4 ml-0 !py-[15px]"
//       /> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReviewAndSubmit;
