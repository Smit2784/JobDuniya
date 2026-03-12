import React from "react";

const Stepper = ({ steps = [], activeStep = 0 }) => {

    // Ensure activeStep is within bounds
    const safeActiveStep = Math.max(0, Math.min(activeStep, steps.length - 1));

    return (
        <div className="w-full flex items-center justify-center px-4 py-4">
            <div className="flex w-full items-center justify-between relative max-w-2xl">
                {/* Progress Bar Background */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 -z-10 rounded-full"></div>

                {/* Progress Bar Fill */}
                <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#23A6F0] -z-10 transition-all duration-300 ease-in-out rounded-full"
                    style={{
                        width: `${(safeActiveStep / (steps.length - 1)) * 100}%`,
                    }}
                ></div>

                {steps.map((step, index) => {
                    const isCompleted = index < safeActiveStep;
                    const isActive = index === safeActiveStep;

                    return (
                        <div
                            key={index}
                            className="flex flex-col items-center relative"
                        >
                            <div
                                className={`
                                    w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 z-10
                                    ${
                                        isCompleted
                                            ? "border-[#23A6F0] bg-[#23A6F0] text-white"
                                            : isActive
                                              ? "border-[#23A6F0] bg-white text-[#23A6F0]"
                                              : "border-gray-300 bg-white text-gray-400"
                                    }
                                `}
                            >
                                {isCompleted ? (
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 13l4 4L19 7"
                                        ></path>
                                    </svg>
                                ) : (
                                    <span className="text-sm font-semibold">
                                        {index + 1}
                                    </span>
                                )}
                            </div>
                            {step.label && (
                                <div
                                    className={`
                                    absolute top-10 text-xs font-medium whitespace-nowrap transition-colors duration-300
                                    ${isActive || isCompleted ? "text-[#23A6F0]" : "text-gray-400"}
                                `}
                                >
                                    {step.label}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Stepper;
