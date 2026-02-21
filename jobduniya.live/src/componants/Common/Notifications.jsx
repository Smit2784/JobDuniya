import React from "react";
import Modal from "../../render-model/Modal";

const Body = ({ onClose }) => {
    return (
        <>
            <div className="fixed inset-0 w-full h-full bg-black/40 backdrop-blur-[3px] overflow-hidden flex flex-col justify-center items-center z-1000000 px-10">
                <div className="w-full max-w-[1000px] bg-white max-h-[500px] rounded-[10px] overflow-y-auto relative top-[60px] flex flex-col gap-5 p-4">
                    <div className="flex justify-between items-center mb-3">
                        <div className="">
                            <span className="text-slate-500 text-2xl mb-5">
                                Notifications
                            </span>
                        </div>
                        <div>
                            <span>
                                <i
                                    className="fa fa-close cursor-pointer"
                                    onClick={onClose}
                                ></i>
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 p-4 rounded-[20px] bg-slate-100 mb-4 items-center">
                        <div className="w-full md:w-1/2 flex items-center">
                            <div className="flex gap-4 w-full items-center">
                                <div className="shrink-0">
                                    <img
                                        className="mb-2 max-w-full h-auto border border-slate-200 rounded"
                                        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                        alt=""
                                        style={{
                                            width: "80px",
                                            height: "80px",
                                        }}
                                    />
                                </div>
                                <div className="text-left pl-4 flex-1">
                                    <h5 className="mb-3 font-bold">
                                        Vishala Gajera
                                    </h5>
                                    <span className="mr-3 block">
                                        Congratulations , Your application was
                                        accepted by Microsoft
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 flex flex-col items-start md:items-end justify-center">
                            <div className="flex mb-3">
                                <button
                                    className="p-2 bg-transparent border-none cursor-pointer"
                                    href=""
                                >
                                    <i className="fa-solid fa-close"></i>
                                </button>
                            </div>
                            <div>
                                <span className={"text-base"}>2h Ago</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 p-4 rounded-[20px] bg-slate-100 mb-4 items-center">
                        <div className="w-full md:w-1/2 flex items-center">
                            <img
                                className="shrink-0 max-w-full h-auto border border-slate-200 rounded"
                                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                alt=""
                                style={{ width: "80px", height: "80px" }}
                            />
                            <div className="text-left pl-4 flex-1">
                                <h5 className="mb-3 font-bold">
                                    Vishala Gajera
                                </h5>
                                <span className="mr-3 block">
                                    Congratulations , Your application was
                                    accepted by Microsoft
                                </span>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 flex flex-col items-start md:items-end justify-center">
                            <div className="flex mb-3">
                                <button
                                    className="p-2 bg-transparent border-none cursor-pointer"
                                    href=""
                                >
                                    <i className="fa-solid fa-close"></i>
                                </button>
                            </div>
                            <div>
                                <span className={"text-base"}>2h Ago</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 p-4 rounded-[20px] bg-slate-100 mb-4 items-center">
                        <div className="w-full md:w-1/2 flex items-center">
                            <img
                                className="shrink-0 max-w-full h-auto border border-slate-200 rounded"
                                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                alt=""
                                style={{ width: "80px", height: "80px" }}
                            />
                            <div className="text-left pl-4 flex-1">
                                <h5 className="mb-3 font-bold">Yash Kalambe</h5>
                                <span className="mr-3 block">
                                    Congratulations , Your application was
                                    accepted by Microsoft
                                </span>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 flex flex-col items-start md:items-end justify-center">
                            <div className="flex mb-3">
                                <button
                                    className="p-2 bg-transparent border-none cursor-pointer"
                                    href=""
                                >
                                    <i className="fa-solid fa-close"></i>
                                </button>
                            </div>
                            <div>
                                <span className={"text-base"}>2h Ago</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 p-4 rounded-[20px] bg-slate-100 mb-4 items-center">
                        <div className="w-full md:w-1/2 flex items-center">
                            <img
                                className="shrink-0 max-w-full h-auto border border-slate-200 rounded"
                                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                alt=""
                                style={{ width: "80px", height: "80px" }}
                            />
                            <div className="text-left pl-4 flex-1">
                                <h5 className="mb-3 font-bold">Yash Kalambe</h5>
                                <span className="mr-3 block">
                                    Congratulations , Your application was
                                    accepted by Microsoft
                                </span>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 flex flex-col items-start md:items-end justify-center">
                            <div className="flex mb-3">
                                <button
                                    className="p-2 bg-transparent border-none cursor-pointer"
                                    href=""
                                >
                                    <i className="fa-solid fa-close"></i>
                                </button>
                            </div>
                            <div>
                                <span className={"text-base"}>2h Ago</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const Notifications = ({ onClose }) => {
    return (
        <>
            <Modal body={<Body onClose={onClose} />} />
        </>
    );
};

export default Notifications;
