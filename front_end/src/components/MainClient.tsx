import React from "react";
import { useSelector } from "react-redux";
import { AppStateType } from "../model/appModel";
import LogoutButton from "./top_bar_components/logoutButton";

const MainClient = () => {

    const user = useSelector(function (s: AppStateType) {
        if (s.auth.userId) return s.user.users[s.auth.userId]
    });

    return (
        <section>
            <h1>{ user?.userName ?? "Main Activity" }</h1>
            <LogoutButton />
        </section>
    );
}

export default MainClient;
