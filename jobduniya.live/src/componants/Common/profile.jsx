import React, { useCallback, useEffect, useState } from "react";
// import css from "../../Style/profile.module.css";
import { Link } from "react-router-dom";
import BasicInfo from "../Profile/BasicInfo";
import Skills from "../Profile/Skills";
import SensetiveInfo from "../Profile/SensetiveInfo";
import EditProfile from "../Profile/Apply";
import GlobalModel from "../../Global/GlobalModel";
import EditProfileForm from "../Profile/EditProfileForm";
import DataContainer from "../Profile/DataContainer";
import Education from "../Profile/Education";
import Experience from "../Profile/Experience";
import Peoples from "../Profile/Peoples";
import { createContext } from "react";
import useAPI from "../../Hooks/USER/useAPI";
import Cookies from "js-cookie";
import Saved from "./Boxes";

const ToggleEdit = createContext();
const ToggleEducation = createContext();
const ToggleExperience = createContext();
const TogglePeoples = createContext();
const Profile = () => {
    const api = useAPI();

    const [isEditProfile, setIsEditProfile] = useState(false);
    const [screen, setScreen] = useState("education");
    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState([]);
    const [location, setLocation] = useState([]);
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [ln, setLn] = useState("");
    const [lnc, setLnc] = useState("");
    const id = Cookies.get("id");

    const call = useCallback(async () => {
        const currentId = Cookies.get("id");
        if (!currentId || currentId === "null" || currentId === "undefined")
            return;

        const data = await api.getREQUEST(`profile/${currentId}`);
        if (data[0]) {
            setProfile(data[0]);
        }

        const users = await api.getREQUEST(`getFollowings/${currentId}`);
        // console.log(users);
        setLn(users[0]?.targetId?.length);
        const com = await api.getREQUEST(`fetchConnectedCompany/${currentId}`);
        console.log(com);
        setLnc(com[0]?.targetId?.length);
        // if (data[0]) {
        //     setProfile(data[0]);
        //     setLocation(data[0].location[0])
        //     console.log(data);
        //     // console.log(location);
        // }
    }, []);
    // console.log(profile.experience[0]);

    const User = useCallback(async () => {
        setLocation(profile.location);
        console.log(location);
        setCity(location[0].city);
        setState(location[0].state);
        console.log("city : ", city, " state : ", state);
        const users = await api.getREQUEST(
            `getUser?userId=${id}&city=${city}&state=${state}`,
        );
        if (users) {
            setUser(users);
        } else {
            console.log("User not found");
        }
    }, []);

    useEffect(() => {
        call();
        // User();
        // console.log(user);
    }, []);

    return (
        <ToggleEdit.Provider value={[isEditProfile, setIsEditProfile]}>
            <>
                {isEditProfile ? (
                    <GlobalModel modelName={<EditProfileForm />} />
                ) : (
                    ""
                )}
                <section className="bg-slate-50/50 min-h-screen py-10 relative overflow-hidden">
                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 left-0 w-full h-96 bg-linear-to-b from-blue-100/50 to-transparent pointer-events-none"></div>
                    <div className="absolute top-20 right-20 w-96 h-96 bg-purple-300/20 rounded-full blur-[100px] pointer-events-none"></div>
                    <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-300/20 rounded-full blur-[100px] pointer-events-none"></div>

                    <div className="container mx-auto px-4 relative z-10 max-w-7xl">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
                                <div className="w-2 h-8 bg-linear-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                                Premium Profile
                            </h2>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Left Column */}
                            <div className="w-full lg:w-1/3 flex flex-col gap-8">
                                <BasicInfo
                                    firstName={profile.firstName}
                                    lastName={profile.lastName}
                                    description={profile.description}
                                    profileImage={profile.profileImage}
                                    profession={profile.profession}
                                    city={
                                        profile.location &&
                                        profile?.location[0]?.city
                                    }
                                    state={
                                        profile.location &&
                                        profile?.location[0]?.state
                                    }
                                />
                                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 overflow-hidden relative group">
                                    <div className="p-6 border-b border-slate-100/80">
                                        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                            <i className="fa-solid fa-bolt text-amber-500"></i>{" "}
                                            Core Skills
                                        </h3>
                                    </div>
                                    <Skills data={profile && profile?.skills} />
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="w-full lg:w-2/3 flex flex-col gap-8">
                                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 overflow-hidden">
                                    <SensetiveInfo
                                        ln={ln}
                                        lnc={lnc}
                                        personalAddress={
                                            profile.location &&
                                            profile.location[0].personalAddress
                                        }
                                        langauge={profile.langauges}
                                    />
                                </div>

                                {/* Tabs and Content Area */}
                                <div className="flex flex-col">
                                    {/* Premium Tabs */}
                                    <div className="flex justify-center gap-4 mb-3">
                                        <button
                                            className={`px-6 py-3 font-bold text-sm transition-all rounded-xl flex items-center gap-2 ${
                                                screen === "education"
                                                    ? "bg-blue-500 text-white shadow-[0_8px_20px_rgb(59,130,246,0.3)] scale-105"
                                                    : "bg-white/60 text-slate-600 hover:bg-white hover:text-blue-600 hover:shadow-md"
                                            }`}
                                            onClick={() =>
                                                setScreen("education")
                                            }
                                        >
                                            <i className="fa-solid fa-graduation-cap"></i>
                                            Education History
                                        </button>
                                        <button
                                            className={`px-6 py-3 font-bold text-sm transition-all rounded-xl flex items-center gap-2 ${
                                                screen === "experience"
                                                    ? "bg-indigo-500 text-white shadow-[0_8px_20px_rgb(99,102,241,0.3)] scale-105"
                                                    : "bg-white/60 text-slate-600 hover:bg-white hover:text-indigo-600 hover:shadow-md"
                                            }`}
                                            onClick={() =>
                                                setScreen("experience")
                                            }
                                        >
                                            <i className="fa-solid fa-briefcase"></i>
                                            Work Experience
                                        </button>
                                    </div>

                                    {/* Timeline Content Container */}
                                    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 p-8 min-h-[300px] transition-all duration-500">
                                        {screen === "education" ? (
                                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                                <Education
                                                    univercity={
                                                        profile.education &&
                                                        profile?.education[0]
                                                            ?.univercity
                                                    }
                                                    school={
                                                        profile.education &&
                                                        profile?.education[0]
                                                            ?.school
                                                    }
                                                    institutionName={
                                                        profile.education &&
                                                        profile?.education[0]
                                                            ?.institutionName
                                                    }
                                                    degreeLevel={
                                                        profile.education &&
                                                        profile?.education[0]
                                                            ?.degreeLevel
                                                    }
                                                    startDateSchool={
                                                        profile.education &&
                                                        profile?.education[0]
                                                            ?.startDateSchool
                                                    }
                                                    endDateSchool={
                                                        profile.education &&
                                                        profile?.education[0]
                                                            ?.endDateSchool
                                                    }
                                                    gpa={
                                                        profile.education &&
                                                        profile?.education[0]
                                                            ?.gpa
                                                    }
                                                    certifications={
                                                        profile.education &&
                                                        profile?.education[0]
                                                            ?.certifications
                                                    }
                                                />
                                            </div>
                                        ) : (
                                            ""
                                        )}

                                        {screen === "experience" ? (
                                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                                <Experience
                                                    userType={
                                                        profile.experience &&
                                                        profile?.experience[0]
                                                            ?.userType
                                                    }
                                                    jobTitle={
                                                        profile.experience &&
                                                        profile?.experience[0]
                                                            ?.jobTitle
                                                    }
                                                    companyName={
                                                        profile.experience &&
                                                        profile?.experience[0]
                                                            ?.companyName
                                                    }
                                                    startDateWork={
                                                        profile.experience &&
                                                        profile?.experience[0]
                                                            ?.startDateWork
                                                    }
                                                    endDateWork={
                                                        profile.experience &&
                                                        profile?.experience[0]
                                                            ?.endDateWork
                                                    }
                                                    responsibilities={
                                                        profile.experience &&
                                                        profile?.experience[0]
                                                            ?.responsibilities
                                                    }
                                                    achievements={
                                                        profile.experience &&
                                                        profile?.experience[0]
                                                            ?.achievements
                                                    }
                                                />
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        </ToggleEdit.Provider>
    );
};

export default Profile;
export { ToggleEdit, ToggleEducation, ToggleExperience, TogglePeoples };
