import React from 'react';
import Link from 'next/link';

const ThankYou = () => {
  return (
    <div className="bg-[#F5F0FF] px-4 py-6 sm:px-8 sm:py-8 md:px-12 md:py-10 custom-lg:px-16 custom-lg:py-12 custom-xl:px-[69px] custom-xl:py-12 rounded-[30px]">
      {/* Header */}
      <div className="text-left mb-8 custom-xl:mb-12">
        <h1 className="text-4xl sm:text-5xl custom-xl:text-[60px] font-bold text-[#534988] mb-6">
          Thank you!
        </h1>
      </div>

      <div className="text-left">
        <h4 className="text-xl sm:text-1xl custom-xl:text-1xl font-bold text-[#534988] mb-4">
          We appreciate your interest in tutoring on eTutor4Me.
        </h4>
        <p className="text-base sm:text-md custom-xl:text-md text-[#534988] leading-relaxed">
          Working with us is going to be so much fun! You&apos;ll see how quickly you can increase
          your pay while enjoying a constant income with the numerous offers we have. It&apos;s
          flexible, and as a student, this will be very beneficial for you as well.
        </p>
      </div>

      {/* What comes next section */}
      <div className="text-left">
        <h2 className="text-2xl sm:text-2xl custom-xl:text-2xl font-bold text-[#534988] my-6">
          What comes next?
        </h2>
        {/* Application Review */}
        <h4 className="text-xl sm:text-1xl custom-xl:text-1xl font-bold text-[#534988]">
          Application Review
        </h4>
        <p className="text-base sm:text-md custom-xl:text-md text-[#534988] leading-relaxed">
          We&apos;ll review your full application, and if you&apos;re approved, we&apos;ll offer you
          a contract.
        </p>
      </div>

      <div className="text-left">
        <h4 className="text-xl sm:text-1xl custom-xl:text-1xl font-bold text-[#534988] mt-6">
          Start Tutoring!
        </h4>

        <p className="text-base sm:text-md custom-xl:text-md text-[#534988] leading-relaxed">
          Once signed, you can complete your profile and start receiving opportunities. As soon as
          you submit your application, you will receive an email with a link to log in to your
          profile. Your profile will be activated after a review by one of our employees.
        </p>

        {/* Questions/Contact Section */}
        <div className="text-left mt-6">
          <p className="text-base sm:text-lg custom-xl:text-lg text-[#534988] mb-2">
            Have any questions about your application? Our team is here to help.
          </p>
          <a
            href="mailto:recruitment@eTutor4Me.com"
            className="text-[#8458F8] hover:text-[#6C5BAA] transition-colors duration-300 font-medium underline cursor-pointer"
          >
            recruitment@eTutor4Me.com
          </a>
        </div>
      </div>

      <div className="text-left mt-6 custom-xl:mt-16">
        <Link href="/signin/tutorsignin">
          <button className="bg-gradient-to-r from-[#9184F0] to-[#6C5BAA] hover:from-[#7A6BD9] hover:to-[#5A4B9A] text-white font-bold text-lg sm:text-xl custom-xl:text-2xl px-8 sm:px-12 custom-xl:px-16 py-4 custom-xl:py-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Continue
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;
