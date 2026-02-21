import React from "react";

const Dashboard = () => {
    return (
        <>
            <main className="container overflow-scroll mt-[58px]">
                <div className="container pt-4 overflow-scroll border border-black min-h-screen">
                    <section className="mb-4">
                        <div className="bg-white rounded-lg shadow border border-slate-200">
                            <div className="p-3 border-b border-slate-200 bg-slate-50 rounded-t-lg">
                                <h5 className="mb-0 text-center font-bold">
                                    Sales
                                </h5>
                            </div>
                            <div className="p-4">
                                {/* <canvas className="my-4 w-full" id="myChart" height="380"></canvas> */}
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
};

export default Dashboard;
