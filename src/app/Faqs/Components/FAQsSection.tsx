import FAQs from '@/components/FAQs';
import React from 'react';
interface FAQItem {
  question: string;
  answer: string;
}
const FAQsSection: React.FC = () => {
  const PackageFaqs: FAQItem[] = [
    {
      question: 'How do I become an eTutor with eTutor4Me?',
      answer: 'Create an account and fill your child’s learning needs to getstarted.',
    },
    {
      question: 'Can I tutor from anywhere in the world?',
      answer:
        'Our eTutors are top students chosen for their exceptional knowledge and abilitytp connect with peers. they undergo a rigorous selection process. ',
    },
    {
      question: 'How do I schedule my tutoring sessions?',
      answer:
        'We offer tutoring in a wide range of subjects , including Math, Science, English, and more.',
    },
    {
      question: 'How is my pay determined?',
      answer:
        'Yes, the first session is free, allowing you to assess the tutor’s teaching style and fit.',
    },
    {
      question: 'How do I level up as an eTutor?',
      answer:
        'Once matched with an eTutor, you can easily schedule sessions through our online platform.',
    },
    {
      question: 'Is the platform user-friendly?',
      answer:
        'You can choose another Etutor from our platform if your child is not happy with their current eTutor.',
    },
    {
      question: 'How do I track my performance?',
      answer: 'Yes, our platform provides regular updates and progress reports.',
    },
    {
      question: 'Can I choose which subjects to tutor?',
      answer:
        'Yes, al tutoring sessions are conducted live, ensuring interactive and engaging learning.',
    },
    {
      question: 'What if I need to cancel a session?',
      answer:
        'We prioritize privacy and security, using secure platform and  protecting allpersonal information.',
    },
    {
      question: 'How do I get support as an eTutor?',
      answer:
        'Sessions are highly flexible, allowing you to schedule them at times that best suit you ',
    },
  ];

  const eTutorFaqs: FAQItem[] = [
    {
      question: 'How do I become an eTutor with eTutor4Me?',
      answer:
        'You can become an eTutor by visiting our website and completing the online application form. After that, you will undergo a selection process, which includes submitting your qualifications, expertise, and completing an interview to ensure you meet our standards.',
    },
    {
      question: 'Can I tutor from anywhere in the world?',
      answer:
        'Yes, you can tutor from anywhere as long as you have a stable internet connection and the necessary tools to conduct online sessions. We welcome tutors from various locations to join our diverse community.',
    },
    {
      question: 'How do I schedule my tutoring sessions?',
      answer:
        'You can schedule your tutoring sessions through our online platform. Simply log in to your account, choose the subject and tutor you prefer, and select an available time slot that fits your schedule.',
    },
    {
      question: 'How is my pay determined?',
      answer:
        'Your pay is determined based on several factors, including your qualifications, the subjects you tutor, your experience, and the number of sessions you conduct. We strive to offer competitive rates to ensure you are fairly compensated for your work.',
    },
    {
      question: 'How do I level up as an eTutor?',
      answer:
        'To level up as an eTutor, focus on improving your skills and gaining positive feedback from your students. You can also participate in professional development courses we offer, which can help you enhance your teaching methods and expand the subjects you can tutor.',
    },
    {
      question: 'Is the platform user-friendly?',
      answer:
        'Yes, our platform is designed with user-friendliness in mind. We have a straightforward interface that makes it easy for both tutors and students to navigate, schedule sessions, and access learning materials.',
    },
    {
      question: 'How do I track my performance?',
      answer:
        'You can track your performance through the analytics and feedback tools available in your tutor dashboard. This includes insights into student ratings, completed sessions, and other performance metrics that help you gauge your effectiveness.',
    },
    {
      question: 'Can I choose which subjects to tutor?',
      answer:
        'Yes, you can choose which subjects to Wtutor based on your expertise and interests. We encourage tutors to offer subjects they are passionate about, as this enhances the learning experience for students.',
    },
    {
      question: 'What if I need to cancel a session?',
      answer:
        'If you need to cancel a session, please notify your students as soon as possible through the platform. We have a cancellation policy in place that allows for rescheduling or refunds, depending on the situation and the timing of the cancellation.',
    },
    {
      question: 'How do I get support as an eTutor?',
      answer:
        'As an eTutor, you can access support through our dedicated tutor support team. You can reach out via email or the support chat feature on our platform for any questions or assistance you may need regarding your tutoring sessions or the platform.',
    },
  ];

  return (
    <div className="px-10">
      <div
        id="faq-etutor"
        className=" bg-cardbg max-w-[1612px] w-full mx-auto mt-[4.8rem] mb-[18.8rem] xl:my-24 lg:my-32 mb:my-12 m-auto rounded-[3rem] mb:p-8 mb:rounded-xl px-[102px] py-20 xl:p-24 lg:p-16 mb:w-full "
      >
        <h2 className="text-darkBlue text-5xl font-extrabold  pb-4  mb:pb-0 lg:text-4xl mb:pl-0 mb:text-xl">
          Become an eTutor{' '}
        </h2>
        <FAQs faqData={eTutorFaqs} display="hidden" morequestion={''} />{' '}
      </div>
      <div
        id="faq-for-etutors"
        className=" bg-cardbg max-w-[1612px] w-full mx-auto my-[18.8rem] xl:my-24 lg:my-32 mb:my-12 m-auto rounded-[3rem] mb:p-8 mb:rounded-xl px-[102px] py-20 xl:p-24 lg:p-16 mb:w-full"
      >
        <h2 className="text-darkBlue text-5xl font-extrabold  pb-8  mb:pb-0 lg:text-4xl mb:pl-0 mb:text-xl">
          For eTutors
        </h2>
        <FAQs faqData={PackageFaqs} display="hidden" morequestion={''} />
      </div>
      <div
        id="faq-packages"
        className="  bg-cardbg max-w-[1612px] w-full mx-auto my-[18.8rem] xl:my-24 lg:my-32 mb:my-12 m-auto rounded-[3rem] mb:p-8 mb:rounded-xl px-[102px] py-20 xl:p-24 lg:p-16 mb:w-full"
      >
        <h2 className="text-darkBlue text-5xl font-extrabold  pb-8 mb:pb-0 lg:text-4xl mb:pl-0 mb:text-xl">
          Packages
        </h2>
        <FAQs faqData={PackageFaqs} display="hidden" morequestion={''} />
      </div>
      <div
        id="faq-technical-questions"
        className="  bg-cardbg max-w-[1612px] w-full mx-auto my-[18.8rem] xl:my-24 lg:my-32 mb:my-12 m-auto rounded-[3rem] mb:p-8 mb:rounded-xl px-[102px] py-20 xl:p-24 lg:p-16 mb:w-full"
      >
        <h2 className="text-darkBlue text-5xl font-extrabold  pb-8 mb:pb-0 lg:text-4xl mb:pl-0 mb:text-xl">
          Technical questions
        </h2>
        <FAQs faqData={PackageFaqs} display="hidden" morequestion={''} />
      </div>
      <div
        id="faq-general-questions"
        className=" bg-cardbg max-w-[1612px] w-full mx-auto my-[18.8rem] xl:my-24 lg:my-32 mb:my-12 m-auto rounded-[3rem] mb:p-8 mb:rounded-xl px-[102px] py-20 xl:p-24 lg:p-16 mb:w-full"
      >
        <h2 className="text-darkBlue text-5xl font-extrabold  pb-8  mb:pb-0 lg:text-4xl mb:pl-0 mb:text-xl">
          General questions
        </h2>
        <FAQs faqData={PackageFaqs} display="hidden" morequestion={''} />
      </div>
      <div
        id="faq-booking"
        className=" bg-cardbg max-w-[1612px] w-full mx-auto my-[18.8rem] xl:my-24 lg:my-32 mb:my-12 m-auto rounded-[3rem] mb:p-8 mb:rounded-xl px-[102px] py-20 xl:p-24 lg:p-16 mb:w-full"
      >
        <h2 className="text-darkBlue text-5xl font-extrabold  pb-8  mb:pb-0 lg:text-4xl mb:pl-0 mb:text-xl">
          Booking
        </h2>
        <FAQs faqData={PackageFaqs} display="hidden" morequestion={''} />
      </div>
      <div
        id="faq-security"
        className=" bg-cardbg max-w-[1612px] w-full mx-auto my-[18.8rem] xl:my-24 lg:my-32 mb:my-12 m-auto rounded-[3rem] mb:p-8 mb:rounded-xl px-[102px] py-20 xl:p-24 lg:p-16 mb:w-full"
      >
        <h2 className="text-darkBlue text-5xl font-extrabold  pb-8  mb:pb-0 lg:text-4xl mb:pl-0 mb:text-xl">
          Security
        </h2>
        <FAQs faqData={PackageFaqs} display="hidden" morequestion={''} />
      </div>
      <div
        id="faq-etutor4me"
        className=" bg-cardbg max-w-[1612px] w-full mx-auto my-[18.8rem] xl:my-24 lg:my-32 mb:my-12 m-auto rounded-[3rem] mb:p-8 mb:rounded-xl px-[102px] py-20 xl:p-24 lg:p-16 mb:w-full"
      >
        <h2 className="text-darkBlue text-5xl font-extrabold  pb-8 mb:pb-0 lg:text-4xl mb:pl-0 mb:text-xl">
          eTutor4Me
        </h2>
        <FAQs faqData={PackageFaqs} display="hidden" morequestion={''} />
      </div>
    </div>
  );
};

export default FAQsSection;
