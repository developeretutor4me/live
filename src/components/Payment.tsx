'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import payment from '../../public/assets/homepage/paymentimg.png';

const Payment = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-9/12 m-auto pt-[257px] pb-8 flex flex-col items-center justify-center row-gap-12 mb:w-full mb:py-12 mb:gap-0 lg:w-3/5 lg:pt-20 xl:pt-36"
    >
      <h2
        className={`text-[87px] font-extrabold text-darkBlue lg:text-[60px] xl:text-[70px] relative mb:text-[30px] mb:ab leading-tight transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        Completely Risk-free secure payment with{' '}
        <span
          className={`absolute text-[10rem] text-lightblue font-extrabold ml-8 mb:text-[40px] xl:text-[100px] lg:text-[80px] mb:ml-0 mb:relative transition-all duration-1000 ease-out delay-300 ${
            isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
          }`}
        >
          stripe
        </span>{' '}
      </h2>
      <div
        className={`mt-40 mb:mt-12 transition-all duration-1000 ease-out delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
        }`}
      >
        <Image
          loading="lazy"
          className="h-72 w-auto mb:h-auto animate-float animate-glow animate-subtle-rotate"
          src={payment}
          alt="Secure payment with Stripe"
        />
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-8px) rotate(0.5deg);
          }
          50% {
            transform: translateY(-12px) rotate(0deg);
          }
          75% {
            transform: translateY(-6px) rotate(-0.3deg);
          }
        }

        @keyframes glow {
          0%,
          100% {
            filter: drop-shadow(0 0 8px rgba(139, 92, 246, 0.3));
          }
          50% {
            filter: drop-shadow(0 0 20px rgba(139, 92, 246, 0.6))
              drop-shadow(0 0 30px rgba(139, 92, 246, 0.3));
          }
        }

        @keyframes subtle-rotate {
          0%,
          100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(0.5deg);
          }
          75% {
            transform: rotate(-0.3deg);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-glow {
          animation: glow 4s ease-in-out infinite;
        }

        .animate-subtle-rotate {
          animation: subtle-rotate 8s ease-in-out infinite;
        }

        /* Enhanced hover effects */
        .animate-float:hover {
          animation-play-state: paused;
          transform: translateY(-15px) scale(1.05);
          filter: drop-shadow(0 0 25px rgba(139, 92, 246, 0.8))
            drop-shadow(0 0 40px rgba(139, 92, 246, 0.4));
          transition: all 0.3s ease;
        }

        /* Responsive animations */
        @media (max-width: 768px) {
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }

          .animate-glow {
            animation: glow 3s ease-in-out infinite;
          }

          .animate-subtle-rotate {
            animation: subtle-rotate 6s ease-in-out infinite;
          }
        }
      `}</style>
    </div>
  );
};

export default Payment;
