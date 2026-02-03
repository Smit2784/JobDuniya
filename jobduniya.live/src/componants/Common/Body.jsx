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
import css from "../../Style/body.module.css";
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
        <div className={css.container}>
            <div className={css.header}>
                <h2 className={css.title}>
                    {toggle ? "Applied Jobs" : "Saved Jobs"}
                    {data.length > 0 && (
                        <span className="text-muted ms-2 fs-5">
                            ({data.length})
                        </span>
                    )}
                </h2>
                <div className={css.toggleContainer}>
                    <label
                        className={`${css.toggleLabel} ${!toggle ? css.active : ""}`}
                        onClick={() => setToggle(false)}
                    >
                        Saved
                    </label>
                    <label
                        className={`${css.toggleLabel} ${toggle ? css.active : ""}`}
                        onClick={() => setToggle(true)}
                    >
                        Applied
                    </label>
                </div>
            </div>

            <div className={css.grid}>
                {data.length > 0 ? (
                    data.map((e) => (
                        <div key={e._id} className={css.card}>
                            <div className={css.cardBody}>
                                <div className={css.jobPositionWrapper}>
                                    <span className={css.companyName}>
                                        {e?.jobId?.company?.Name}
                                    </span>
                                </div>
                                <h3 className={css.jobTitle}>
                                    {e.jobId.Title}
                                </h3>

                                <div className={css.jobBadges}>
                                    <span
                                        className={`${css.badge} ${css.badgePrimary}`}
                                    >
                                        <i className="fa-solid fa-briefcase"></i>{" "}
                                        {e.jobId.Position}
                                    </span>
                                    <span
                                        className={`${css.badge} ${css.badgeSecondary}`}
                                    >
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
                                    <div className={css.detailsSection}>
                                        {filterData.map(([key, value]) => (
                                            <div
                                                key={key}
                                                className={css.detailRow}
                                            >
                                                <span
                                                    className={css.detailLabel}
                                                >
                                                    {key
                                                        .replace(
                                                            /([A-Z])/g,
                                                            " $1",
                                                        )
                                                        .trim()}
                                                </span>
                                                <span
                                                    className={css.detailValue}
                                                >
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

                            <div className={css.cardFooter}>
                                <button
                                    className={`${css.actionBtn} ${css.btnView}`}
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
                                        className={`${css.actionBtn} ${css.btnDelete}`}
                                    >
                                        <i className="fa-solid fa-file-circle-xmark"></i>
                                        Cancel Apply
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleDelete(e._id)}
                                        className={`${css.actionBtn} ${css.btnDelete}`}
                                    >
                                        <i className="fa-solid fa-bookmark"></i>
                                        Unsave
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className={css.emptyState}>
                        <img
                            src={img}
                            className={css.emptyImage}
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
