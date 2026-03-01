'use client';
import React, { useEffect, useRef, useState } from 'react';

interface stepper {
  steps: any;
  currentStep: any;
  step: {
    selected: any;
    description: any;
  };
}

const Stepper: React.FC<stepper> = ({ steps, currentStep }) => {
  const [newStep, setNewStep] = useState([]);
  const stepRef = useRef();

  const updateStep = (stepNumber: any, steps: any) => {
    const updatedSteps = [...steps];

    for (let i = 0; i < updatedSteps.length; i++) {
      if (i === stepNumber) {
        updatedSteps[i] = {
          ...updatedSteps[i],
          highlighted: true,
          selected: true,
          completed: false,
        };
      } else if (i < stepNumber) {
        updatedSteps[i] = {
          ...updatedSteps[i],
          highlighted: false,
          selected: false,
          completed: true,
        };
      } else {
        updatedSteps[i] = {
          ...updatedSteps[i],
          highlighted: false,
          selected: false,
          completed: false,
        };
      }
    }
    return updatedSteps;
  };

  useEffect(() => {
    const stepsState = steps.map((step: any, index: any) =>
      Object.assign(
        {},
        {
          description: step,
          completed: false,
          highlighted: index === 0 ? true : false,
          selected: index === 0 ? true : false,
        }
      )
    );
    stepRef.current = stepsState;
    const current = updateStep(currentStep - 1, stepRef.current);
    // @ts-ignore
    setNewStep(current);
  }, [steps, currentStep]);

  const displaySteps = newStep.map((step, index) => {
    return (
      <div
        key={index}
        className={`relative flex w-full 
                ${
                  index === 0
                    ? 'justify-start'
                    : index === newStep.length - 1
                      ? 'items-end'
                      : 'items-center'
                }`}
      >
        {/* Line Column */}
        <div className="flex flex-col items-center relative">
          {/* Line Above Circle */}
          {index > 0 && (
            <div className={`w-2 ${index < currentStep ? 'bg-customBlue' : 'bg-[#C3BAF3]'} h-16`} />
          )}
          {/* Step Circle */}
          <div
            className={`rounded-full transition duration-500 ease-in-out border-[6px] h-7 w-7 flex items-center justify-center ${
              // @ts-ignore
              step.completed
                ? 'bg-white border-customBlue'
                : // @ts-ignore
                  step.selected
                  ? 'bg-customBlue border-customBlue'
                  : 'bg-[#C3BAF3] border-[#C3BAF3]'
            }`}
          >
            {/* Empty circle */}
          </div>
          {/* Line Below Circle */}
          {index < newStep.length - 1 && (
            <div
              className={`w-2 ${index < currentStep - 1 ? 'bg-customBlue' : 'bg-[#C3BAF3]'} h-16`}
            />
          )}
        </div>

        {/* Content Column */}
        <div
          className={`ml-11 flex flex-col  justify-start items-start
                    ${
                      index === 0
                        ? 'items-start'
                        : index === newStep.length - 1
                          ? 'items-start justify-start'
                          : 'items-start'
                    }`}
        >
          <div
            className={`text-3xl text-[#534988] ${
              // @ts-ignore
              step.selected ? 'text-[#534988] ' : 'text-[#A9A4C3] '
            } font-semibold`}
          >
            {
              // @ts-ignore
              step.description
            }
          </div>
          <div
            className={`text-xl text-start  ${
              // @ts-ignore
              step.completed ? 'text-[#A8A3C3]' : 'text-[#534988] '
            }`}
          >
            {
              // @ts-ignore
              step.completed ? 'Completed' : step.selected ? 'In Progress' : ''
            }
          </div>
        </div>
      </div>
    );
  });

  return <div className="relative flex flex-col justify-start items-start">{displaySteps}</div>;
};

export default Stepper;
