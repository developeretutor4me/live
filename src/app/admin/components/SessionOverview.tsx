import React from 'react'
import FreeTrials from './FreeTrials'
import PaidSessions from './PaidSessions'
import Earnings from './Earnings'
import EachTutorEarnings from './EachTutorEarnings'
import QualificationApprovals from './QualificationApprovals'
import PauseRequest from './PauseRequest'
import ResignRequests from './ResignRequests'

function SessionOverview() {
  return (
    <div>
        <h1 className='text-[45px] leading-none text-[#685aad] font-medium pl-11 mb-10'>Sessions Overview</h1>
        <FreeTrials/>
        <PaidSessions/>
        <h1 className='text-[45px] leading-none text-[#685aad] font-medium pl-11 my-10 '>Earnings</h1>
        <Earnings/>
        <EachTutorEarnings/>
        <h1 className='text-[45px] leading-none text-[#685aad] font-medium pl-11 my-10 '>Requests</h1>
        <QualificationApprovals/>
        <PauseRequest/>
        <ResignRequests/>
    </div>
  )
}

export default SessionOverview
