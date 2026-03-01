import Image from 'next/image';
import React from 'react'
import pdficon from "../../../../public/pdf icon.svg";

export const FileMessage = ({ message, isUser }: any) => {
    // Check if the file exists and has content

    if (!message) return null;
    return (
        <div
            onClick={() => {
                const link = document.createElement('a');
                link.href = message.fileUrl;
                link.target = '_blank'; // Open in a new tab
                link.download = message.fileUrl.split('/').pop(); // Download the file with its original name
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                // window.open(message.fileUrl, '_blank');
            }}
            className={`bg-[#8170B1] max-w-[34rem] flex items-center p-6 rounded-xl my-3 hover:cursor-pointer ${isUser ? 'ml-auto' : 'mr-auto' // Conditional alignment based on isUser
                }`}
        >
            <Image loading="lazy" src={pdficon} alt="PDF Icon" className="w-12 h-12" />
            <div className="ml-3 flex items-center justify-between w-full">
                <span className="max-w-[10rem] text-2xl overflow-hidden text-nowrap font-medium">
                    {message.fileName.slice(0, 4) + '...' + message.fileName.slice(-4)}

                </span>
                <span className="text-xs text-gray-300">
                    {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}

                </span>
            </div>
        </div>
    );
};