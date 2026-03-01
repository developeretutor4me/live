import FAQs from '@/components/FAQs';
import React from 'react'

interface FAQItem {
    question: string;
    answer: string;
  }

const FaqsSoon = () => {
    const PackageFaqs:FAQItem[] = [
        { question: 'How do I become an eTutor with eTutor4Me?', answer: 'Create an account and fill your child’s learning needs to getstarted.' },
        { question: 'Can I tutor from anywhere in the world?', answer: 'Our eTutors are top students chosen for their exceptional knowledge and abilitytp connect with peers. they undergo a rigorous selection process. ' },
        { question: 'How do I schedule my tutoring sessions?', answer: 'We offer tutoring in a wide range of subjects , including Math, Science, English, and more.' },
        { question: 'How is my pay determined?', answer: 'Yes, the first session is free, allowing you to assess the tutor’s teaching style and fit.' },
        { question: 'How do I level up as an eTutor?', answer: 'Once matched with an eTutor, you can easily schedule sessions through our online platform.' },
        { question: 'Is the platform user-friendly?', answer: 'You can choose another Etutor from our platform if your child is not happy with their current eTutor.' },
        { question: 'How do I track my performance?', answer: 'Yes, our platform provides regular updates and progress reports.' },
        { question: 'Can I choose which subjects to tutor?', answer: 'Yes, al tutoring sessions are conducted live, ensuring interactive and engaging learning.' },
        { question: 'What if I need to cancel a session?', answer: 'We prioritize privacy and security, using secure platform and  protecting allpersonal information.' },
        { question: 'How do I get support as an eTutor?', answer: 'Sessions are highly flexible, allowing you to schedule them at times that best suit you ' },
      ];
  return (
    <div className='w-[90%] py-96 ml-auto lg:py-60 xl:py-72 mb:py-28 lg:w-[95%] xl:w-[92%] mb:w-[95%]'>
            <FAQs faqData={PackageFaqs} morequestion='hidden' display={''} />

    </div>
  )
}

export default FaqsSoon
