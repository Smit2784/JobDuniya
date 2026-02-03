import React, { useCallback, useContext, useEffect, useState } from "react";
import css from "./Style/listUsers.module.css";
// import "../Style/jobview.css"; // Commented out to prevent conflict if cleaner slate needed
import useAPI from "../Hooks/USER/useAPI";
import Cookies from "js-cookie";
import { EnableSpinner } from "..";
import Card from "./Components/Card";
import { toast } from "react-toastify";
import CompanyProfile from "../CompanySide/components/CompanyProfile";

const ListUsers = () => {
    const [setSpinnerState] = useContext(EnableSpinner);
    const [keyword, setKeyword] = useState("");
    const [user, setUser] = useState([]);
    const [followingId, setFollowingId] = useState([]);
    const [followedUser, setFollowedUser] = useState([]);
    const [length, setLength] = useState(false);
    const api = useAPI();
    const id = Cookies.get("id");

    const getUser = async (filter) => {
        const data = await api.getREQUEST(`filter/user?filter=${filter}`);
        if (data) {
            setUser(data.users);
            setLength(data?.users?.length);
        } else {
            setUser([]);
        }
    };
    useEffect(() => {
        const deBounce = setTimeout(() => {
            getUser(keyword);
        }, 1000);
        return () => clearTimeout(deBounce);
    }, [keyword]);

    useEffect(() => {
        const getUser = async () => {
            const data = await api.getREQUEST(`getFollowings/${id}`);
            if (data && data[0] && Array.isArray(data[0].targetId)) {
                // Convert objects to IDs if necessary
                const targetIds = data[0].targetId.map((item) =>
                    item && typeof item === "object" ? item._id : item,
                );
                setFollowingId(targetIds);
            }
        };
        getUser();
    }, [id]);
    // console.log(user);

    const handleFollowButton = useCallback((targetId) => {
        const UpdateFollow = async () => {
            const users = await api.patchREQUEST(
                `updateDetails`,
                "userFollow",
                { userId: id },
                {
                    targetId: [targetId],
                },
            );
            if (users) {
                setFollowedUser(users);
            }

            setFollowingId((prev) => {
                if (prev?.includes(targetId)) {
                    return prev.filter((id) => id !== targetId);
                } else {
                    return [...prev, targetId];
                }
            });
        };
        UpdateFollow();
    }, []);

    const handleUnFollowButton = useCallback((targetId) => {
        const UpdateFollow = async () => {
            const users = await api.patchREQUEST(
                `api/userfollow/${id}/remove/${targetId}`,
                "userFollow",
            );
            setFollowedUser(users);
            setFollowingId((prev) => {
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
        <div className={css.container}>
            <div className={css.headerSection}>
                <div className={css.titleBox}>
                    <h1 className={css.title}>Recommended for you</h1>
                    <span className={css.resultCount}>
                        {length} Connections Found
                    </span>
                </div>
                <div className={css.searchBox}>
                    <input
                        type="text"
                        className={css.searchInput}
                        placeholder="Search for people..."
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                </div>
            </div>

            <div className={css.gridContainer}>
                {user &&
                    Array.isArray(user) &&
                    user?.map((e) => (
                        <Card
                            key={e?._id}
                            btnText={"Follow"}
                            firstName={e?.firstName}
                            _id={e?._id}
                            lastName={e?.lastName}
                            yes={"Follow"}
                            no={"Following"}
                            handleUnFollowButton={() =>
                                handleUnFollowButton(e?._id)
                            }
                            pofession={e?.profession}
                            profileImage={e?.profileImage}
                            following_id={followingId}
                            univercity={e?.education[0]?.univercity}
                            handleFollowButton={() =>
                                handleFollowButton(e?._id)
                            }
                            // Pass styles or use global card styles specific to this new design
                        />
                    ))}
            </div>

            <div className={css.companiesSection}>
                <span className={css.sectionTitle}>Companies</span>
                <CompanyProfile />
            </div>
        </div>
    );
};

export default ListUsers;
