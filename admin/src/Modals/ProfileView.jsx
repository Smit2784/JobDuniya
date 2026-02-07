import Modal from "../render-model/Modal";

import { GlobalState } from "../main";
import react, { useContext, useState } from "react";

const Body = ({ onClose, style, hidden, setValue, filteredData }) => {
    const [currentState, setCurrentState] = useContext(GlobalState);
    const [hide, setHide] = useState([]);
    const [data1, setData1] = useState(filteredData[0]);
    const [data2, setData2] = useState(filteredData[1]);
    const [data3, setData3] = useState(filteredData[2]);
    const [data4, setData4] = useState(filteredData[3]);

    const handleHide = (key) => {
        setValue((prev) => {
            if (hide.includes(key)) {
                return hide.filter((e) => e !== key);
            } else {
                return [...prev, key];
            }
        });
        setHide((prev) => {
            if (hide.includes(key)) {
                return hide.filter((e) => e !== key);
            } else {
                return [...prev, key];
            }
        });
    };

    const sections = [
        {
            key: "PersonalDetails",
            title: "Personal Details",
            data: data1,
            icon: "fa-user",
            color: "text-blue-600",
            bg: "bg-blue-50",
        },
        {
            key: "LocationDetails",
            title: "Location Details",
            data: data2,
            icon: "fa-location-dot",
            color: "text-emerald-600",
            bg: "bg-emerald-50",
        },
        {
            key: "HRDetails",
            title: "HR Details",
            data: data3,
            icon: "fa-briefcase",
            color: "text-violet-600",
            bg: "bg-violet-50",
        },
        {
            key: "OwnerDetails",
            title: "Owner Details",
            data: data4,
            icon: "fa-crown",
            color: "text-amber-600",
            bg: "bg-amber-50",
        },
    ];

    return (
        <div className="w-full ml-0 max-w-full max-h-[85vh] overflow-hidden bg-slate-50 rounded-xl shadow-2xl font-sans flex flex-col mt-4 border border-slate-200/60 max-[900px]:w-[90%] max-[900px]:max-h-[90vh] max-[600px]:w-[95%] max-[600px]:max-h-[95vh]">
            {/* SaaS Header Style */}
            <div className="relative bg-white border-b border-slate-100 pb-0 z-10">
                {/* Decorative Strip */}
                <div className="h-32 bg-gradient-to-r from-slate-800 to-slate-900 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                    <div className="absolute right-0 bottom-0 p-8 opacity-10">
                        <i className="fa-solid fa-cube text-8xl text-white"></i>
                    </div>
                </div>

                {/* Close Button */}
                {!hidden && (
                    <button
                        className="absolute top-4 right-4 bg-white/20 backdrop-blur-md border border-white/20 text-white w-9 h-9 rounded-full cursor-pointer flex items-center justify-center transition-all duration-200 hover:bg-white/30 z-20"
                        onClick={onClose}
                    >
                        <i className="fa fa-times"></i>
                    </button>
                )}

                <div className="px-8 pb-6 flex items-end gap-6 relative z-10 max-[700px]:flex-col max-[700px]:items-center">
                    <div className="relative group -mt-12">
                        <div className="absolute -inset-1 bg-white rounded-full opacity-20 group-hover:opacity-40 transition duration-500"></div>
                        <img
                            src={currentState.Logo}
                            onError={(e) =>
                                (e.target.src =
                                    "https://i.pinimg.com/originals/ec/d9/c2/ecd9c2e8ed0dbbc96ac472a965e4afda.jpg")
                            }
                            alt="Profile"
                            className="w-24 h-24 rounded-full border-4 border-white shadow-lg bg-white object-cover relative z-10"
                        />
                        <div
                            className="absolute bottom-1 right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-white z-20"
                            title="Active"
                        ></div>
                    </div>

                    <div className="flex-1 mb-2 max-[700px]:text-center max-[700px]:mb-0">
                        <h2 className="text-2xl font-bold text-slate-800 m-0">
                            {currentState?.Name}
                        </h2>
                        <div className="flex items-center gap-2 mt-1 text-slate-500 text-sm max-[700px]:justify-center">
                            <span className="bg-slate-100 px-2 py-0.5 rounded text-xs font-medium uppercase tracking-wide border border-slate-200">
                                Company
                            </span>
                            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                            <span>{currentState.Email}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid Content Section */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin hover:scrollbar-thumb-slate-300 scrollbar-thumb-slate-200 scrollbar-track-transparent">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {sections.map((section) => (
                        <div
                            key={section.key}
                            className="bg-white rounded-xl border border-slate-200 shadow-[0_2px_4px_rgba(0,0,0,0.02)] overflow-hidden hover:shadow-[0_8px_16px_rgba(0,0,0,0.04)] hover:border-slate-300 transition-all duration-300 flex flex-col h-fit"
                        >
                            {/* Card Header */}
                            <div className="p-4 flex items-center justify-between border-b border-slate-100 bg-white">
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`w-8 h-8 rounded-lg ${section.bg} ${section.color} flex items-center justify-center`}
                                    >
                                        <i
                                            className={`fa ${section.icon} text-sm`}
                                        ></i>
                                    </div>
                                    <h3 className="text-sm font-semibold text-slate-700 m-0 tracking-wide">
                                        {section.title}
                                    </h3>
                                </div>
                                <button
                                    className={`w-7 h-7 flex items-center justify-center rounded-md hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-all duration-200 border-none cursor-pointer ${hide.includes(section.key) ? "rotate-180 bg-slate-50 text-slate-600" : ""}`}
                                    onClick={() => handleHide(section.key)}
                                >
                                    <i className="fa-solid fa-chevron-up text-xs"></i>
                                </button>
                            </div>

                            {/* Card Body */}
                            <div
                                className={`transition-all duration-300 ease-in-out ${
                                    hide.includes(section.key)
                                        ? "max-h-0 opacity-0 overflow-hidden"
                                        : "max-h-[1000px] opacity-100"
                                }`}
                            >
                                <div className="p-4 flex flex-col gap-3">
                                    {section.data.map(([key, value]) => (
                                        <div
                                            key={key}
                                            className="flex flex-col gap-1 pb-3 border-b border-slate-50 last:border-0 last:pb-0"
                                        >
                                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                                {key
                                                    .replace(/([A-Z])/g, " $1")
                                                    .trim()}
                                            </div>
                                            <div className="text-sm text-slate-700 font-medium break-words leading-snug">
                                                {value && value.length > 0 ? (
                                                    Array.isArray(value) ? (
                                                        value.join(", ")
                                                    ) : (
                                                        value
                                                    )
                                                ) : (
                                                    <span className="text-slate-300 text-xs italic">
                                                        Not set
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer Status Bar */}
            <div className="bg-slate-50 border-t border-slate-200 p-3 px-6 text-xs text-slate-400 flex justify-between items-center rounded-b-xl">
                {/* <span>Last updated recently</span> */}
                <span></span>
                <div className="flex gap-2">
                    <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                    <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                </div>
            </div>
        </div>
    );
};

const ProfileView = ({ onClose }) => {
    const [tmp, setTmp] = useState([]);
    return <Modal body={<Body onClose={onClose} setValue={setTmp} />} />;
};

export default ProfileView;
export { Body };
