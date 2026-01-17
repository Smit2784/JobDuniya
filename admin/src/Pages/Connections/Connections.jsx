import React, { useCallback, useContext, useEffect, useState } from "react";
import Tab from "../../Shared/Tab";
import css from "../Dashboard/style.module.css";
import axios from "axios";
import Card from "./Card";
import "./style.css";
import DataTable from "react-data-table-component";
import useAPI from "../../Hooks/useAPI";
import { ActiveModal } from "../../main";
import { GlobalState } from '../../main'
import Navbar from "../../Shared/Navbar";
const Connections = () => {
    const api = useAPI();
    const [items, setItems] = useState([]);
    const [activeModalState, setActiveModalState] = useContext(ActiveModal);
    const [currentState, setCurrentState] = useContext(GlobalState);
    const id = localStorage.getItem("id");
    const fetch = useCallback(async () => {
        const data = await api.getREQUEST(`getConnections/${id}`);
        setItems(data);
    });
    useEffect(() => {
        fetch();
    }, []);
    return (
        <>
            <div className={css.body}>
                <Navbar left={`Hello 👋 ${currentState?.HRDetail?.Name}!`} />
                <Tab
                    tabName={`Connections`}
                />
                <div className={css.TableContainer}>
                    <table class="table table-responsive-md  align-middle mb-0 ">
                        <thead class="bg-light">
                            <tr className="w-25">
                                <th className="w-25 fs-5 fw-bold">{items.length} {items.length >= 1 ? " Connection " : " Connections "}Found</th>
                            </tr>
                            <tr>
                                <th className="">Name</th>
                                <th className="">Location</th>
                                <th className="">Profession</th>
                                <th className="">Actions</th>
                            </tr>
                        </thead>
                        {items.length > 0 ?
                            items.map((e) => {
                                return (
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div class="d-flex align-items-center">
                                                    <img
                                                        src={`${e.profileImage}`}
                                                        alt=""
                                                        onError={e => e.target.src = "https://w7.pngwing.com/pngs/695/655/png-transparent-head-the-dummy-avatar-man-tie-jacket-user.png"}
                                                        style={{
                                                            width: "45px",
                                                            height: "45px",
                                                        }}
                                                        class="rounded-circle"
                                                    />
                                                    <div class="ms-3">
                                                        <p class="fw-bold mb-1">
                                                            {e.firstName}{" "}
                                                            {e.lastName}
                                                        </p>
                                                        <p class="text-muted mb-0">
                                                            {e.email}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p class="fw-normal mb-1 text-nowrap ">
                                                    {e.location &&
                                                        e?.location[0]?.city},
                                                    {e.location &&
                                                        e?.location[0]?.state}
                                                </p>
                                            </td>
                                            <td>{e.profession}</td>
                                            <td className="">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setActiveModalState("profileViewOfConnections")
                                                        localStorage.setItem("connectionId", JSON.stringify(e))
                                                    }
                                                    }
                                                    class="btn btn-outline-secondary   btn-rounded"
                                                >
                                                    Profile
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                );
                            }) :
                            <thead>
                            <tr>
                                <td colSpan={5} className="text-center">
                                    <span className="text-center fs-4 font-monospace"><i class="fa-regular fa-face-frown text-danger "></i>No Connections Found!</span>
                                </td>
                            </tr>
                            </thead>
                        }
                    </table>
                </div>
            </div>
        </>
    );
};

export default Connections;
