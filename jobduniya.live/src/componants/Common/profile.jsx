import React, { useCallback, useEffect, useState } from "react";
// import css from "../../Style/profile.module.css";
import { Link } from "react-router-dom";
import BasicInfo from "../Profile/BasicInfo";
import Title from "../Profile/Title";
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
                <section className="bg-slate-50 min-h-screen py-8">
                    <div className="container mx-auto px-4">
                        <Title title={"User Profile"} />
                        <div className="flex flex-col lg:flex-row gap-6">
                            <div className="w-full lg:w-1/3 flex flex-col gap-6">
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
                                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                                    <Skills data={profile && profile?.skills} />
                                </div>
                            </div>
                            <div className="w-full lg:w-2/3 flex flex-col gap-6">
                                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
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
                                <div className="flex border-b justify-center gap-10 border-slate-200 bg-white rounded-t-xl px-4 pt-2 shadow-sm">
                                    <button
                                        className={`px-6 py-3 font-semibold text-sm transition-all border-b-2 ${
                                            screen === "education"
                                                ? "border-blue-500 text-blue-600"
                                                : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                                        }`}
                                        onClick={() => setScreen("education")}
                                    >
                                        <i className="fa-solid fa-graduation-cap me-2"></i>
                                        Education
                                    </button>
                                    <button
                                        className={`px-6 py-3 font-semibold text-sm transition-all border-b-2 ${
                                            screen === "experience"
                                                ? "border-blue-500 text-blue-600"
                                                : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                                        }`}
                                        onClick={() => setScreen("experience")}
                                    >
                                        <i className="fa-solid fa-briefcase me-2"></i>
                                        Experience
                                    </button>
                                    {/* <button
                                        className={`px-6 py-3 font-semibold text-sm transition-all border-b-2 ${
                                            screen === "peoples"
                                                ? "border-blue-500 text-blue-600"
                                                : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                                        }`}
                                        onClick={() => setScreen("peoples")}
                                    >
                                        <i className="fa-solid fa-users me-2"></i>
                                        People
                                    </button> */}
                                </div>

                                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 min-h-[200px]">
                                    {screen === "education" ? (
                                        <div className="pl-4 border-l-2 border-slate-100 space-y-8">
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
                                                    profile?.education[0]?.gpa
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
                                        <div className="pl-4 border-l-2 border-slate-100 space-y-8">
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
                                    {/* 
                                    {screen === "peoples" ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {user &&
                                                user.map((e) => {
                                                    return (
                                                        <Peoples
                                                            key={
                                                                e._id ||
                                                                Math.random()
                                                            }
                                                            profileImage={
                                                                e.profileImage
                                                            }
                                                            firstName={
                                                                e.firstName
                                                            }
                                                            lastName={
                                                                e.lastName
                                                            }
                                                            profession={
                                                                e.profession
                                                            }
                                                            city={
                                                                e.location &&
                                                                e?.location[0]
                                                                    ?.city
                                                            }
                                                            state={
                                                                e.location &&
                                                                e?.location[0]
                                                                    ?.state
                                                            }
                                                        />
                                                    );
                                                })}
                                        </div>
                                    ) : (
                                        ""
                                    )} */}
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
