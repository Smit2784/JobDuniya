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

            <div className="grid grid-cols-[repeat(auto-fill,minmax(380px,1fr))] gap-8 items-start md:grid-cols-1">
                {data.length > 0 ? (
                    data.map((e) => (
                        <div
                            key={e._id}
                            className="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-slate-200 transition-all duration-250 flex flex-col relative overflow-hidden h-full hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-linear-to-r before:from-blue-500 before:to-blue-600 before:origin-left before:transition-transform before:duration-300 before:scale-x-0 hover:before:scale-x-100"
                        >
                            <div className="p-6 flex-1">
                                <div className="flex items-center gap-2 mb-5">
                                    <span className="font-semibold text-slate-600 text-sm">
                                        {e?.jobId?.company?.Name}
                                    </span>
                                </div>
                                <h3 className="text-xl font-extrabold text-slate-800 mb-2 leading-tight tracking-tight">
                                    {e.jobId.Title}
                                </h3>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wide bg-blue-50 text-blue-600 border border-blue-100">
                                        <i className="fa-solid fa-briefcase"></i>{" "}
                                        {e.jobId.Position}
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wide bg-slate-50 text-slate-500 border border-slate-200">
                                        <i className="fa-regular fa-clock"></i>{" "}
                                        {moment(
                                            e.jobId.JobPostedTime?.split(
                                                "T",
                                            )[0],
                                            "YYYYMMDD",
                                        ).fromNow()}
                                    </span>
                                </div>

                                {hide.includes(e.jobId._id) && filterData && (
                                    <div className="m-0 mx-6 mb-6 bg-white border border-slate-200 rounded-lg animate-[fadeIn_0.3s_ease]">
                                        {filterData.map(([key, value]) => (
                                            <div
                                                key={key}
                                                className="flex p-4 border-b border-slate-100 last:border-b-0"
                                            >
                                                <span className="font-bold text-slate-400 w-[35%] text-[0.7rem] uppercase tracking-wider pt-0.5">
                                                    {key
                                                        .replace(
                                                            /([A-Z])/g,
                                                            " $1",
                                                        )
                                                        .trim()}
                                                </span>
                                                <span className="w-[65%] text-slate-700 text-sm font-medium leading-relaxed">
                                                    {value &&
                                                    value.length > 0 ? (
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
                            </div>

                            <div className="p-4 px-6 bg-slate-50 border-t border-slate-200 grid grid-cols-2 gap-4">
                                <button
                                    className="p-2.5 border-none rounded-lg font-semibold cursor-pointer transition-all text-sm flex items-center justify-center gap-2 uppercase tracking-wide bg-slate-800 border border-slate-800 text-white hover:bg-slate-700 hover:border-slate-700 hover:-translate-y-px"
                                    onClick={() =>
                                        handleHide(e.jobId._id, e.jobId)
                                    }
                                >
                                    {hide.includes(e.jobId._id) ? (
                                        <>
                                            <i className="fa fa-eye-slash"></i>
                                            Hide Details
                                        </>
                                    ) : (
                                        <>
                                            <i className="fa fa-eye"></i> View
                                            Details
                                        </>
                                    )}
                                </button>

                                {toggle ? (
                                    <button
                                        onClick={() => handleDeleteApps(e._id)}
                                        className="p-2.5 border-none rounded-lg font-semibold cursor-pointer transition-all text-sm flex items-center justify-center gap-2 uppercase tracking-wide bg-white border border-slate-200 text-slate-500 hover:bg-red-50 hover:text-red-500 hover:border-red-200"
                                    >
                                        <i className="fa-solid fa-file-circle-xmark"></i>
                                        Cancel Apply
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleDelete(e._id)}
                                        className="p-2.5 border-none rounded-lg font-semibold cursor-pointer transition-all text-sm flex items-center justify-center gap-2 uppercase tracking-wide bg-white border border-slate-200 text-slate-500 hover:bg-red-50 hover:text-red-500 hover:border-red-200"
                                    >
                                        <i className="fa-solid fa-bookmark"></i>
                                        Unsave
                                    </button>
                                )}
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
