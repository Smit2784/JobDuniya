import React, {
    useState,
    useContext,
    useCallback,
    useEffect,
    useMemo,
} from "react";
import Modal from "../../render-model/Modal";
import Swal from "sweetalert2";
import css from "./jobs.module.css";
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
    }, []);

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
        <div className={css.tableContainer}>
            <div className={css.scrollableTable}>
                <table className={`table table-hover ${css.table}`}>
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
                                            style={{
                                                width: "65%",
                                                paddingLeft: "32px",
                                            }}
                                        >
                                            <div className="d-flex align-items-center">
                                                <div>
                                                    <div
                                                        className={css.jobTitle}
                                                    >
                                                        {e.Title}
                                                    </div>
                                                    <div
                                                        className={
                                                            css.jobPosition
                                                        }
                                                    >
                                                        <i
                                                            className="fa-solid fa-briefcase text-muted me-1"
                                                            style={{
                                                                fontSize:
                                                                    "0.8em",
                                                            }}
                                                        ></i>
                                                        {e.Position}
                                                    </div>
                                                    <div
                                                        className={css.jobMeta}
                                                    >
                                                        <i className="fa-regular fa-clock"></i>
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
                                            className="text-center"
                                            style={{
                                                width: "35%",
                                                paddingRight: "32px",
                                            }}
                                        >
                                            <div className="d-flex justify-content-end align-items-center gap-3">
                                                <button
                                                    className={css.actionBtn}
                                                    onClick={() =>
                                                        handleHide(e._id, e)
                                                    }
                                                >
                                                    {hide.includes(e._id) ? (
                                                        <>
                                                            <span
                                                                className={
                                                                    css.btnView
                                                                }
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
                                                                className={`${css.chevron} rotate-180`}
                                                            >
                                                                <i className="fa-solid fa-chevron-up"></i>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span
                                                                className={
                                                                    css.btnView
                                                                }
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
                                                            <div
                                                                className={
                                                                    css.chevron
                                                                }
                                                            >
                                                                <i className="fa-solid fa-chevron-down"></i>
                                                            </div>
                                                        </>
                                                    )}
                                                </button>
                                                <button
                                                    className={`${css.actionBtn} ${css.btnDelete}`}
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
                                                    <div
                                                        className={
                                                            css.detailRow
                                                        }
                                                    >
                                                        <span
                                                            className={
                                                                css.detailKey
                                                            }
                                                        >
                                                            {key
                                                                .replace(
                                                                    /([A-Z])/g,
                                                                    " $1",
                                                                )
                                                                .trim()}
                                                        </span>
                                                        <span
                                                            className={
                                                                css.detailValue
                                                            }
                                                        >
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
