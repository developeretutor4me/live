import React from 'react';
import Image from 'next/image';
import guideline from '../../../../public/guidlinedark.svg'
import elink from '../../../../public/edark.svg'
import drivefolder from '../../../../public/drivefolderdark.svg'
import faq from '../../../../public/faqdark.svg'
import dedicatedmeterial from '../../../../public/dedicatedmaterialDark.svg'
import codeofconduct from '../../../../public/codeOfConductDark.svg'
import newletter from '../../../../public/newsletterDark.svg'
import explanotoryvideo from '../../../../public/explanatoryVideoDark.svg'
import tryetutor4me from '../../../../public/tryetutor4medark.svg'
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
      <h1 className='font-bold text-2xl text-[#685AAD]'>Here are a few useful links to help you out!</h1>
      <div className="w-full flex flex-wrap py-14 px-14 gap-x-48 gap-y-16">
        {links.map((link, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="bg-[#B4ABD7] rounded-3xl p-4 w-[11.3rem] h-[11.3rem]  flex items-center justify-center mb-1">
              <Image  loading="lazy"  src={link.icon} alt={link.title} width={70} height={70} className='' />
            </div>
            <span className="text-center text-lg text-[#473171] font-medium">{link.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsefulLinks;