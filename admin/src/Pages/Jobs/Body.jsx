import React, {
    useState,
    useContext,
    useCallback,
    useEffect,
    useMemo,
} from "react";
import Modal from "../../render-model/Modal";
import Swal from "sweetalert2";
import css from "../../Styles/modal.module.css";
import {  RefreshState } from "../../App";
import { GlobalState } from '../../main'
import useAPI from "../../Hooks/useAPI";
import moment from "moment"
import { ActiveModal } from "../../main";
const Body = ({ onClose, style, hidden }) => {
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
                setFilterData(Object.entries(e).filter(([key, _]) =>
                    jobSchemaKeys.includes(key)
                ));
                if (hide.includes(key)) {
                    return hide.filter((e) => e !== key);
                } else {
                    return [...prev, key];
                }
            });
        },
        [hide]
    );

    const fetch = useCallback(async () => {
        const jobs = await api.getREQUEST(`FetchCompanyJobs/${companyid}`);
        setData(jobs);
        setFilterData[jobs[0]]
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

    useEffect(() => {

    }, [hide]);

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
                const res = await api.deleteREQUEST("delete", "jobs", id)
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                });
                fetch()
            }
        });
    };
    console.log(data);

    return (
        <>
            <div className={style}>
                <div className={css.TableContainer}>
                    <table className="table table-hover  table-responsive-md  align-middle mb-0 ">
                        {isRefreshing && <thead>
                            <tr>
                                <td colSpan={4} className="text-center">
                                    <div class="spinner-border" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </td>
                            </tr>
                        </thead>}
                        {
                            data.length === 0 && <h3 style={{textAlign:"center"}}>No Jobs Found</h3>
                        }
                        {Array.isArray(data) && data?.map((e) => (
                            <>
                                <thead className="">
                                    <tr>
                                        <th>
                                            <div class="d-flex align-items-center">
                                                <div class="">
                                                    <p class="fw-bold fs-3">
                                                        {e.Title}
                                                    </p>
                                                    <p class="text-text-black-50">
                                                        {e.Position}
                                                    </p>
                                                    <p class="text-muted">
                                                        Posted On {moment(e.JobPostedTime.split("T")[0], "YYYYMMDD").calendar().split("at")[0]}
                                                    </p>
                                                </div>
                                            </div>
                                        </th>
                                        <th className="text-center">
                                            <div className="d-flex justify-content-center gap-2   align-items-end flex-column ">
                                                <button className="btn fw-bold   btn-outline-primary "
                                                onClick={()=>setActiveModalState("editjob")}
                                                >
                                                    <i class="fa-solid fa-file-pen"></i>{" "}
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn fw-bold  btn-outline-danger"
                                                    onClick={() =>
                                                        handleDelete(e._id)
                                                    }
                                                >
                                                    <i class="fa-solid fa-trash-can"></i>{" "}
                                                    Delete
                                                </button>
                                                <button
                                                    className="btn fw-bold   btn-outline-info"
                                                    onClick={() =>
                                                        handleHide(e._id, e)
                                                    }
                                                >
                                                    {hide.includes(e._id) ? (
                                                        <>
                                                            <i className="fa fa-eye-slash"></i>{" "}
                                                            hide
                                                        </>
                                                    ) : (
                                                        <>
                                                            <i className="fa fa-eye"></i>{" "}
                                                            view
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>

                                <thead className="hand table-info ">
                                    <tr
                                        className=""
                                        onClick={() => handleHide(e._id, e)}
                                    >
                                        <th>
                                            <b>More details</b>
                                        </th>
                                        <th className="text-end ">
                                            {!hide.includes(e._id) ? (
                                                <i class="fa-solid fa-caret-right"></i>
                                            ) : (
                                                <i class="fa-solid fa-caret-down"></i>
                                            )}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody
                                    className="table-active "
                                    style={
                                        !hide.includes(e._id)
                                            ? {
                                                display: "none",
                                            }
                                            : {}
                                    }
                                >
                                    {filterData &&
                                        filterData?.map(([key, value]) => (
                                            <>
                                                <tr key={key}>
                                                    <td>
                                                        {key.toLocaleUpperCase()}
                                                    </td>
                                                    <td className="text-end">
                                                        {value.length > 0
                                                            ? Array.isArray(
                                                                value
                                                            )
                                                                ? value.join(
                                                                    ", "
                                                                )
                                                                : value
                                                            : "-"}
                                                    </td>
                                                </tr>
                                            </>
                                        ))}
                                </tbody>
                            </>
                        )) 
                        
                        }
                    </table>
                </div>
            </div>
        </>
    );
};
export default Body;
