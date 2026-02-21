import { useContext, useState, useEffect } from "react";

import Lottie from "lottie-react";
import searchjson from "../../assets/search.json";
import JobCard from "./JobCard";
import applications from "../../assets/applications.json";
import send from "../../assets/send.json";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Footer from "./Footer";
import { EnableSpinner } from "../..";
import useAPI from "../../Hooks/USER/useAPI";
import { useNavigate } from "react-router-dom";
import GlobalModel from "../../Global/GlobalModel";
import ViewJob from "./viewJob";
import Cookies from "js-cookie";
const Home = ({ setModell }) => {
    const [data, setData] = useState("");
    const [imgLoading, setImgLoading] = useState(true);
    const setSpinner = useContext(EnableSpinner);
    const item = localStorage.getItem("data");
    const api = useAPI();
    const [jobs, setJobs] = useState([]);
    const [feedback, setFeedback] = useState();
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const call = async () => {
        const data = await api.getREQUEST("fetchAll/jobs/10/0");
        setJobs(data);
    };
    useEffect(() => {
        call();
    }, []);
    // console.log(jobs);
    // console.log(feedback , email);
    const handleSubmit = async () => {
        const userId = Cookies.get("id");
        const response = await api.postREQUEST(
            "feedback",
            JSON.stringify({ userId, feedback }),
        );
        if (response.success) {
            console.log(response.message);
        } else {
            console.log(response.message);
        }
    };

    const handleNavigateToJobs = () => {
        navigate("/jobs");
    };

    return (
        <>
            {/* { Check() &&  */}
            <>
                <div className="w-full overflow-scroll h-[calc(100vh-100px)]">
                    <section className="w-full min-h-screen flex flex-col justify-start items-center bg-linear-to-br from-[#f0f9ff] to-[#e0f2fe] pt-20 overflow-hidden">
                        <header className="w-full max-w-7xl flex items-center justify-between p-6 sm:p-10 flex-wrap gap-10">
                            <div className="flex-1 min-w-[300px] flex flex-col gap-6 sm:items-center">
                                <div className="inline-flex items-center gap-3 px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20 w-fit backdrop-blur-sm">
                                    <span className="bg-blue-500 text-white px-2.5 py-1 rounded-full text-xs font-bold uppercase">
                                        NEW
                                    </span>
                                    <span className="text-blue-500 font-medium text-sm">
                                        stay connected to get upcoming jobs
                                    </span>
                                </div>
                                <span className="font-extrabold text-5xl sm:text-7xl leading-tight bg-linear-to-br from-slate-900 to-blue-500 bg-clip-text text-transparent text-left sm:text-center">
                                    Fast and most existing jobs in india
                                </span>
                            </div>
                            <div className="flex-1 min-w-[300px] flex justify-center items-center">
                                <img
                                    src={
                                        "https://firebasestorage.googleapis.com/v0/b/jobduniya-ec494.appspot.com/o/home.jpg?alt=media&token=f250c6fd-124c-4f05-9ceb-37b03a276a55"
                                    }
                                    alt=""
                                    sizes="1"
                                    className="w-full max-w-[550px] rounded-3xl shadow-[0_20px_40px_-10px_rgba(59,130,246,0.2)] transform perspective-[1000px] -rotate-y-1 hover:rotate-y-0 transition-transform duration-300"
                                    srcset=""
                                    loading="lazy"
                                />
                            </div>
                        </header>
                        <div className="w-full max-w-7xl px-6 py-10 sm:pb-20">
                            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 w-full">
                                <div className="bg-white p-8 rounded-3xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] border border-slate-200/60 flex flex-col justify-between h-full min-h-[480px] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] hover:border-blue-200">
                                    <p className="text-2xl font-bold text-slate-800 mb-4 leading-snug">
                                        Unlock Your Potential: Find Your Dream
                                        with our job portal Today!
                                    </p>
                                    <p className="text-base text-slate-500 leading-relaxed mb-auto">
                                        - Empower job seekers to discover
                                        fulfilling career opportunities tailored
                                        to their skills and aspirations.
                                    </p>
                                    <div className="w-full h-[200px] mt-6">
                                        <Lottie
                                            animationData={searchjson}
                                            loop={true}
                                            style={{
                                                height: "100%",
                                                width: "100%",
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="bg-white p-8 rounded-3xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] border border-slate-200/60 flex flex-col justify-between h-full min-h-[480px] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] hover:border-blue-200">
                                    <p className="text-2xl font-bold text-slate-800 mb-4 leading-snug">
                                        Your Gateway to Success: Explore Endless
                                        Career Possibilities!
                                    </p>
                                    <p className="text-base text-slate-500 leading-relaxed mb-auto">
                                        - Invite users to explore a diverse
                                        range of job listings and take the first
                                        step towards achieving their
                                        professional goals.
                                    </p>
                                    <div className="w-full h-[200px] mt-6">
                                        <a href="#">
                                            <Lottie
                                                animationData={send}
                                                loop={true}
                                                style={{
                                                    height: "100%",
                                                    width: "100%",
                                                }}
                                            />
                                        </a>
                                    </div>
                                </div>
                                <div className="bg-white p-8 rounded-3xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] border border-slate-200/60 flex flex-col justify-between h-full min-h-[480px] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] hover:border-blue-200">
                                    <p className="text-2xl font-bold text-slate-800 mb-4 leading-snug">
                                        Start Your Journey Here: Connect with
                                        Top Employers within India!
                                    </p>
                                    <p className="text-base text-slate-500 leading-relaxed mb-auto">
                                        - Highlight the platform's capability to
                                        connect talented individuals with
                                        leading companies, fostering mutually
                                        beneficial career partnerships.
                                    </p>
                                    <div className="w-full h-[200px] mt-6">
                                        <Lottie
                                            animationData={applications}
                                            loop={true}
                                            style={{
                                                height: "100%",
                                                width: "100%",
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="w-full px-6 py-20 bg-slate-50 flex flex-col items-center">
                        <div className="w-full max-w-7xl flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6 flex-wrap">
                            <div className="max-w-[600px]">
                                <span className="text-4xl font-extrabold mb-4 bg-linear-to-br from-slate-900 to-blue-500 bg-clip-text text-transparent block">
                                    Explore the letest jobs openings
                                </span>
                                <p className="text-lg text-slate-500 leading-relaxed">
                                    Welcome to our job portal, where endless
                                    possibilities await you! We are thrilled to
                                    announce a plethora of new job openings
                                    across diverse industries and roles, all
                                    curated to match your unique skills and
                                    aspirations.
                                </p>
                            </div>
                            <div className="flex-1 flex justify-center items-center mt-4 md:mt-0">
                                <button
                                    onClick={handleNavigateToJobs}
                                    className={`cursor-pointer bg-blue-600 text-white border-none px-8 py-3.5 text-base font-semibold rounded-full transition-all duration-300 shadow-[0_4px_6px_-1px_rgba(37,99,235,0.3)] relative overflow-hidden hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-[0_10px_15px_-3px_rgba(37,99,235,0.4)]`}
                                >
                                    See all jobs
                                    <div className="absolute inset-0 bg-white/20 translate-y-full hover:translate-y-0 transition-transform duration-300">
                                        <div></div>
                                    </div>
                                </button>
                            </div>
                        </div>
                        <section className="w-full max-w-7xl grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6">
                            {Array.isArray(jobs) &&
                                jobs?.map((e) => {
                                    return (
                                        <div
                                            className="bg-white rounded-3xl p-6 border border-slate-200 transition-all duration-300 flex flex-col gap-4 relative overflow-hidden hover:-translate-y-1 hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.1)] hover:border-blue-500 before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:bg-blue-500 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100"
                                            key={e._id || Math.random()}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-slate-50 p-1 flex items-center justify-center">
                                                    <img
                                                        src="https://assets.website-files.com/63337525695d8b8aebb4423f/63337525695d8b342eb4424d_Dribble%20Icon.svg"
                                                        alt="Company Logo"
                                                        className="w-full h-full object-contain"
                                                    />
                                                </div>
                                                <div className="flex flex-col">
                                                    <h5 className="text-base font-bold text-slate-800 m-0">
                                                        {e.company.Name}
                                                    </h5>
                                                    <span className="text-xs text-slate-400">
                                                        {e.JobPostedTime}
                                                    </span>
                                                </div>
                                            </div>
                                            <h4 className="text-xl font-bold text-slate-900 m-0 leading-snug">
                                                {e.Title}
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-sm font-medium">
                                                    {e.Position}
                                                </span>
                                                <span className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-sm font-medium">
                                                    {e.JobType}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                                                <div className="flex items-center gap-1.5 text-sm text-slate-500">
                                                    <img
                                                        src="https://assets.website-files.com/63337525695d8ba70ab44222/63337525695d8b2585b442b4_Location%20Icon.svg"
                                                        alt=""
                                                        className="w-4 h-4 opacity-60"
                                                    />
                                                    {e.company.Address[0].city},{" "}
                                                    {e.company.Address[0].state}
                                                </div>
                                                <div className="flex items-center gap-1.5 text-sm text-slate-500">
                                                    <img
                                                        src="https://assets.website-files.com/63337525695d8ba70ab44222/63337525695d8b73d8b44295_Salary%20Icon.svg"
                                                        alt=""
                                                        className="w-4 h-4 opacity-60"
                                                    />
                                                    {e.Salary}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </section>
                    </section>
                    <section className="w-full max-w-7xl mx-auto px-6 py-20 flex gap-16 items-center flex-col lg:flex-row">
                        <div className="flex-1 bg-white p-6 sm:p-10 rounded-3xl shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)] border border-slate-200 w-full">
                            <span className="text-3xl font-bold text-slate-800 mb-2 block">
                                Tell Us What You Think
                            </span>
                            <div className="flex flex-col gap-4 w-full">
                                <span className="text-base text-slate-500 block mb-6">
                                    Share your thoughts with us.
                                </span>
                                <textarea
                                    name=""
                                    id=""
                                    placeholder="write your feedback here..."
                                    className="w-full p-4 border-2 border-slate-200 rounded-xl text-base bg-slate-50 transition-all duration-200 min-h-[120px] resize-y focus:outline-none focus:border-blue-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)]"
                                    cols="10"
                                    rows="5"
                                    onChange={(e) =>
                                        setFeedback(e.target.value)
                                    }
                                ></textarea>
                            </div>
                            <div className="flex flex-col gap-4 w-full">
                                {/* <span className={home.lightText}>
                                    Enter your email address to get a response.
                                </span> */}
                                {/* <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className={home.emailTextBox}
                                    onChange={(e)=>setEmail(e.target.value)}
                                /> */}
                                <button
                                    className="bg-blue-600 text-white font-semibold p-3.5 rounded-xl border-none cursor-pointer transition-all duration-200 text-base uppercase tracking-wide hover:bg-blue-700 hover:-translate-y-px hover:shadow-[0_4px_6px_-1px_rgba(37,99,235,0.4)]"
                                    onClick={() => handleSubmit()}
                                >
                                    submit
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 hidden lg:flex justify-center items-center">
                            <img
                                loading="lazy"
                                src="https://firebasestorage.googleapis.com/v0/b/jobduniya-ec494.appspot.com/o/character-moving-sign-with-cart.jpg?alt=media&token=20375646-1550-4085-b085-7f0a86b5411c"
                                className="w-full rounded-3xl shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1)]"
                                alt=""
                            />
                        </div>
                    </section>
                    <section>
                        <Footer />
                    </section>
                </div>
            </>
        </>
    );
};
export default Home;
