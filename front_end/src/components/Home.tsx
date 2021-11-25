import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTitle } from "../actions/UIActions";
import { AppStateType } from "../model/appModel";
import ComposeButton from "./TweetComponents/ComposeButton";
import ComposeTweetModal from "./TweetComponents/ComposeTweetModal";

const Home = () => {

    const dispatch = useDispatch();

    const modal = useSelector((s: AppStateType) => {
        return s.ui.modal;
    });

    useEffect(() => {
        dispatch(setTitle("Home"));
    }, []);

    return(
        <section id="home-wrapper" className="page">
            <div id="home">
                
            </div>

            <ComposeButton floating={true} />

            { modal === "COMPOSE" && <ComposeTweetModal/> }

        </section>
    );
}

export default Home;
