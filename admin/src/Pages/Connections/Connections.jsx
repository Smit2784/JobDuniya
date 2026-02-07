import React, { useContext, useEffect, useState } from "react";
import Tab from "../../Shared/Tab";

import useAPI from "../../Hooks/useAPI";
import { ActiveModal } from "../../main";
import { GlobalState } from "../../main";
import Navbar from "../../Shared/Navbar";
import { toast } from "react-toastify";

const Connections = () => {
    const api = useAPI();
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeModalState, setActiveModalState] = useContext(ActiveModal);
    const [currentState, setCurrentState] = useContext(GlobalState);
    const id = localStorage.getItem("id");

    // Fix: Moved fetch logic inside useEffect with empty dependency array to prevent infinite loop
    useEffect(() => {
        let isMounted = true;
        const fetchConnections = async () => {
            if (!id) return;
            try {
                const data = await api.getREQUEST(`getConnections/${id}`);
                if (isMounted) {
                    if (Array.isArray(data)) {
                        setItems(data);
                    } else {
                        setItems([]);
                    }
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Error fetching connections:", error);
                if (isMounted) setIsLoading(false);
            }
        };

        fetchConnections();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div className="ml-[280px] w-[calc(100%-280px)] bg-[#f8f9fa] min-h-screen flex flex-col items-center transition-all duration-300 max-[900px]:ml-[80px] max-[900px]:w-[calc(100%-80px)]">
            <Navbar
                left={`Hello 👋 ${currentState?.HRDetail?.Name || "User"}!`}
            />
            <Tab tabName={`Connections`} />

            <div
                className="w-[95%] max-w-[1400px] mt-8 pb-8"
                style={{ marginTop: "20px" }}
            >
                <div className="bg-white rounded-t-xl py-5 px-8 border-b border-[#e2e8f0] flex justify-between items-center">
                    <div className="text-[1.2rem] font-bold text-[#0f172a] flex items-center gap-[10px]">
                        <i className="fa-solid fa-users"></i>
                        My Connections
                    </div>
                    <div className="bg-[#e0f2fe] text-[#0284c7] py-1 px-3 rounded-full text-sm font-semibold">
                        {items.length} Total
                    </div>
                </div>

                <div className="bg-white rounded-b-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] border border-[#e2e8f0] border-t-0 overflow-x-auto">
                    <table className="w-full border-collapse min-w-[800px]">
                        <thead>
                            <tr>
                                <th className="bg-[#f8fafc] text-[#64748b] font-semibold uppercase text-xs tracking-wider py-4 px-6 text-left">
                                    Name
                                </th>
                                <th className="bg-[#f8fafc] text-[#64748b] font-semibold uppercase text-xs tracking-wider py-4 px-6 text-left">
                                    Location
                                </th>
                                <th className="bg-[#f8fafc] text-[#64748b] font-semibold uppercase text-xs tracking-wider py-4 px-6 text-left">
                                    Profession
                                </th>
                                <th className="bg-[#f8fafc] text-[#64748b] font-semibold uppercase text-xs tracking-wider py-4 px-6 text-left">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan={4} className="text-center p-4">
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
                            ) : items.length > 0 ? (
                                items.map((e) => (
                                    <tr
                                        key={e._id || Math.random()}
                                        className="hover:bg-[#f8fafc] border-b border-[#f1f5f9] last:border-b-0"
                                    >
                                        <td className="py-4 px-6 text-[#334155] align-middle">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={`${e.profileImage}`}
                                                    alt=""
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src =
                                                            "https://w7.pngwing.com/pngs/695/655/png-transparent-head-the-dummy-avatar-man-tie-jacket-user.png";
                                                    }}
                                                    className="w-10 h-10 rounded-full object-cover border-2 border-[#e2e8f0]"
                                                />
                                                <div className="flex flex-col">
                                                    <h6 className="m-0 text-[0.95rem] font-semibold text-[#0f172a]">
                                                        {e.firstName}{" "}
                                                        {e.lastName}
                                                    </h6>
                                                    <p className="m-0 text-[0.8rem] text-[#64748b]">
                                                        {e.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-[#334155] align-middle">
                                            <span className="text-muted">
                                                {e.location &&
                                                e?.location[0]?.city
                                                    ? `${e.location[0].city}, ${e.location[0].state}`
                                                    : "N/A"}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-[#334155] align-middle">
                                            <span className="badge bg-light text-dark border">
                                                {e.profession || "N/A"}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-[#334155] align-middle">
                                            <div className="flex gap-2">
                                                <button
                                                    type="button"
                                                    className="w-8 h-8 rounded-lg border-none flex items-center justify-center cursor-pointer transition-all duration-200 bg-[#e0f2fe] text-[#0284c7] hover:bg-[#0284c7] hover:text-white"
                                                    title="View Profile"
                                                    onClick={() => {
                                                        setActiveModalState(
                                                            "profileViewOfConnections",
                                                        );
                                                        localStorage.setItem(
                                                            "connectionId",
                                                            JSON.stringify(e),
                                                        );
                                                    }}
                                                >
                                                    <i className="fa-solid fa-user"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="text-center p-5">
                                        <div className="text-muted d-flex flex-column align-items-center">
                                            <i className="fa-regular fa-face-frown fs-2 mb-2 text-danger"></i>
                                            <span>No Connections Found!</span>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Connections;
