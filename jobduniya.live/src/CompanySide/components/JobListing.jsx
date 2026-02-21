import React, { useContext } from "react";
import { ActiveModal } from "../..";
import JobsCard from "./JobsCard";
const JobListing = () => {
    const [activeModalState, setActiveModalState] = useContext(ActiveModal);
    return (
        <>
            <div className="container mx-auto overflow-scroll h-screen bg-white rounded-lg shadow border border-slate-200 mt-20">
                <div className="flex flex-wrap p-3 items-center">
                    <div className="flex-1">
                        <div className="flex flex-wrap">
                            <div className="flex-1">
                                <span className="text-2xl">My Jobs</span>
                                <span className="text-2xl"> : 102</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 text-right">
                        <button
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                            onClick={() => setActiveModalState("postajob")}
                        >
                            <i className="fa fa-plus mr-2"></i> Post a job
                        </button>
                    </div>
                </div>
                <div className="mb-5">
                    <JobsCard />
                </div>
                <div className="mb-5"></div>
            </div>
        </>
    );
};

export default JobListing;
