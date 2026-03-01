import React from 'react';
import Image from 'next/image';
import guideline from '../../../../public/guideline.svg'
import elink from '../../../../public/elink.svg'
import drivefolder from '../../../../public/drive folder.svg'
import faq from '../../../../public/faq.svg'
import dedicatedmeterial from '../../../../public/dedicated meterial.svg'
import codeofconduct from '../../../../public/code of conduct.svg'
import newletter from '../../../../public/news letter.svg'
import explanotoryvideo from '../../../../public/explanotory videos.svg'
import tryetutor4me from '../../../../public/try etutor r 4 me.svg'
const links = [
  { title: 'Guidelines', icon: guideline },
  { title: 'eTutor', icon: elink },
  { title: 'Drive folder', icon: drivefolder},
  { title: 'FAQs', icon:faq },
  { title: 'Didactic material', icon: dedicatedmeterial},
  { title: 'Code of Conduct', icon: codeofconduct},
  { title: 'Newsletter', icon: newletter},
  { title: 'Explanatory videos', icon: explanotoryvideo},
  { title: 'Try eTutor4me', icon: tryetutor4me},
];

const UsefulLinks: React.FC = () => {
  return (
    <div className="">
      <div className="w-full flex flex-wrap py-14 px-14 gap-x-48 gap-y-16">
        {links.map((link, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="bg-[#A894CF] rounded-3xl p-4 w-[11.3rem] h-[11.3rem]  flex items-center justify-center mb-1">
              <Image  loading="lazy"  src={link.icon} alt={link.title} width={70} height={70} />
            </div>
            <span className="text-center text-lg text-black">{link.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsefulLinks;