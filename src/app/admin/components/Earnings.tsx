import React from 'react'
import EtutorEarnings from './EtutorEarnings'
import EtutorEarningTrend from './EtutorEarningTrend'
import EtutorEarningComparison from './EtutorEarningComparison'

function Earnings() {
  return (
    <section className=" mt-5 custom-xl:mt-10 grid grid-cols-1 custom-xl:grid-cols-2  grid-rows-2 min-h-[32.5rem] gap-7">
        
    <EtutorEarnings />
  

  <div className="bg-[#ede8fa] px-3 custom-xl:px-6 py-3 custom-xl:py-6 col-span-1 row-span-2 rounded-md sm:rounded-xl  custom-lg:rounded-3xl relative ">
    <EtutorEarningTrend />
  </div>
  <div className="  col-span-1 row-span-1 rounded-md sm:rounded-xl  custom-lg:rounded-3xl       px-3 custom-xl:px-6 py-3 custom-xl:py-6  bg-[#ede8fa] ">
    <EtutorEarningComparison />
  </div>
</section>
  )
}

export default Earnings
