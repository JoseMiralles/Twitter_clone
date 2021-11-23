import React from "react";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../actions/authActions";

const LogoutButton = () => {

    const dispatch = useDispatch();

    const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        
        e.preventDefault();

        (async () => {
            dispatch(await logoutAction());
        })();
    };

    return(
        <button onClick={onClick}>
            Logout
        </button>
    );
};

export default LogoutButton;
