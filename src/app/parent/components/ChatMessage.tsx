import React from 'react'

export const ChatMessage = ({ message, isUser }: any) => {
    // Check if message exists and has content and timestamp
    if (!message || !message.content) return null;

    return (
        <div
            className={`flex ${isUser ? "justify-end" : "justify-start"
                } mb-2 custom-2xl:mb-4`}
        >
            <div
                className={`max-w-[70%] rounded-lg custom-2xl:rounded-2xl px-2 py-1 custom-2xl:p-3 ${isUser ? "bg-[#685AAD] text-white" : "bg-white text-[#473171]"
                    }`}
            >
                <p className="text-sm sm:text-base custom-2xl:text-xl font-medium break-words transition-all">
                    {message.content}
                </p>
                <span
                    className={`text-xs custom-2xl:text-base opacity-70 custom-2xl:mt-1 block ${isUser ? "text-white float-right" : "text-[#9B85C8]"
                        }`}
                >
                    {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </span>
            </div>
        </div>
    );
};
