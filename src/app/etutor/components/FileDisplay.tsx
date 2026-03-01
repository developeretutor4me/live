import React, { useRef } from 'react';
import Image from 'next/image';
import plusicon from '../../../../public/plusicon.svg'
import pdficon from '../../../../public/pdf icon.svg'
const FolderView = ({ activeView, tutors, activeTutor, handleFileDownload, handleFileUpload }:any) => {
  const fileInputRef = useRef(null);

  if (activeView !== 'folder') return null;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow p-4 bg-[#A296CC] border-t border-[#8b55ff51] mx-4 overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#685aad40] scrollbar-thumb-rounded-3xl">
        {tutors[activeTutor].files.map((file:any) => (
          <div
            key={file.id}
            onClick={() => handleFileDownload(file)}
            className={`bg-[#8170B1] max-w-[35rem] flex items-center py-5 px-3 rounded-xl my-3 ${
              file.isReceived ? 'mr-auto' : 'ml-auto'
            }`}
          >
            <Image  loading="lazy"  src={pdficon} alt="PDF Icon" className="w-8 h-8" />
            <div className="ml-3 flex items-center justify-between border-2 w-full">
              <span className="max-w-[10rem] text-xl overflow-hidden text-nowrap font-medium">
                {file.name}
              </span>
              <span className="text-xs text-gray-300">
                {file.date} {file.time}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="py-2 sm:py-4 px-2 sm:px-7 bg-[#A296CC] rounded-b-3xl absolute bottom-0">
        <button
        //@ts-ignore
          onClick={() => fileInputRef.current.click()}
          className="w-full text-white py-2 px-4 rounded-full flex items-center justify-center gap-3 bg-[#8a7db7]"
        >
          <span className="text-xl text-[#DBD8EF] font-medium">Add attachment</span>
          <Image  loading="lazy"  src={plusicon} alt="" className="w-8 h-8" />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
};

export default FolderView;