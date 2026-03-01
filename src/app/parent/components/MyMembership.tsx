// pages/index.js
import { useState } from 'react';
import Head from 'next/head';
import CurrentPackage from '../components/CurrentPackage';
import OtherPackages from './OtherPackage';
import PlanDetails from './PlanDetail';
import { ChevronRight, ChevronLeft, Divide } from 'lucide-react';
import Image from 'next/image';
import { usePlandata } from '@/app/admin/hooks/usePlandata';

interface MyMembershipprops {
  parentdata: any;
}
export default function MyMembership({ parentdata }: MyMembershipprops) {
  const { PlanData, isLoading, mutate, error } = usePlandata();
  const [currentplanopen, setcurrentplanopen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');

  const togglePlan = () => {
    setSelectedPlan(prevPlan => (prevPlan === 'standard' ? 'premium' : 'standard'));
  };

  return (
    <div
      className={`min-h-screen rounded-3xl custom-xl:rounded-[45px] relative mt-7   bg-[#EDE8FA]  ${
        selectedPlan == 'standard' || selectedPlan == 'premium' || selectedPlan == 'bundles'
          ? 'py-4 sm:py-6 custom-lg:py-12'
          : 'py-4 sm:py-6 custom-lg:py-8'
      }  px-3 sm:px-6 custom-lg:px-12 `}
    >
      <main className="w-full">
        {selectedPlan ? (
          <div className="flex flex-col justify-start">
            <PlanDetails
              plan={selectedPlan}
              onBack={() => setSelectedPlan('')}
              priceData={PlanData}
            />
          </div>
        ) : (
          <>
            <CurrentPackage data={parentdata} />
            <OtherPackages data={parentdata} onSelectPlan={setSelectedPlan} priceData={PlanData} />
          </>
        )}
      </main>
    </div>
  );
}
