import React, {
    useState,
    useContext,
    useCallback,
    useEffect,
    useMemo,
} from "react";
import Modal from "../../render-model/Modal";
import Swal from "sweetalert2";

import { RefreshState } from "../../App";
import { GlobalState } from "../../main";
import useAPI from "../../Hooks/useAPI";
import moment from "moment";
import { ActiveModal } from "../../main";
const Body = ({ onClose }) => {
    // const Swal = require('sweetalert2')
    const [hide, setHide] = useState([]);
    const [currentState, setCurrentState] = useContext(GlobalState);
    const [isRefreshing, setIsRefreshing] = useContext(RefreshState);
    const [activeModalState, setActiveModalState] = useContext(ActiveModal);
    const [data, setData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const api = useAPI();
    const companyid = localStorage.getItem("id");
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
        const jobs = await api.getREQUEST(`FetchCompanyJobs/${companyid}`);
        setData(jobs);
    });

    useEffect(() => {
        fetch();
    }, [activeModalState]);

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

    useEffect(() => {}, [hide]);

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
                // Optimistically update UI first
                const previousData = [...data]; // Backup curr state

                // Immediately remove from UI
                setData((prev) => prev.filter((job) => job._id !== id));

                try {
                    const res = await api.deleteREQUEST("delete", "jobs", id);

                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success",
                    });

                    // Optional: sync with backend in background if needed,
                    // but we trust the optimistic update.
                    // fetch();
                } catch (error) {
                    // Revert on error
                    console.error("Delete failed", error);
                    setData(previousData);
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to delete job.",
                        icon: "error",
                    });
                }
            }
        });
    };
    console.log(data);

    return (
        <div className="bg-white rounded-2xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] w-full overflow-hidden flex flex-col border border-[#e2e8f0]">
            <div className="overflow-y-auto h-[calc(100vh-200px)] scrollbar-thin scrollbar-thumb-[#cbd5e1] scrollbar-track-transparent scrollbar-thumb-rounded-md hover:scrollbar-thumb-[#94a3b8]">
                <table
                    className={`table table-hover mb-0 w-full border-separate border-spacing-0`}
                >
                    {isRefreshing && (
                        <thead
                            style={{
                                position: "sticky",
                                top: "0",
                                zIndex: "10",
                                backgroundColor: "#f8f9fa",
                            }}
                        >
                            <tr>
                                <td colSpan={4} className="text-center">
                                    <div
                                        className="spinner-border text-primary"
                                        role="status"
                                    >
                                        <span className="visually-hidden">
                                            Loading...
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        </thead>
                    )}
                    {data.length === 0 && !isRefreshing && (
                        <tbody>
                            <tr>
                                <td colSpan="4" className="text-center p-5">
                                    <h5 className="text-muted">
                                        No Jobs Found
                                    </h5>
                                </td>
                            </tr>
                        </tbody>
                    )}
                    {Array.isArray(data) &&
                        data?.map((e) => (
                            <React.Fragment key={e._id}>
                                <thead>
                                    <tr>
                                        <th
                                            className="bg-[#f8fafc] border-b border-[#e2e8f0] text-[#64748b] font-semibold py-[18px] px-6 text-[0.85rem] uppercase tracking-[0.05em] sticky top-0 z-10"
                                            style={{
                                                width: "65%",
                                                paddingLeft: "32px",
                                            }}
                                        >
                                            <div className="d-flex align-items-center">
                                                <div>
                                                    <div className="font-bold text-[1.15rem] text-[#1e293b] mb-[6px] tracking-[-0.01em]">
                                                        {e.Title}
                                                    </div>
                                                    <div className="text-[#475569] text-[0.95rem] font-medium mb-2 flex items-center gap-2">
                                                        <i
                                                            className="fa-solid fa-briefcase text-muted me-1"
                                                            style={{
                                                                fontSize:
                                                                    "0.8em",
                                                            }}
                                                        ></i>
                                                        {e.Position}
                                                    </div>
                                                    <div className="text-[#64748b] text-[0.85rem] bg-[#f1f5f9] inline-flex py-1 px-[10px] rounded-[20px] items-center gap-[6px] font-medium">
                                                        <i className="fa-regular fa-clock text-[0.8em] text-[#94a3b8]"></i>
                                                        Posted{" "}
                                                        {moment(
                                                            e.JobPostedTime.split(
                                                                "T",
                                                            )[0],
                                                            "YYYYMMDD",
                                                        ).fromNow()}
                                                    </div>
                                                </div>
                                            </div>
                                        </th>
                                        <th
                                            className="text-center bg-[#f8fafc] border-b border-[#e2e8f0] text-[#64748b] font-semibold py-[18px] px-6 text-[0.85rem] uppercase tracking-[0.05em] sticky top-0 z-10"
                                            style={{
                                                width: "35%",
                                                paddingRight: "32px",
                                            }}
                                        >
                                            <div className="d-flex justify-content-end align-items-center gap-3">
                                                <button
                                                    className="py-[10px] px-4 rounded-[10px] font-semibold text-[0.9rem] border border-transparent transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] inline-flex items-center gap-1.5"
                                                    onClick={() =>
                                                        handleHide(e._id, e)
                                                    }
                                                >
                                                    {hide.includes(e._id) ? (
                                                        <>
                                                            <span
                                                                className="text-[#0f172a] bg-white border border-[#e2e8f0] shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:bg-[#f8fafc] hover:border-[#cbd5e1] hover:-translate-y-[1px] hover:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]"
                                                                style={{
                                                                    border: "none",
                                                                    padding:
                                                                        "0",
                                                                    boxShadow:
                                                                        "none",
                                                                    background:
                                                                        "transparent",
                                                                }}
                                                            >
                                                                Hide
                                                            </span>
                                                            <div
                                                                className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 text-[#94a3b8] hover:bg-[#f1f5f9] hover:text-[#475569] rotate-180`}
                                                            >
                                                                <i className="fa-solid fa-chevron-up"></i>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span
                                                                className="text-[#0f172a] bg-white border border-[#e2e8f0] shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:bg-[#f8fafc] hover:border-[#cbd5e1] hover:-translate-y-[1px] hover:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]"
                                                                style={{
                                                                    border: "none",
                                                                    padding:
                                                                        "0",
                                                                    boxShadow:
                                                                        "none",
                                                                    background:
                                                                        "transparent",
                                                                }}
                                                            >
                                                                View Details
                                                            </span>
                                                            <div className="w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 text-[#94a3b8] hover:bg-[#f1f5f9] hover:text-[#475569]">
                                                                <i className="fa-solid fa-chevron-down"></i>
                                                            </div>
                                                        </>
                                                    )}
                                                </button>
                                                <button
                                                    className="py-[10px] px-4 rounded-[10px] font-semibold text-[0.9rem] border transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] inline-flex items-center gap-1.5 text-[#ef4444] bg-transparent border-[#fee2e2] hover:bg-[#fee2e2] hover:text-[#dc2626] hover:border-[#fecaca] hover:-translate-y-[1px]"
                                                    onClick={() =>
                                                        handleDelete(e._id)
                                                    }
                                                    data-toggle="tooltip"
                                                    title="Delete Job"
                                                >
                                                    <i className="fa-regular fa-trash-can"></i>
                                                </button>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>

                                {/* Details Body - Integrated more smoothly */}
                                <tbody
                                    style={
                                        !hide.includes(e._id)
                                            ? { display: "none" }
                                            : {
                                                  backgroundColor: "#f8fafc",
                                                  animation: "fadeIn 0.3s",
                                              }
                                    }
                                >
                                    {filterData &&
                                        filterData?.map(([key, value]) => (
                                            <tr
                                                key={key}
                                                style={{
                                                    borderLeft:
                                                        "4px solid #3b82f6",
                                                }}
                                            >
                                                <td
                                                    colSpan="2"
                                                    style={{ padding: "0" }}
                                                >
                                                    <div className="py-3 px-4 border-b border-dashed border-[#e2e8f0] flex items-baseline last:border-b-0">
                                                        <span className="font-semibold text-[#64748b] text-[0.8rem] w-[30%] min-w-[150px] uppercase tracking-[0.05em]">
                                                            {key
                                                                .replace(
                                                                    /([A-Z])/g,
                                                                    " $1",
                                                                )
                                                                .trim()}
                                                        </span>
                                                        <span className="text-[#334155] text-[0.95rem] flex-1 leading-[1.6]">
                                                            {value.length >
                                                            0 ? (
                                                                Array.isArray(
                                                                    value,
                                                                ) ? (
                                                                    value.join(
                                                                        ", ",
                                                                    )
                                                                ) : (
                                                                    value
                                                                )
                                                            ) : (
                                                                <span className="text-muted fst-italic">
                                                                    Not
                                                                    specified
                                                                </span>
                                                            )}
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </React.Fragment>
                        ))}
                </table>
            </div>
        </div>
    );
};
export default Body;
