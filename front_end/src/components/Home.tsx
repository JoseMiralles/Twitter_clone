import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { appActionsTypes } from "../model/appModel";

const Home = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: "SET_PAGE_TITLE",
            title: "Home"
        } as appActionsTypes);
    }, []);

    return(
        <section id="home-wrapper" className="page">
            <div id="home">
                <p>Home</p>
            </div>
        </section>
    );
}

export default Home;
