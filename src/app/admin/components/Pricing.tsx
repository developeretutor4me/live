const options = [
  { value: 'standard', label: 'Standard Membership' },
  { value: 'premium', label: 'Premium Membership' },
  { value: 'payasyougo', label: 'Pay As You Go' },
  { value: 'bundles', label: 'Bundles' },
];

import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { usePlandata } from '../hooks/usePlandata';

interface MembershipPlansprops {
  plandata: any;
}
const MembershipPlans = ({ plandata }: MembershipPlansprops) => {
  const getPlanPrice = (planType: string, tutorLevel: string, month?: string) => {
    return plandata?.data?.[planType]
      ?.filter(
        (plan: any) =>
          plan.planType === planType &&
          plan.tutorLevel === tutorLevel &&
          (plan.month ? plan.month === month : true)
      )
      ?.map((plan: any) => (Number(plan.priceAmount) / 100).toFixed(0));
  };

  const getBundlePrice = (value: any) => {
    return plandata?.data?.['bundles']
      ?.filter((plan: any) => plan.bundles_session === value)
      ?.map((plan: any) => (Number(plan.priceAmount) / 100).toFixed(2));
  };

  const standardplan: any = [
    {
      type: 'Standard Membership',
      level: 'Junior',
      timePeriod: 'Monthly',
      price: getPlanPrice('standard', 'Junior', 'Monthly'),
      monthlyPayment: 140.0,
      sessionPrice: 35.0,
      payToETutors: 68.0,
      profitMargin: 72.0,
      profitMarginPercentage: 51,
      planType: 'standard',
      tutorLevel: 'Junior',
      month: 'Monthly',
      interval: 'monthly',
      discountValue: 0,
      description: '4 Sessions/Month (Level 1-3) (Monthly Auto-Renewal)',
    },
    {
      type: 'Standard Membership',
      level: 'Senior',
      timePeriod: 'Monthly',
      price: getPlanPrice('standard', 'Senior', 'Monthly'),
      monthlyPayment: 160.0,
      sessionPrice: 40.0,
      payToETutors: 78.0,
      profitMargin: 82.0,
      profitMarginPercentage: 51,
      planType: 'standard',
      tutorLevel: 'Senior',
      month: 'Monthly',
      interval: 'monthly',
      discountValue: 0,
      description: '4 Sessions/Month (Level 4-7) (Monthly Auto-Renewal)',
    },
    {
      type: 'Standard Membership',
      level: 'Expert',
      timePeriod: 'Monthly',
      price: getPlanPrice('standard', 'Expert', 'Monthly'),
      monthlyPayment: 180.0,
      sessionPrice: 45.0,
      payToETutors: 88.0,
      profitMargin: 92.0,
      profitMarginPercentage: 51,
      planType: 'standard',
      tutorLevel: 'Expert',
      month: 'Monthly',
      interval: 'monthly',
      discountValue: 0,
      description: '4 Sessions/Month (Level 8-10) (Monthly Auto-Renewal)',
    },
    {
      type: 'Standard Membership',
      level: 'Junior',
      timePeriod: '4 Months',
      price: getPlanPrice('standard', 'Junior', '4_Months'),
      monthlyPayment: 140.0,
      sessionPrice: 35.0,
      payToETutors: 272.0,
      profitMargin: 288.0,
      profitMarginPercentage: 51,
      planType: 'standard',
      tutorLevel: 'Junior',
      month: '4_Months',
      interval: 'four_months',
      discountValue: 0,
      description: '4 Sessions/Month-(16-Sessions) (Level 1-3) (Every 4-Months Auto-Renewal)',
    },
    {
      type: 'Standard Membership',
      level: 'Senior',
      timePeriod: '4 Months',
      price: getPlanPrice('standard', 'Senior', '4_Months'),
      monthlyPayment: 160.0,
      sessionPrice: 40.0,
      payToETutors: 312.0,
      profitMargin: 328.0,
      profitMarginPercentage: 51,
      planType: 'standard',
      tutorLevel: 'Senior',
      month: '4_Months',
      interval: 'four_months',
      discountValue: 0,
      description: '4 Sessions/Month-(16-Sessions) (Level 4-7) (Every 4-Months Auto-Renewal)',
    },
    {
      type: 'Standard Membership',
      level: 'Expert',
      timePeriod: '4 Months',
      price: getPlanPrice('standard', 'Expert', '4_Months'),
      monthlyPayment: 180.0,
      sessionPrice: 45.0,
      payToETutors: 352.0,
      profitMargin: 368.0,
      profitMarginPercentage: 51,
      planType: 'standard',
      tutorLevel: 'Expert',
      month: '4_Months',
      interval: 'four_months',
      discountValue: 0,
      description: '4 Sessions/Month-(16-Sessions) (Level 8-10) (Every 4-Months Auto-Renewal)',
    },
    {
      type: 'Standard Membership',
      level: 'Junior',
      timePeriod: '9 Months',
      price: getPlanPrice('standard', 'Junior', '9_Months'),
      monthlyPayment: 140.0,
      sessionPrice: 35.0,
      payToETutors: 612.0,
      profitMargin: 648.0,
      profitMarginPercentage: 51,
      planType: 'standard',
      tutorLevel: 'Junior',
      month: '9_Months',
      interval: 'nine_months',
      discountValue: 0,
      description: '4 Sessions/Month-(36-Sessions) (Level 1-3) (Every 9-Months Auto-Renewal)',
    },
    {
      type: 'Standard Membership',
      level: 'Senior',
      timePeriod: '9 Months',
      price: getPlanPrice('standard', 'Senior', '9_Months'),
      monthlyPayment: 160.0,
      sessionPrice: 40.0,
      payToETutors: 696.0,
      profitMargin: 744.0,
      profitMarginPercentage: 51,
      planType: 'standard',
      tutorLevel: 'Senior',
      month: '9_Months',
      interval: 'nine_months',
      discountValue: 0,
      description: '4 Sessions/Month-(36-Sessions) (Level 4-7) (Every 9-Months Auto-Renewal)',
    },
    {
      type: 'Standard Membership',
      level: 'Expert',
      timePeriod: '9 Months',
      price: getPlanPrice('standard', 'Expert', '9_Months'),
      monthlyPayment: 180.0,
      sessionPrice: 45.0,
      payToETutors: 780.0,
      profitMargin: 840.0,
      profitMarginPercentage: 51,
      planType: 'standard',
      tutorLevel: 'Expert',
      month: '9_Months',
      interval: 'nine_months',
      discountValue: 0,
      description: '4 Sessions/Month-(36-Sessions) (Level 8-10) (Every 9-Months Auto-Renewal)',
    },
  ];
  const premiumplan: any = [
    {
      type: 'premium Membership',
      level: 'Junior',
      timePeriod: 'Monthly',
      price: getPlanPrice('premium', 'Junior', 'Monthly'),
      monthlyPayment: 140.0,
      sessionPrice: 35.0,
      payToETutors: 68.0,
      profitMargin: 72.0,
      profitMarginPercentage: 51,
      planType: 'premium',
      tutorLevel: 'Junior',
      month: 'Monthly',
      interval: 'monthly',
      discountValue: 0,
      description: '8 Sessions/Month (Level 1-3) (Monthly Auto-Renewal)',
    },
    {
      type: 'premium Membership',
      level: 'Senior',
      timePeriod: 'Monthly',
      price: getPlanPrice('premium', 'Senior', 'Monthly'),
      monthlyPayment: 160.0,
      sessionPrice: 40.0,
      payToETutors: 78.0,
      profitMargin: 82.0,
      profitMarginPercentage: 51,
      planType: 'premium',
      tutorLevel: 'Senior',
      month: 'Monthly',
      interval: 'monthly',
      discountValue: 0,
      description: '8 Sessions/Month (Level 4-7) (Monthly Auto-Renewal)',
    },
    {
      type: 'premium Membership',
      level: 'Expert',
      timePeriod: 'Monthly',
      price: getPlanPrice('premium', 'Expert', 'Monthly'),
      monthlyPayment: 180.0,
      sessionPrice: 45.0,
      payToETutors: 88.0,
      profitMargin: 92.0,
      profitMarginPercentage: 51,
      planType: 'premium',
      tutorLevel: 'Expert',
      month: 'Monthly',
      interval: 'monthly',
      discountValue: 0,
      description: '8 Sessions/Month (Level 8-10) (Monthly Auto-Renewal)',
    },
    {
      type: 'premium Membership',
      level: 'Junior',
      timePeriod: '4 Months',
      price: getPlanPrice('premium', 'Junior', '4_Months'),
      monthlyPayment: 140.0,
      sessionPrice: 35.0,
      payToETutors: 272.0,
      profitMargin: 288.0,
      profitMarginPercentage: 51,
      planType: 'premium',
      tutorLevel: 'Junior',
      month: '4_Months',
      interval: 'four_months',
      discountValue: 0,
      description: '8 Sessions/Month-(32-Sessions) (Level 1-3) (Every 4-Months Auto-Renewal)',
    },
    {
      type: 'premium Membership',
      level: 'Senior',
      timePeriod: '4 Months',
      price: getPlanPrice('premium', 'Senior', '4_Months'),
      monthlyPayment: 160.0,
      sessionPrice: 40.0,
      payToETutors: 312.0,
      profitMargin: 328.0,
      profitMarginPercentage: 51,
      planType: 'premium',
      tutorLevel: 'Senior',
      month: '4_Months',
      interval: 'four_months',
      discountValue: 0,
      description: '8 Sessions/Month-(32-Sessions) (Level 4-7) (Every 4-Months Auto-Renewal)',
    },
    {
      type: 'premium Membership',
      level: 'Expert',
      timePeriod: '4 Months',
      price: getPlanPrice('premium', 'Expert', '4_Months'),
      monthlyPayment: 180.0,
      sessionPrice: 45.0,
      payToETutors: 352.0,
      profitMargin: 368.0,
      profitMarginPercentage: 51,
      planType: 'premium',
      tutorLevel: 'Expert',
      month: '4_Months',
      interval: 'four_months',
      discountValue: 0,
      description: '8 Sessions/Month-(32-Sessions) (Level 8-10) (Every 4-Months Auto-Renewal)',
    },
    {
      type: 'premium Membership',
      level: 'Junior',
      timePeriod: '9 Months',
      price: getPlanPrice('premium', 'Junior', '9_Months'),
      monthlyPayment: 140.0,
      sessionPrice: 35.0,
      payToETutors: 612.0,
      profitMargin: 648.0,
      profitMarginPercentage: 51,
      planType: 'premium',
      tutorLevel: 'Junior',
      month: '9_Months',
      interval: 'nine_months',
      discountValue: 0,
      description: '8 Sessions/Month-(72-Sessions) (Level 1-3) (Every 9-Months Auto-Renewal)',
    },
    {
      type: 'premium Membership',
      level: 'Senior',
      timePeriod: '9 Months',
      price: getPlanPrice('premium', 'Senior', '9_Months'),
      monthlyPayment: 160.0,
      sessionPrice: 40.0,
      payToETutors: 696.0,
      profitMargin: 744.0,
      profitMarginPercentage: 51,
      planType: 'premium',
      tutorLevel: 'Senior',
      month: '9_Months',
      interval: 'nine_months',
      discountValue: 0,
      description: '8 Sessions/Month-(72-Sessions) (Level 4-7) (Every 9-Months Auto-Renewal)',
    },
    {
      type: 'premium Membership',
      level: 'Expert',
      timePeriod: '9 Months',
      price: getPlanPrice('premium', 'Expert', '9_Months'),
      monthlyPayment: 180.0,
      sessionPrice: 45.0,
      payToETutors: 780.0,
      profitMargin: 840.0,
      profitMarginPercentage: 51,
      planType: 'premium',
      tutorLevel: 'Expert',
      month: '9_Months',
      interval: 'nine_months',
      discountValue: 0,
      description: '8 Sessions/Month-(72-Sessions) (Level 8-10) (Every 9-Months Auto-Renewal)',
    },
  ];
  const payasyougo: any = [
    {
      type: 'Payasyougo Membership',
      level: 'Junior',
      timePeriod: '60mins',
      price: getPlanPrice('payasyougo', 'Junior'),
      monthlyPayment: 140.0,
      sessionPrice: 35.0,
      payToETutors: 68.0,
      profitMargin: 72.0,
      profitMarginPercentage: 51,
      planType: 'payasyougo',
      tutorLevel: 'Junior',
      month: null,
      interval: 'full',
      discountValue: 0,
      description: '1 Session / Junior',
    },
    {
      type: 'payasyougo Membership',
      level: 'Senior',
      timePeriod: '60mins',
      price: getPlanPrice('payasyougo', 'Senior'),
      monthlyPayment: 160.0,
      sessionPrice: 40.0,
      payToETutors: 78.0,
      profitMargin: 82.0,
      profitMarginPercentage: 51,
      planType: 'payasyougo',
      tutorLevel: 'Senior',
      month: null,
      interval: 'full',
      discountValue: 0,
      description: '1 Session / Senior',
    },
    {
      type: 'payasyougo Membership',
      level: 'Expert',
      timePeriod: '60mins',
      price: getPlanPrice('payasyougo', 'Expert'),
      monthlyPayment: 180.0,
      sessionPrice: 45.0,
      payToETutors: 88.0,
      profitMargin: 92.0,
      profitMarginPercentage: 51,
      planType: 'payasyougo',
      tutorLevel: 'Expert',
      month: null,
      interval: 'full',
      discountValue: 0,
      description: '1 Session / Expert',
    },
  ];
  const bundles: any = [
    {
      type: 'bundles Membership',
      level: 'Expert',
      timePeriod: '60mins',
      price: getBundlePrice('five_session_bundle'),
      monthlyPayment: 140.0,
      sessionPrice: 35.0,
      payToETutors: 68.0,
      profitMargin: 72.0,
      profitMarginPercentage: 51,
      planType: 'bundles',
      tutorLevel: 'Expert',
      month: 'Monthly',
      interval: 'full',
      discountValue: 0,
      bundles_session: 'five_session_bundle',
      description: '5 Sessions Bundles (Level 6-10 )',
    },
    {
      type: 'bundles Membership',
      level: 'Expert',
      timePeriod: '60mins',
      price: getBundlePrice('ten_session_bundle'),
      monthlyPayment: 160.0,
      sessionPrice: 40.0,
      payToETutors: 78.0,
      profitMargin: 82.0,
      profitMarginPercentage: 51,
      planType: 'bundles',
      tutorLevel: 'Expert',
      month: 'Monthly',
      interval: 'full',
      discountValue: 0,
      bundles_session: 'ten_session_bundle',
      description: '10 Sessions Bundles (Level 6-10 )',
    },
    {
      type: 'bundles Membership',
      level: 'Expert',
      timePeriod: '60mins',
      price: getBundlePrice('twenty_session_bundle'),
      monthlyPayment: 180.0,
      sessionPrice: 45.0,
      payToETutors: 88.0,
      profitMargin: 92.0,
      profitMarginPercentage: 51,
      planType: 'bundles',
      tutorLevel: 'Expert',
      month: 'Monthly',
      interval: 'full',
      discountValue: 0,
      bundles_session: 'twenty_session_bundle',
      description: '20 Sessions Bundles (Level 6-10 )',
    },
  ];
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [newPrice, setNewPrice] = useState<string | any>(null);
  const [selectedOption, setSelectedOption] = useState('standard');
  const [isOpen, setIsOpen] = useState(false);
  const [plans, setPlans] = useState(standardplan);

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setNewPrice(plans[index].price.toString());
  };

  const handleSave = async () => {
    if (editIndex !== null && newPrice !== null) {
      const updatedPlan = { ...plans[editIndex], price: newPrice };
      setPlans((prevPlans: any) =>
        prevPlans.map((plan: any, i: any) => (i === editIndex ? updatedPlan : plan))
      );

      // Call createOrUpdatePlan with required parameters
      await createOrUpdatePlan({
        planType: updatedPlan.planType,
        tutorLevel: updatedPlan.tutorLevel,
        newPriceAmount: updatedPlan.price,
        discountType: 'percentage',
        discountValue: null,
        description: updatedPlan.description,
        interval: updatedPlan.interval,
        month: updatedPlan.month,
        bundles_session: updatedPlan.bundles_session,
      });
    }
    setEditIndex(null);
    setNewPrice(null);
  };

  const createOrUpdatePlan = async ({
    planType,
    tutorLevel,
    newPriceAmount,
    discountValue,
    description,
    interval,
    month,
    bundles_session,
  }: any) => {
    try {
      // const response = await fetch(`/api/admin/update-price`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     planType: planType,
      //     tutorLevel: tutorLevel,
      //     newPriceAmount: Number(newPriceAmount) * 100,
      //     discountValue: discountValue || null,
      //     description: description || null,
      //     interval: interval,
      //     month: month,
      //     bundles_session: bundles_session || null,
      //   }),
      // });
      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(errorData.error || "Failed to update plan");
      // }
      // return response.json();
      return null;
    } catch (error) {
      console.error('Error updating membership plan:', error);
      throw error;
    }
  };

  const handleChange = (value: string) => {
    setNewPrice(value);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="px-16 py-12 bg-[#ede8fa] rounded-3xl w-full   mt-14">
      <div className="flex justify-between">
        <div className="relative   h-fit   w-full custom-xl:w-fit mt-1 ">
          <div
            className={`bg-[#a296cc] text-white  sm:text-sm pl-5 custom-lg:pl-10 pr-4 custom-lg:pr-8 py-2 custom-lg:py-4 text-xl transition-all duration-500 rounded-xl cursor-pointer select-none   flex items-center justify-between w-full custom-xl:w-[29.4rem] ${
              isOpen ? 'border  border-[#a394d6]' : 'border border-transparent'
            } `}
            onClick={toggleDropdown}
          >
            <span className="text-3xl font-medium  pl-3 capitalize">
              {selectedOption || 'Select Option'}
            </span>
            {isOpen ? <ChevronUp className="text-white" /> : <ChevronDown className="text-white" />}
          </div>

          {isOpen && (
            <div
              onMouseLeave={() => {
                setIsOpen(false);
              }}
              className="py-3 max-w-[97%] mx-auto w-full transition-all duration-500  absolute top-full left-0   bg-[#a296cc] border  border-[#9185c4] px-9 text-white text-xs sm:text-sm mt-2.5  ml-1.5 rounded-md shadow-lg z-10  h-fit"
            >
              <ul id="style-2" className=" overflow-y-auto max-h-[14rem] scrollstyle   ">
                {options.map(option => (
                  <li
                    onClick={() => {
                      setSelectedOption(option.label);
                      if (option.value === 'standard') {
                        setPlans(standardplan);
                      } else if (option.value === 'premium') {
                        setPlans(premiumplan);
                      } else if (option.value === 'payasyougo') {
                        setPlans(payasyougo);
                      } else if (option.value === 'bundles') {
                        setPlans(bundles);
                      }
                      setIsOpen(false);
                    }}
                    key={option.value}
                    className={` first:pb-3 first:pt-0 py-3 last:py-0 last:pt-3 cursor-pointer last:border-b-0 border-b border-white  text-white text-3xl max-w-[80%]   ${
                      selectedOption === option.value ? '' : ''
                    }`}
                  >
                    <span className="pl-1 ">{option.label}</span>
                  </li>
                  // <div className="border-b border-[#8f81c7] w-full"></div>
                ))}
              </ul>
              <div></div>
              <style jsx>{`
                #style-2::-webkit-scrollbar-track {
                  border-radius: 10px;
                  background-color: #c9bbef;
                }

                #style-2::-webkit-scrollbar {
                  width: 5px;
                  background-color: transparent;
                }

                #style-2::-webkit-scrollbar-thumb {
                  border-radius: 10px;

                  background-color: #8f81c7;
                }
              `}</style>
            </div>
          )}
        </div>
        <div>
          {editIndex != null && (
            <button
              onClick={() => {
                setEditIndex(null);
                setNewPrice(null);
              }}
              className="font-medium text-2xl px-6 py-3 rounded-md bg-[#FC7777] text-white "
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="mt-12 overflow-x-auto">
        <div className="p-3 text-[#685AAD] text-xl  grid grid-cols-7  min-w-[80rem]">
          <span>Membership Plan</span>
          <span>Price</span>
          <span>Monthly Payment</span>
          <span>Session Price</span>
          <span>Pay to eTutors</span>
          <span>Profit Margin</span>
          {/* <span>Profit Margin %</span> */}
          <span>Action</span>
        </div>
        <div className="flex flex-col gap-4 min-w-[80rem] ">
          {plans?.map((plan: any, index: any) => (
            <div
              key={index}
              className="grid grid-cols-7 gap-x-2 items-center bg-[#a296cc] text-white px-6  py-3   custom-xl:py-5 rounded-2xl my-1"
            >
              <div className="flex gap-4  text-2xl leading-tight  text-white">
                {plan.planType === 'bundles' ? (
                  <div>
                    {plan.bundles_session === 'five_session_bundle'
                      ? '5-Session Bundle'
                      : plan.bundles_session === 'ten_session_bundle'
                        ? '10-Session Bundle'
                        : plan.bundles_session === 'twenty_session_bundle'
                          ? '20-Session bundle'
                          : ''}
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col">
                      <span className="font-medium">{plan.level}</span>
                      <small className="text-lg">eTutor lvl</small>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium">{plan.timePeriod}</span>
                      <small className="text-lg">Time Period</small>
                    </div>
                  </>
                )}
              </div>

              <div className="bg-[#ede8fa] text-[#685AAD] font-medium text-2xl px-4 py-4 rounded-md">
                {editIndex === index ? (
                  <input
                    type="number"
                    value={newPrice}
                    onChange={e => handleChange(e.target.value)}
                    className="w-[100%] bg-[#ede8fa] text-[#685AAD] ring-0 outline-none"
                  />
                ) : (
                  <span className="">${plan.price}.00</span>
                )}
              </div>
              <span className="bg-[#ede8fa] text-[#685AAD] font-medium text-2xl px-4 py-4 rounded-md">
                00
              </span>
              <span className="bg-[#ede8fa] text-[#685AAD] font-medium text-2xl px-4 py-4 rounded-md">
                00
              </span>
              <span className="bg-[#ede8fa] text-[#685AAD] font-medium text-2xl px-4 py-4 rounded-md">
                00
              </span>
              <span className="bg-[#ede8fa] text-[#685AAD] font-medium text-2xl px-4 py-4 rounded-md">
                00
              </span>
              {/* <span className="bg-[#ede8fa] text-purple-800 font-bold px-3 py-1 rounded-md">
                00aaa
              </span> */}

              <button
                onClick={() => {
                  editIndex === index ? handleSave() : handleEdit(index);
                }}
                className={` font-medium text-2xl px-4 py-4  rounded-md ${
                  editIndex === index ? 'bg-[#685AAD]' : 'bg-[#FC7777]'
                } `}
              >
                {editIndex === index ? 'Save' : 'Edit'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MembershipPlans;
