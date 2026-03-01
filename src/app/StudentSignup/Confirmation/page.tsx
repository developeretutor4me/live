'use client';
import Layout from '@/components/auth/Layout';

const Page = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center text-center justify-center mx:[100px] xl:mx-[280px] 2xl:mx-[380px]">
        <p className="text-[#584A91] text-[63.08px] leading-tight">
          <span className="font-bold">
            A confirmation email with a link has been sent to your inbox.
          </span>
          <span className="font-ligh">
            Please check your{' '}
            <a
              href="https://mail.google.com/mail/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-light hover:text-[#8358F7] transition-colors"
            >
              email{' '}
            </a>
            to complete the process.
          </span>
        </p>
      </div>
    </Layout>
  );
};

export default Page;
