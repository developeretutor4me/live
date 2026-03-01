'use client';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import Logo from '../../../public/assets/signup/signuplogo.svg';

const Navabr = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogoClick = () => {
    router.push('/');
  };

  const handleSignInClick = () => {
    router.push('/signin');
  };

  const handleSignUpClick = () => {
    router.push('/SignupAs');
  };

  // Check if current page is sign in related
  const isSignInActive = pathname === '/signin' || pathname?.startsWith('/signin/');

  // Check if current page is sign up related
  const isSignUpActive = pathname === '/SignupAs' || pathname?.includes('Signup');

  return (
    <div className="px-5 md:px-20 py-5 transition-all flex justify-between items-center">
      <Image
        loading="lazy"
        src={Logo}
        alt="Logo"
        onClick={handleLogoClick}
        className="cursor-pointer w-16 sm:w-24 custom-lg:w-32 hover:opacity-80 transition-opacity duration-300"
      />
      <div className="flex items-center gap-4">
        <button
          onClick={handleSignInClick}
          className={`text-[16px] xl:text-[20px] 2xl:text-[24px] 3xl:text-[24px] transition-colors duration-300 px-5 md:px-10 py-2 md:py-4 rounded-full ${
            isSignInActive
              ? 'bg-[#8653FF] text-[#FFFFFF] rounded-full hover:bg-[#534988] font-extrabold'
              : 'text-[#8653FF] hover:text-[#9184F0] ont-medium'
          }`}
        >
          SIGN IN
        </button>
        <button
          onClick={handleSignUpClick}
          className={`text-[16px] xl:text-[20px] 2xl:text-[24px] 3xl:text-[24px] transition-colors duration-300 px-5 md:px-10 py-2 md:py-4 rounded-full ${
            isSignUpActive
              ? 'bg-[#8653FF] text-[#FFFFFF] rounded-full hover:bg-[#534988] font-extrabold'
              : 'text-[#8653FF] hover:text-[#9184F0] font-medium'
          }`}
        >
          SIGN UP
        </button>
      </div>
    </div>
  );
};

export default Navabr;
