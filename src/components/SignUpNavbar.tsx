import React from 'react';
import Image from 'next/image';
import logo from '../../public/assets/signup/signuplogo.svg';
import Link from 'next/link';
const SignUpNavbar = () => {
  return (
    <div className="px-20 pt-5 sm:pt-10 custom-2xl:pt-20 mb:p-5 transition-all ">
      <Link href="/">
        <Image
          loading="lazy"
          src={logo}
          alt=""
          className="cursor-pointer w-16 sm:w-24 custom-lg:w-32"
        />
      </Link>
    </div>
  );
};

export default SignUpNavbar;
