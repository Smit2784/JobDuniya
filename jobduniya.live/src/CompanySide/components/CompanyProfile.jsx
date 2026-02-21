import React, { useCallback, useEffect, useState } from "react";
import Card from "../../UserSide/Components/Card";
import Cookies from "js-cookie";
import useAPI from "../../Hooks/USER/useAPI";
// import css from "../../UserSide/Style/listUsers.module.css";
const CompanyProfile = () => {
    const [company, setCompany] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [connectingId, setConnectingId] = useState([]);
    const [connectedCompany, setConnectedCompany] = useState([]);
    const [loading, setLoading] = useState(false);
    const api = useAPI();
    const id = Cookies.get("id");

    useEffect(() => {
        if (!id || id === "null" || id === "undefined") return;

        const getUser = async () => {
            const data = await api.getREQUEST(`notFollowedCompany/${id}/0`);
            if (data) {
                setCompany(data);
            } else {
                setCompany([]);
            }
        };
        const fetchConnections = async () => {
            const data = await api.getREQUEST(`fetchConnectedCompany/${id}`);
            if (data && data[0] && Array.isArray(data[0].targetId)) {
                // Extract IDs for button state
                const targetIds = data[0].targetId.map((item) =>
                    item && typeof item === "object" ? item._id : item,
                );
                setConnectingId(targetIds);

                // Extract objects for display list
                const objects = data[0].targetId.filter(
                    (item) => item && typeof item === "object",
                );
                setConnectedCompany(objects);
            }
        };
        getUser();
        fetchConnections();
    }, [id]);

    // console.log(compnay);
    // console.log(company);
    const handleFollowButton = useCallback(
        (targetId) => {
            const UpdateFollow = async () => {
                await api.patchREQUEST(
                    `updateDetails`,
                    "companyConnections",
                    { userId: id },
                    {
                        targetId: [targetId],
                    },
                );

                // Find the company in the current list
                const targetCompany = company.find((c) => c._id === targetId);

                if (targetCompany) {
                    // Add to connected list locally to ensure visibility
                    setConnectedCompany((prev) => [...prev, targetCompany]);
                }

                setConnectingId((prev) => {
                    if (prev?.includes(targetId)) {
                        // Start of logic: actually we only add, but keeping logic consistent
                        return prev;
                    } else {
                        return [...prev, targetId];
                    }
                });
            };
            UpdateFollow();
        },
        [company, id],
    );

    const handleUnFollowButton = useCallback((targetId) => {
        const UpdateFollow = async () => {
            const users = await api.patchREQUEST(
                `api/companyfollow/${id}/remove/${targetId}`,
            );
            setConnectedCompany(users);
            setConnectingId((prev) => {
                if (prev?.includes(targetId)) {
                    return prev.filter((id) => id !== targetId);
                } else {
                    return [...prev, targetId];
                }
            });
        };
        UpdateFollow();
    }, []);
    return (
        <>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-8 mb-4">
                {Array.isArray(company) &&
                    [...company, ...connectedCompany]?.map((e) => {
                        return (
                            <Card
                                key={e?._id}
                                no={"Connected"}
                                yes={"Connect"}
                                firstName={e?.Name}
                                _id={e?._id}
                                handleUnFollowButton={() =>
                                    handleUnFollowButton(e?._id)
                                }
                                pofession={e?.Industry}
                                profileImage={e?.Logo}
                                following_id={connectingId}
                                univercity={
                                    e.Address && e?.Address[0]?.personalAddress
                                }
                                handleFollowButton={() =>
                                    handleFollowButton(e?._id)
                                }
                                disableFollowingBtn={true}
                            />
                        );
                    })}
            </div>
            <div className="flex justify-end w-full p-2">
                <span className="inline-flex items-center text-blue-500 font-semibold cursor-pointer transition-all duration-200 text-base hover:text-blue-700 hover:translate-x-1">
                    See all{" "}
                    <i className="fa fa-chevron-right ml-2 text-[0.8em]"></i>
                </span>
            </div>
        </>
    );
};

export default CompanyProfile;
