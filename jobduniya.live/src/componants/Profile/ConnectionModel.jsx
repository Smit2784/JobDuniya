import React, { useEffect, useState } from "react";
import Modal from "../../render-model/Modal";
// import css from "../../Style/follow.module.css";
import useAPI from "../../Hooks/USER/useAPI";
import Cookies from "js-cookie";
const Body = ({ onClose }) => {
    const api = useAPI();
    const [company, setCompany] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    useEffect(() => {
        const apiCall = async () => {
            const userid = Cookies.get("id");
            const c = await api.getREQUEST(`fetchConnectedCompany/${userid}`);
            if (!c.message) {
                setCompany(c[0]?.targetId);
            } else if (c.message) {
                setErrorMessage(c.message);
            }
        };
        apiCall();
    }, []);

    return (
        <>
            <div className="bg-white rounded-lg w-[95%] md:w-[60%] lg:w-[30%] h-[500px] overflow-hidden flex flex-col mx-auto shadow-2xl">
                <div className="flex justify-between items-center p-4 border-b border-slate-100 bg-white sticky top-0 z-10">
                    <div>
                        <span className="text-lg font-bold text-slate-800 uppercase tracking-wide">
                            Connections{" "}
                            {company?.length > 0 ? `(${company.length})` : ""}
                        </span>
                    </div>
                    <div>
                        <span
                            onClick={onClose}
                            className="cursor-pointer text-slate-400 hover:text-slate-600 transition-colors p-1"
                        >
                            <i className="fa fa-close text-xl"></i>
                        </span>
                    </div>
                </div>

                <div className="p-4 overflow-y-auto custom-scrollbar flex-grow">
                    <div className="mb-4">
                        <input
                            type="text"
                            className="w-full outline-none border border-slate-200 rounded-full px-4 py-2 text-sm text-slate-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all placeholder:text-slate-400"
                            placeholder="Search connections..."
                        />
                    </div>

                    <div className="flex flex-col gap-3">
                        {Array.isArray(company) &&
                            company?.map((e) => {
                                return (
                                    <div
                                        className="flex items-center p-3 bg-white border border-slate-100 rounded-xl hover:shadow-md transition-all duration-200 group"
                                        key={e._id}
                                    >
                                        <div className="flex-shrink-0 mr-4">
                                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm flex items-center justify-center p-1 bg-white">
                                                <img
                                                    onError={(e) =>
                                                        (e.target.src =
                                                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIwRBD9gNuA2GjcOf6mpL-WuBhJADTWC3QVQ&usqp=CAU")
                                                    }
                                                    src={e.Logo}
                                                    className="w-full h-full object-contain rounded-full"
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                        <div className="flex-grow min-w-0 mr-3">
                                            <h6 className="text-sm font-bold text-slate-900 truncate mb-0.5">
                                                {e.Name}
                                            </h6>
                                            <p className="text-xs text-slate-500 truncate">
                                                {e.Industry || "Company"}
                                            </p>
                                        </div>
                                        {/* <div className="flex-shrink-0">
                                            <span className="badge bg-secondary">
                                                Connected
                                            </span>
                                        </div> */}
                                    </div>
                                );
                            })}
                        {(!company || company.length === 0) && (
                            <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                                <i className="fa-solid fa-building text-4xl mb-3 opacity-20"></i>
                                <p className="text-sm font-medium">
                                    No connections yet
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

const ConnectionModel = ({ onClose }) => {
    return (
        <>
            <Modal body={<Body onClose={onClose} />} />
        </>
    );
};

export default ConnectionModel;
