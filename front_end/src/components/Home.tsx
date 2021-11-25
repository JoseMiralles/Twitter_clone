import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../actions/UIActions";
import { appActionsTypes } from "../model/appModel";

const Home = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTitle("Home"));
    }, []);

    return(
        <section id="home-wrapper" className="page">
            <div id="home">
                <p>Content goes here</p>
            </div>
        </section>
    );
}

export default Home;
