import React from "react";
import { useDispatch } from "react-redux";
import { setModal, UIActions } from "../../actions/UIActions";
import "./compose-button.scss";

interface IParams {
    floating: boolean;
}

const ComposeButton = ({floating}: IParams) => {

    const dispatch = useDispatch();
    const extraClassName = floating ? "floating" : "";

    const onCLick = () => dispatch(setModal("COMPOSE"));

    return (
        <button onClick={onCLick} className={"compose-button " + extraClassName}>
            +
        </button>
    );
}

export default ComposeButton;
