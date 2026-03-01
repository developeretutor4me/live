import React from 'react'

function ChatInboxDashboard() {
    return (
        <div className="flex flex-col  TicketInboxDashboard justify-center  h-full bg-[#ede8fa] gap-4 rounded-md sm:rounded-xl custom-lg:rounded-xl  ">
            <div className='flex gap-4  pt-3.5'>
                <div className="w-[31.35px] h-[31.35px] bg-[#00DAE5] rounded-lg"></div>
                <h2 className="text-xl sm:text-2xl custom-lg:text-[39.99px] leading-10 text-[#685AAD] font-semibold">Chat&nbsp;Inbox</h2>
            </div>
            <div className='text-[36.92px]  font-medium text-[#9185c4] flex justify-between gap-2 max-w-[17.2rem]'>
                <h2>Chats :</h2>
                <h2>152</h2>
            </div>
        </div>
    )
}

export default ChatInboxDashboard
