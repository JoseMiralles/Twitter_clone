import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AppStateType } from "../model/appModel";
import Home from "./Home";
import TopBar from "./TopBar";

const MainClient = () => {

    return (
        <BrowserRouter>
            <section id="main-client-wrapper">
                <div id="main-client">

                    <TopBar/>

                    <Routes>

                        <Route path={"/"} element={<Navigate to={"/home"}/>} />
                        <Route path={"/home"} element={<Home/>}/>

                    </Routes>

                </div>
            </section>
        </BrowserRouter>
    );
}

export default MainClient;
