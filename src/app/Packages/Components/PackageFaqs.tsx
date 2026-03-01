import FAQs from '@/components/FAQs';
import React from 'react';
interface FAQItem {
  question: string;
  answer: string;
}
const PackageFaqs: React.FC = () => {
  const PackageFaqs: FAQItem[] = [
    {
      question: 'How do i sign my child up for eTutor4Me?',
      answer: 'Create an account and fill your child’s learning needs to getstarted.',
    },
    {
      question: 'How are eTutors selected?',
      answer:
        'Our eTutors are top students chosen for their exceptional knowledge and abilitytp connect with peers. they undergo a rigorous selection process. ',
    },
    {
      question: 'What subject do you offer?',
      answer:
        'We offer tutoring in a wide range of subjects , including Math, Science, English, and more.',
    },
    {
      question: 'Is the first session free?',
      answer:
        'Yes, the first session is free, allowing you to assess the tutor’s teaching style and fit.',
    },
    {
      question: 'How do i schedule sessions for my child? ',
      answer:
        'Once matched with an eTutor, you can easily schedule sessions through our online platform.',
    },
    {
      question: 'What if my child is not satisfied with their eTuto?',
      answer:
        'You can choose another Etutor from our platform if your child is not happy with their current eTutor.',
    },
    {
      question: 'Can i monitor my child’s progress?',
      answer: 'Yes, our platform provides regular updates and progress reports.',
    },
    {
      question: 'Are sessions conducted in real-time?',
      answer:
        'Yes, al tutoring sessions are conducted live, ensuring interactive and engaging learning.',
    },
    {
      question: 'How is my child’s privacy protected?',
      answer:
        'We prioritize privacy and security, using secure platform and  protecting allpersonal information.',
    },
    {
      question: 'How flexible are the tutoring sessions?',
      answer:
        'Sessions are highly flexible, allowing you to schedule them at times that best suit you ',
    },
  ];
  return (
    <div className="py-32 mb:py-10 ">
      <FAQs faqData={PackageFaqs} display={''} morequestion={''} />
    </div>
  );
};
//pt-52 pl-40  lg:pt-0 xl:pt-20 xl:pl-24 lg:pl-12 mb:pl-0 mb:pt-0
export default PackageFaqs;
