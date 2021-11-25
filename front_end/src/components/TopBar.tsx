import React from "react";
import { useSelector } from "react-redux";
import { AppStateType } from "../model/appModel";

const TopBar = () => {

    const title = useSelector((s: AppStateType) => {
        return s.ui.pageTitle
    });

    return (
        <h1>{title}</h1>
    );
}

export default TopBar;
