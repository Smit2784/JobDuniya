import React from "react";
import css from "./tab.module.css";

const Tab = ({ tabName, action }) => {
    return (
        <div className={css.tabContainer}>
            <div className={css.tabTitle}>
                <i className="fa-solid fa-layer-group"></i> / {tabName}
            </div>
            <div className={css.actionButton}>{action}</div>
        </div>
    );
};

export default Tab;
