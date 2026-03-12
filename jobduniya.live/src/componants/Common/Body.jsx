import React, {
    useState,
    useContext,
    useCallback,
    useEffect,
    useMemo,
} from "react";
import Modal from "../../render-model/Modal";
import Swal from "sweetalert2";
import img from "../../Images/9318700.jpg";
import moment from "moment";
import Cookies from "js-cookie";
import useAPI from "../../Hooks/USER/useAPI";

const Body = ({ style }) => {
    // const Swal = require("sweetalert2"); // Already imported
    const [hide, setHide] = useState([]);
    const [data, setData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [toggle, setToggle] = useState(false);
    const api = useAPI();
    const id = Cookies.get("id");

    const jobSchemaKeys = [
        "Description",
        "Experience",
        "JobType",
        "Salary",
        "Responsiblities",
        "Overview",
        "Qualificaion",
        "Benifits",
    ];

    const handleHide = useCallback(
        (key, e) => {
            setHide((prev) => {
                setFilterData(
                    Object.entries(e).filter(([key, _]) =>
                        jobSchemaKeys.includes(key),
                    ),
                );
                if (hide.includes(key)) {
                    return hide.filter((e) => e !== key);
                } else {
                    return [...prev, key];
                }
            });
        },
        [hide],
    );

    const fetch = useCallback(async () => {
        const jobs = await api.getREQUEST(`ListJob/${id}`);
        const apps = await api.getREQUEST(`fetchAppliedJobs/${id}`);

        // Filter out items where jobId is null or undefined
        const validJobs = Array.isArray(jobs)
            ? jobs.filter((item) => item && item.jobId)
            : [];
        const validApps = Array.isArray(apps)
            ? apps.filter((item) => item && item.jobId)
            : [];

        setData(toggle ? validApps : validJobs);
    });

    useEffect(() => {
        fetch();
    }, [toggle]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            allowOutsideClick: true,
            customClass: "customClass",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await api.deleteREQUEST("delete", "savedjobs", {
                    _id: id,
                });
                if (res) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success",
                    });
                    fetch();
                }
            }
        });
    };

    const handleDeleteApps = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            allowOutsideClick: true,
            customClass: "customClass",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await api.deleteREQUEST(
                    "delete",
                    "jobapplications",
                    {
                        _id: id,
                    },
                );
                if (res) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success",
                    });
                    fetch();
                }
            }
        });
    };

    const perFormUnSave = async (id) => {};

    return (
        <div className="w-full mx-auto p-12 font-sans bg-slate-100 min-h-screen box-border md:p-6 md:px-4">
            <div className="flex flex-col items-center mb-12 relative z-2">
                <h2 className="text-4xl font-extrabold text-slate-800 mb-8 uppercase tracking-tighter relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-16 after:h-1 after:bg-blue-500 after:rounded-[2px] md:text-2xl">
                    {toggle ? "Applied Jobs" : "Saved Jobs"}
                    {data.length > 0 && (
                        <span className="text-muted ms-2 fs-5">
                            ({data.length})
                        </span>
                    )}
                </h2>
                <div className="inline-flex bg-white rounded-lg p-1 shadow-sm border border-slate-200">
                    <label
                        className={`py-2.5 px-8 cursor-pointer rounded-md font-bold text-sm text-slate-400 transition-all uppercase tracking-wider select-none hover:text-slate-500 hover:bg-slate-50 ${!toggle ? "bg-slate-900 text-white shadow-md" : ""}`}
                        onClick={() => setToggle(false)}
                    >
                        Saved
                    </label>
                    <label
                        className={`py-2.5 px-8 cursor-pointer rounded-md font-bold text-sm text-slate-400 transition-all uppercase tracking-wider select-none hover:text-slate-500 hover:bg-slate-50 ${toggle ? "bg-slate-900 text-white shadow-md" : ""}`}
                        onClick={() => setToggle(true)}
                    >
                        Applied
                    </label>
                </div>
            </div>

            <div className="flex flex-col gap-4 w-full max-w-[1000px] mx-auto">
                {data.length > 0 ? (
                    data.map((e) => (
                        <div
                            key={e._id}
                            className="w-full bg-white rounded-2xl p-6 border border-slate-200 transition-all duration-300 flex flex-col justify-between gap-6 relative overflow-hidden cursor-default hover:-translate-y-1 hover:shadow-lg hover:border-slate-400"
                        >
                            <div className="flex flex-1 w-full">
                                <div className="flex flex-col justify-center gap-2 grow">
                                    <span className="font-semibold text-slate-600 text-sm">
                                        {e?.jobId?.company?.Name}
                                    </span>
                                    <h3 className="text-xl font-bold text-slate-900 m-0 leading-tight">
                                        {e?.jobId?.Title}
                                    </h3>

                                    <div className="flex flex-wrap gap-4 items-center mt-1">
                                        <div className="flex items-center gap-1.5 text-sm text-slate-500 font-medium">
                                            <i className="fa-solid fa-briefcase text-slate-400 text-base"></i>
                                            <span>{e?.jobId?.Position}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-sm text-slate-500 font-medium">
                                            <i className="fa-regular fa-clock text-slate-400 text-base"></i>
                                            <span>{e?.jobId?.JobType}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-sm text-slate-500 font-medium whitespace-break-spaces">
                                            <i className="fa fa-location-dot text-slate-400 text-base"></i>
                                            <span>{e?.jobId?.Location}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-sm text-slate-500 font-medium whitespace-break-spaces border-l border-slate-200 pl-4">
                                            <i className="fa-solid fa-indian-rupee-sign text-slate-400 text-base"></i>
                                            <span>{e?.jobId?.Salary}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {hide.includes(e.jobId._id) && filterData && (
                                <div className="m-0 bg-slate-50 border border-slate-200 rounded-lg animate-[fadeIn_0.3s_ease] overflow-hidden mt-4">
                                    {filterData.map(([key, value]) => (
                                        <div
                                            key={key}
                                            className="flex p-3 px-5 border-b border-slate-200 last:border-b-0"
                                        >
                                            <span className="font-bold text-slate-500 w-[35%] text-[0.75rem] uppercase tracking-wider pt-0.5">
                                                {key
                                                    .replace(/([A-Z])/g, " $1")
                                                    .trim()}
                                            </span>
                                            <span className="w-[65%] text-slate-800 text-sm font-medium leading-relaxed">
                                                {value && value.length > 0 ? (
                                                    Array.isArray(value) ? (
                                                        value.join(", ")
                                                    ) : (
                                                        value
                                                    )
                                                ) : (
                                                    <span className="text-muted fst-italic">
                                                        Not specified
                                                    </span>
                                                )}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end w-full pt-4 mt-2 border-t border-dashed border-slate-200 gap-4 sm:gap-0">
                                <div className="flex flex-wrap gap-3">
                                    <button
                                        className="border rounded-full font-semibold text-sm cursor-pointer transition-all duration-200 inline-flex items-center justify-center px-5 py-2 hover:bg-slate-100 bg-white border-slate-300 text-slate-700"
                                        onClick={() =>
                                            handleHide(e.jobId._id, e.jobId)
                                        }
                                    >
                                        {hide.includes(e.jobId._id) ? (
                                            <>
                                                <i className="fa fa-eye-slash mr-2"></i>
                                                Hide Details
                                            </>
                                        ) : (
                                            <>
                                                <i className="fa fa-eye mr-2"></i>
                                                View Details
                                            </>
                                        )}
                                    </button>

                                    {toggle ? (
                                        <button
                                            onClick={() => handleDeleteApps(e._id)}
                                            className="border rounded-full font-semibold text-sm cursor-pointer transition-all duration-200 inline-flex items-center justify-center px-5 py-2 bg-white text-red-500 border-red-200 hover:bg-red-50"
                                        >
                                            <i className="fa-solid fa-file-circle-xmark mr-2"></i>
                                            Cancel Apply
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleDelete(e._id)}
                                            className="border rounded-full font-semibold text-sm cursor-pointer transition-all duration-200 inline-flex items-center justify-center px-5 py-2 bg-white text-red-500 border-red-200 hover:bg-red-50"
                                        >
                                            <i className="fa-solid fa-bookmark mr-2"></i>
                                            Unsave
                                        </button>
                                    )}
                                </div>
                                <span className="text-xs text-slate-400 font-medium">
                                    Posted{" "}
                                    {moment(
                                        e.jobId.JobPostedTime?.split("T")[0],
                                        "YYYYMMDD",
                                    ).fromNow()}
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full flex flex-col items-center justify-center p-16 bg-white rounded-2xl border-2 border-dashed border-slate-200">
                        <img
                            src={img}
                            className="max-w-[180px] mb-8 opacity-60 grayscale"
                            alt="No jobs found"
                        />
                        <h4 className="text-dark fw-bold mb-2">
                            No {toggle ? "applied" : "saved"} jobs found
                        </h4>
                        <p className="text-muted">
                            {toggle
                                ? "You haven't applied to any jobs yet."
                                : "You haven't saved any jobs yet."}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Body;
