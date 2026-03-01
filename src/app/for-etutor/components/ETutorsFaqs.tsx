import FAQs from '@/components/FAQs';
import React from 'react';

interface FAQItem {
  question: string;
  answer: string;
}
const ETutorsFaqs: React.FC = () => {
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
    <div className="pt-52 lg:pt-0 xl:pt-20 mb:pt-0  ">
      <FAQs faqData={eTutorFaqs} display={''} morequestion={''} />
    </div>
  );
};

export default ETutorsFaqs;
