import React from "react";
import { useSelector } from "react-redux";
import { AppStateType } from "../../model/appModel";
import "./top-bar.scss"

const TopBar = () => {

    const title = useSelector((s: AppStateType) => {
        return s.ui.pageTitle
    });

    return (
        <section id="top-bar-wrapper">
            <div id="top-bar">

                <div id="bar-icon-wrapper">
                    <div id="bar-icon"></div>
                </div>

                <div id="page-title-wrapper">
                    <h3>{title}</h3>
                </div>

            </div>
        </section>
    );
}

export default TopBar;
