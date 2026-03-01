'use client';

import React, { useState } from 'react';
import parentprofilelogo from '../../../../public/parentprofilelogo.svg';
import alert from '../../../../public/alertOrange.svg';
import Image from 'next/image';
import { ChevronLeft, Link } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Session } from 'inspector/promises';
import { useSession } from 'next-auth/react';
import singup from '../../../../public/assets/signup/parent.png';

const AddChildSection = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [selectedOption, setselectedOption] = useState('select');
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [state, setState] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  const [parentUserId, setParentUserId] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [requestedBy, setRequestedBy] = useState(''); // Assume logged-in user's ID is set here
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleLink = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    setMessage('');
    setError('');

    if (!parentUserId) {
      setError('Parent User ID is required.');
      setLoading(false);
      return;
    } else if (!email) {
      setError('student email is required.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/parent-Student-Relationship/parent-side-api/Link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          parentUserId,
          studentEmail: email,
          requestedBy: parentUserId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setLoading(false);
        setError(data.error || 'Something went wrong.');

        return;
      }
      setLoading(false);
      setselectedOption('success');
      setMessage(data.message || 'Parent and student linked successfully.');
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: any) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);
    await setParentUserId(session?.user?.id);

    if (!email || !verificationCode) {
      setError('Email and verification code are required.');
      return;
    }

    try {
      const response = await fetch('/api/parent-Student-Relationship/parent-side-api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, verificationCode }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'An error occurred.');
      } else {
        setMessage(data.message || 'Verification successful.');
        setFirstName(data.student.firstName);
        setLastName(data.student.lastName);
        setState(data.student.personalInformation.city || 'Not Available');
        setLoading(false);
        setselectedOption('AccountLink');
        setEmail(data.user.email);
        setError('');
      }
    } catch (err) {
      console.error('Error verifying user:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage('');
    setErrorMessage('');

    try {
      const response = await fetch(
        '/api/parent-Student-Relationship/parent-side-api/search-students',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setResponseMessage(data.message);
        setselectedOption('confirmation');
      } else {
        setLoading(false);
        setErrorMessage(data.error || 'Something went wrong.');
      }
    } catch (error) {
      setErrorMessage('Error: Unable to send request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <div className="px-11 py-11 flex sm:items-center flex-col sm:flex-row gap-4 sm:gap-10">
        <Image loading="lazy" src={parentprofilelogo} alt="" />

        <div>
          <div
            onClick={() => {
              router.push('/parent');
            }}
          >
            <div className="flex cursor-pointer  sm:items-center sm:ml-16">
              <ChevronLeft className="mr-2 cursor-pointer text-[#685AAD]" size={32} />

              <h1 className="text-[#685AAD] text-xs sm:text-sm custom-lg:text-2xl hidden sm:block">
                Back
              </h1>
            </div>
          </div>
        </div>

        <Image
          loading="lazy"
          src={singup}
          alt=""
          className="absolute -bottom-32 z-50 left-0 w-[35rem] hidden 2xl:block"
        />
      </div>

      {selectedOption === 'select' && (
        <div className="my-auto mx-auto 2xl:absolute top-44 right-36 w-full max-w-[1408px] min-h-[658px]  px-16 py-16 bg-[#ede8fa] rounded-3xl ">
          <h1 className="text-4xl md:text-5xl font-bold text-[#9163fe] mb-7">
            Let&apos;s Add Your Child!
          </h1>

          <p className="text-[#8276bc] text-xl mb-12 max-w-6xl leading-tight font-semibold ">
            Easily manage your child&apos;s learning by adding them to your parent account. Select
            whether your child has an existing account or needs a new one to continue.
          </p>

          <div className="grid custom-lg:grid-cols-2 gap-8  pt-2 ">
            {/* Left Card */}
            <div
              onClick={() => {
                setselectedOption('linkAccount');
              }}
              className="bg-[#e6dcfc] rounded-3xl px-12 py-10 transform translate-y-0 hover:-translate-y-3 transition-all duration-300 hover:shadow-[0px_4px_5px_3px_rgba(0,0,0,0.25)]   hover:cursor-pointer "
            >
              <h2 className="text-2xl md:text-3xl font-bold  text-[#9163fe] mb-6">
                Link Your Child&apos;s Existing Account
              </h2>
              <div className="h-0.5 w-[73%] bg-[#685AAD] mb-6"></div>
              <p className="text-[#8274bc] text-xl pb-2  font-roboto">
                If your child already has an account on our platform, you can easily link it to your
                parent account. Simply enter your child&apos;s account details to establish a
                connection and manage their learning from your profile. This will allow you to track
                progress, assign tutors, and receive updates about your child&apos;s activities.
              </p>
            </div>

            {/* Right Card */}
            <div
              onClick={() => {
                router.push('/StudentSignup');
              }}
              className="bg-[#e6dcfc] rounded-3xl px-12 py-10 transform translate-y-0 hover:-translate-y-3 transition-all duration-300 hover:shadow-[0px_4px_5px_3px_rgba(0,0,0,0.25)]   hover:cursor-pointer "
            >
              <h2 className="text-2xl md:text-3xl font-bold  text-[#9163fe] mb-6">
                Create a New Account for Your Child
              </h2>
              <div className="h-0.5 w-[73%] bg-[#685AAD] mb-6"></div>
              <p className="text-[#8274bc] text-xl pb-2  font-roboto">
                If your child is new to our platform, you can create a new account for them
                directly. Fill in the required details to set up their profile and begin their
                learning journey. You&apos;ll be able to manage their account, assign tutors, and
                monitor their progress from your parent account.
              </p>
            </div>
          </div>
        </div>
      )}

      {selectedOption === 'linkAccount' && (
        <div className="my-auto mx-auto 2xl:absolute top-36 right-44 w-full max-w-[1214px] min-h-[717px]  px-20 py-16 bg-[#ede8fa] rounded-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-[#9163fe] mb-7 pt-2">
            Child&apos;s E-mail Address
          </h1>
          <p className="text-[#8276bc] text-xl mb-12 max-w-6xl leading-tight font-semibold ">
            Connect your child’s existing account to your parent profile. Simply enter their account
            details to complete the link.
          </p>

          <div className="flex justify-between  gap-y-[4.75rem] flex-col  h-full">
            <div className="pt-3 max-w-[37rem] w-full ">
              <div className="w-full">
                <label className="block text-lg sm:text-3xl font-semibold text-[#9085C4] pl-4 sm:pl-8 md:pl-12">
                  Student’s E-mail
                </label>
                <input
                  type="email"
                  className="placeholder-[#a699d4] outline-none focus:ring-0 mt-2 sm:mt-4 pl-4 sm:pl-8 md:pl-12 pr-4 py-2 sm:py-3 custom-2xl:py-5 block w-full rounded-full text-[#685AAD] bg-[#e4d9fd] text-lg sm:text-xl md:text-2xl"
                  placeholder="enter student’s email"
                  value={email}
                  required
                  autoFocus
                  onChange={e => {
                    e.preventDefault();
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="w-full mt-9">
                <label className="block text-lg sm:text-3xl font-semibold text-[#9085C4] pl-4 sm:pl-8 md:pl-12">
                  Student’s ID
                </label>
                <input
                  type="text"
                  className="placeholder-[#a699d4] outline-none focus:ring-0 mt-2 sm:mt-4 pl-4 sm:pl-8 md:pl-12 pr-4 py-2 sm:py-3 custom-2xl:py-5 block w-full rounded-full text-[#685AAD] bg-[#e4d9fd] text-lg sm:text-xl md:text-2xl"
                  placeholder="enter student’s ID"
                  value={userId}
                  required
                  autoFocus
                  onChange={e => {
                    e.preventDefault();
                    setUserId(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center max-w-[36rem] gap-9 pl-8">
                {errorMessage && (
                  <>
                    <Image loading="lazy" src={alert} alt="" className="w-11" />
                    <p className="text-[#ff9580] text-lg leading-tight ">
                      The email or ID you entered is incorrect. Please enter the correct info to
                      proceed
                    </p>
                  </>
                )}
              </div>

              <button
                onClick={e => {
                  handleSubmit(e);
                }}
                className=" bg-[#8358f7]  rounded-full text-white text-4xl font-medium py-3.5  px-12 max-w-[24rem] w-full"
              >
                {loading ? 'Loading...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedOption === 'confirmation' && (
        <div className="my-auto mx-auto 2xl:absolute top-48 right-44 w-full max-w-[1214px] min-h-[566px]  px-20 py-16 bg-[#ede8fa] rounded-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-[#9163fe] mb-7 pt-1">
            Child&apos;s E-mail Address
          </h1>
          <p className="text-[#8276bc] text-xl mb-9 max-w-[57rem] leading-tight font-semibold ">
            A confirmation code was sent to your child’s email address. Please enter the code below
            to complete the account link.
          </p>

          <div className="flex justify-between  gap-y-[4.75rem] flex-col  h-full">
            <div className=" max-w-[40rem] w-full ">
              <div className="w-full">
                <label className="block text-lg sm:text-3xl font-semibold text-[#9085C4] pl-4 sm:pl-8 md:pl-12">
                  Confirmation code
                </label>
                <input
                  type="text"
                  className="placeholder-[#a699d4] outline-none focus:ring-0 mt-2 sm:mt-4 pl-4 sm:pl-8 md:pl-12 pr-4 py-2 sm:py-3 custom-2xl:py-5 block w-full rounded-full text-[#685AAD] bg-[#e4d9fd] text-lg sm:text-xl md:text-2xl"
                  placeholder="enter studen’s confirmation code"
                  value={verificationCode}
                  onChange={e => {
                    e.preventDefault();
                    setVerificationCode(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center max-w-[36rem] gap-9 pl-8">
                {error && (
                  <>
                    <Image loading="lazy" src={alert} alt="" className="w-11" />
                    <p className="text-[#ff9580] text-lg leading-tight ">
                      The confirmation code you entered is incorrect. Please enter the correct code
                    </p>
                  </>
                )}
              </div>

              <button
                onClick={e => {
                  handleVerify(e);
                }}
                className=" bg-[#8358f7]  rounded-full text-white text-4xl font-medium py-3.5  px-12 max-w-[24rem] w-full"
              >
                {loading ? 'Loading...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedOption === 'AccountLink' && (
        <div className="my-auto mx-auto 2xl:absolute top-24 right-40 w-full max-w-[975px] min-h-[897px]  px-[6.5rem] py-16 bg-[#ede8fa] rounded-3xl ">
          <h1 className="text-4xl md:text-5xl font-bold text-[#9163fe] mb-7 pt-2">
            Confirm Account to Link
          </h1>
          <p className="text-[#8276bc] text-xl mb-12 max-w-6xl leading-tight font-semibold ">
            You’re about to link your account to the following student profile. Please review the
            details below and confirm.
          </p>

          <div className="flex justify-between  gap-y-[4.5rem] flex-col  h-full">
            <div className="pt-3  w-full ">
              <div className="w-full">
                <label className="block text-lg sm:text-3xl font-semibold text-[#9085C4] pl-4 sm:pl-8 md:pl-12">
                  E-mail Adress
                </label>
                <input
                  type="text"
                  className="placeholder-[#a699d4] outline-none focus:ring-0 mt-2 sm:mt-4 pl-4 sm:pl-8 md:pl-12 pr-4 py-2 sm:py-3 custom-2xl:py-5 block w-full rounded-full text-[#685AAD] bg-[#e4d9fd] text-lg sm:text-xl md:text-2xl"
                  placeholder="example@gmail.com"
                  value={email}
                  disabled
                />
              </div>
              <div className="grid grid-cols-2 gap-x-11 gap-y-11 mt-9 pt-0.5">
                <div className="w-full">
                  <label className="block text-lg sm:text-2xl font-semibold text-[#9085C4] pl-4 sm:pl-8 md:pl-12">
                    Fisrt Name
                  </label>
                  <input
                    type="text"
                    className="placeholder-[#a699d4] outline-none focus:ring-0 mt-2 sm:mt-4 pl-4 sm:pl-8 md:pl-12 pr-4 py-2 sm:py-3 custom-2xl:py-4 block w-full rounded-full text-[#685AAD] bg-[#e4d9fd] text-lg sm:text-xl md:text-2xl"
                    placeholder="Fisrt Name"
                    value={firstName}
                    disabled
                  />
                </div>
                <div className="w-full">
                  <label className="block text-lg sm:text-2xl font-semibold text-[#9085C4] pl-4 sm:pl-8 md:pl-12">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="placeholder-[#a699d4] outline-none focus:ring-0 mt-2 sm:mt-4 pl-4 sm:pl-8 md:pl-12 pr-4 py-2 sm:py-3 custom-2xl:py-4 block w-full rounded-full text-[#685AAD] bg-[#e4d9fd] text-lg sm:text-xl md:text-2xl"
                    placeholder="Last Name"
                    value={LastName}
                    disabled
                  />
                </div>
                <div className="w-full">
                  <label className="block text-lg sm:text-2xl font-semibold text-[#9085C4] pl-4 sm:pl-8 md:pl-12">
                    Student ID
                  </label>
                  <input
                    type="text"
                    className="placeholder-[#a699d4] outline-none focus:ring-0 mt-2 sm:mt-4 pl-4 sm:pl-8 md:pl-12 pr-4 py-2 sm:py-3 custom-2xl:py-4 block w-full rounded-full text-[#685AAD] bg-[#e4d9fd] text-lg sm:text-xl md:text-2xl"
                    placeholder="Student ID"
                    value={userId}
                    disabled
                  />
                </div>
                <div className="w-full">
                  <label className="block text-lg sm:text-2xl font-semibold text-[#9085C4] pl-4 sm:pl-8 md:pl-12">
                    State / City
                  </label>
                  <input
                    type="text"
                    className="placeholder-[#a699d4] outline-none focus:ring-0 mt-2 sm:mt-4 pl-4 sm:pl-8 md:pl-12 pr-4 py-2 sm:py-3 custom-2xl:py-4 block w-full rounded-full text-[#685AAD] bg-[#e4d9fd] text-lg sm:text-xl md:text-2xl"
                    placeholder="State / City"
                    value={state}
                    disabled
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center  gap-9 pl-8">
                {error && (
                  <>
                    <Image loading="lazy" src={alert} alt="" className="w-11" />
                    <p className="text-[#ff9580] text-lg leading-tight ">{error}</p>
                  </>
                )}
              </div>

              <button
                onClick={e => {
                  handleLink(e);
                }}
                className=" bg-[#8358f7]  rounded-full text-white text-4xl font-medium py-2.5  px-12 max-w-[22.5rem] w-full"
              >
                {loading ? 'Loading...' : 'Link'}
              </button>
            </div>
          </div>
        </div>
      )}
      {selectedOption === 'success' && (
        <div className="my-auto mx-auto 2xl:absolute top-[13.5rem] right-[11.4rem] w-full max-w-[1111.92px] min-h-[471px]  px-[6.5rem] py-20 bg-[#ede8fa] rounded-3xl ">
          <h1 className="text-4xl md:text-5xl font-bold text-[#9163fe] mb-9 pt-2">
            Account Linked Successfully
          </h1>
          <p className="text-[#8276bc] text-xl mb-12 max-w-6xl leading-tight font-semibold ">
            The student account has been successfully linked to your parent profile. You can now
            manage their learning journey and access their progress directly.
          </p>

          <div className="flex justify-between  gap-y-[3.5rem] flex-col  h-full">
            <div></div>

            <div className="flex justify-between items-center">
              <div className="flex items-center  gap-9 pl-8"></div>

              <button
                onClick={() => {
                  router.push('/parent');
                }}
                className=" bg-[#8358f7]  rounded-full text-white text-4xl font-medium py-3.5  px-12 max-w-[24rem] w-full"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddChildSection;
