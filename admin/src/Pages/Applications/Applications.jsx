import React, { useCallback, useContext, useEffect, useState } from "react";
import Tab from "../../Shared/Tab";
import { ActiveModal } from "../../main";
import useAPI from "../../Hooks/useAPI";
import { RefreshState } from "../../App";
import { GlobalState } from "../../main";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Applications = () => {
    const [items, setItems] = useState([]);
    const [currentState, setCurrentState] = useContext(GlobalState);
    const [isRefreshing, setIsRefreshing] = useContext(RefreshState);
    const api = useAPI();
    const [activeModalState, setActiveModalState] = useContext(ActiveModal);
    // defined inside useEffect to avoid dependency issues with unstable 'api' object
    useEffect(() => {
        let isMounted = true;
        const fetchApplications = async () => {
            const cid = localStorage.getItem("id");
            if (!cid) return;

            // api.getREQUEST updates internal state, triggering re-renders.
            // We must ensure this runs only once.
            const data = await api.getREQUEST(`applied-users/${cid}`);

            if (isMounted) {
                if (Array.isArray(data)) {
                    setItems(data);
                } else if (data) {
                    setItems([]);
                }
            }
        };
        fetchApplications();
        return () => {
            isMounted = false;
        };
    }, []); // LEAVE EMPTY: api dependency causes infinite loop due to internal state updates

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const result = await api.deleteREQUEST(
                        "delete",
                        "jobapplications",
                        {
                            _id: id,
                        },
                    );

                    // useAPI returns the JSON body or an error object.
                    // It does NOT return a Response object with .ok property.
                    if (
                        result &&
                        !result.message
                            ?.toString()
                            .toLowerCase()
                            .includes("error")
                    ) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your Application has been deleted.",
                            icon: "success",
                        });
                        // Update UI locally to avoid refetching issues
                        setItems((prev) =>
                            prev.filter((item) => item._id !== id),
                        );
                    } else {
                        // Fallback error handling if the API returns an error object
                        toast.error(
                            result.message || "Failed to delete application",
                        );
                    }
                } catch (error) {
                    console.error("Error deleting application:", error);
                    toast.error("An unexpected error occurred");
                }
            }
        });
    };

    return (
        <div className="w-[95%] max-w-[1400px] mt-8 pb-8">
            <div className="bg-white rounded-t-xl py-5 px-8 border-b border-[#e2e8f0] flex justify-between items-center">
                <div className="text-[1.2rem] font-bold text-[#0f172a] flex items-center gap-[10px]">
                    <i className="fa-solid fa-list-ul"></i>
                    Recent Applications
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
                                Applicant
                            </th>
                            <th className="bg-[#f8fafc] text-[#64748b] font-semibold uppercase text-xs tracking-wider py-4 px-6 text-left">
                                Contact
                            </th>
                            <th className="bg-[#f8fafc] text-[#64748b] font-semibold uppercase text-xs tracking-wider py-4 px-6 text-left">
                                Position
                            </th>
                            <th className="bg-[#f8fafc] text-[#64748b] font-semibold uppercase text-xs tracking-wider py-4 px-6 text-left">
                                Resume
                            </th>
                            <th className="bg-[#f8fafc] text-[#64748b] font-semibold uppercase text-xs tracking-wider py-4 px-6 text-left">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    {isRefreshing && (
                        <tbody>
                            <tr>
                                <td colSpan={5} className="text-center p-3">
                                    <div
                                        className="inline-block w-8 h-8 border-4 border-current border-r-transparent rounded-full animate-spin text-blue-600"
                                        role="status"
                                    >
                                        <span className="sr-only">
                                            Loading...
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    )}

                    <tbody>
                        {items.length > 0 ? (
                            items.map((e) => (
                                <tr
                                    key={e._id}
                                    className="hover:bg-[#f8fafc] border-b border-[#f1f5f9] last:border-b-0"
                                >
                                    <td className="py-4 px-6 text-[#334155] align-middle">
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={`${e?.userId?.profileImage}`}
                                                alt="User"
                                                onError={(e) => {
                                                    e.target.onerror = null; // Prevent infinite loop
                                                    e.target.src =
                                                        "https://w7.pngwing.com/pngs/695/655/png-transparent-head-the-dummy-avatar-man-tie-jacket-user.png";
                                                }}
                                                className="w-10 h-10 rounded-full object-cover border-2 border-[#e2e8f0]"
                                            />
                                            <div className="flex flex-col">
                                                <h6 className="m-0 text-[0.95rem] font-semibold text-[#0f172a]">
                                                    {e?.userId?.firstName}{" "}
                                                    {e?.userId?.lastName}
                                                </h6>
                                                <p className="m-0 text-[0.8rem] text-[#64748b]">
                                                    {e?.userId?.email}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-[#334155] align-middle">
                                        <span className="text-gray-500 text-sm">
                                            {e?.userId?.email}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-[#334155] align-middle">
                                        <span className="inline-block py-1 px-2 rounded bg-gray-100 text-gray-800 border border-gray-200 text-xs font-semibold">
                                            {e?.jobId?.Title || "N/A"}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-[#334155] align-middle">
                                        <a
                                            href={e?.cv}
                                            download={true}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-[#6366f1] text-[1.1rem] transition-transform duration-200 hover:scale-110 inline-block"
                                        >
                                            <i className="fa-solid fa-file-pdf"></i>
                                        </a>
                                    </td>
                                    <td className="py-4 px-6 text-[#334155] align-middle">
                                        <div className="flex gap-2">
                                            <button
                                                type="button"
                                                className="w-8 h-8 rounded-lg border-none flex items-center justify-center cursor-pointer transition-all duration-200 bg-[#e0f2fe] text-[#0284c7] hover:bg-[#0284c7] hover:text-white"
                                                title="View Profile"
                                                onClick={() => {
                                                    if (e?.userId) {
                                                        setActiveModalState(
                                                            "profileViewOfConnections",
                                                        );
                                                        localStorage.setItem(
                                                            "connectionId",
                                                            JSON.stringify(
                                                                e?.userId,
                                                            ),
                                                        );
                                                    } else {
                                                        toast.error(
                                                            "User profile not found",
                                                        );
                                                    }
                                                }}
                                            >
                                                <i className="fa-solid fa-user"></i>
                                            </button>

                                            <button
                                                type="button"
                                                className="w-8 h-8 rounded-lg border-none flex items-center justify-center cursor-pointer transition-all duration-200 bg-[#dcfce7] text-[#16a34a] hover:bg-[#16a34a] hover:text-white"
                                                title="Send Email"
                                                onClick={() => {
                                                    localStorage.setItem(
                                                        "mailTo",
                                                        e?.email,
                                                    );
                                                    localStorage.setItem(
                                                        "mailFrom",
                                                        currentState?.Email,
                                                    );
                                                    setActiveModalState(
                                                        "sendmail",
                                                    );
                                                }}
                                            >
                                                <i className="fa-regular fa-envelope"></i>
                                            </button>

                                            <button
                                                type="button"
                                                className="w-8 h-8 rounded-lg border-none flex items-center justify-center cursor-pointer transition-all duration-200 bg-[#fee2e2] text-[#dc2626] hover:bg-[#dc2626] hover:text-white"
                                                title="Delete"
                                                onClick={() =>
                                                    handleDelete(e?._id)
                                                }
                                            >
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center p-5">
                                    <div className="text-gray-500 flex flex-col items-center">
                                        <i className="fa-regular fa-folder-open text-2xl mb-2"></i>
                                        <span>No Applications Found</span>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Applications;
