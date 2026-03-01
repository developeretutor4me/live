'use client';
import React, { useEffect, useRef, useState } from 'react';

const Stepper = ({ steps, currentStep }: any) => {
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
    const stepsState = steps.map((step: any, index: number) =>
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
      <div key={index} className="w-full flex items-center">
        <div className="relative flex flex-col items-center">
          <div className="rounded-full transition duration-500 ease-in-out border-2 border-gray-300 h-12 w-12 flex items-center justify-center py-3">
            {/* Numbers */}
            {index + 1}
          </div>
          <div className="absolute top-0 text-center mt-16 w-16 text-xs">
            {/* Description */}
            {
              // @ts-ignore
              step.description
            }
          </div>
        </div>
        {index !== newStep.length - 1 && <div className="flex-auto border-t-2 ">{/* Line */}</div>}
      </div>
    );
  });

  return <div className="flex flex-col justify-between items-center">{displaySteps}</div>;
};

export default Stepper;
