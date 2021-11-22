import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction, signUpAction } from "../../actions/authActions";
import { AppStateType } from "../../model/appModel";
import "./welcome_page.scss"

type formTypes = "Login" | "Sign Up";

const WelcomePage = () => {

    const [selectedForm, setSelectedForm] = useState<formTypes>("Sign Up");

    const oppositeType: formTypes = selectedForm === "Login" ? "Sign Up" : "Login";

    const flipFormEvent = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        
        e.preventDefault();
        setSelectedForm(oppositeType);
    }

    return (
        <section id="welcome-page">

            <div id="form-section">

                <AuthForm formType={selectedForm}/>

                <div>
                    <p>Want to <a onClick={flipFormEvent} href="*">{oppositeType.toLowerCase()}</a> instead?</p>
                </div>

                <TestUserButtons />

            </div>

        </section>
    );
}

const TestUserButtons = () => {

    const numberOfUsers = 3;
    const buttons = [];

    for (let i = 1; i <= numberOfUsers; i ++) {
        buttons.push(
            <button id={i.toString()} key={i}>
                User {i}
            </button>
        );
    }

    return (
        <div id="test-user-button-list-section">
            <p>Login as a demo user:</p>
            {buttons}
        </div>
    );
};

interface IAuthFormParams {
    formType: formTypes;
}

/**
 * Can handle Login and Signup form.
 */
const AuthForm = ({formType}: IAuthFormParams) => {

    const dispatch = useDispatch();
    const { sessionErrors } = useSelector((s: AppStateType) => {
        return {
            sessionErrors: s.auth.errors
        }
    });

    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onSubmitAuthForm = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        
        console.log(formType);
        
        if (password && userName) {
            (async () => {
                if (formType === "Login")
                    dispatch(await loginAction(userName, password));
                else
                    dispatch(await signUpAction(userName, password));
            })();
        }
    }

    return (
        <div id="auth-form-wrapper">

            <h1>{formType}</h1>

            <ul id="auth-errors-list">
                { sessionErrors.map((se, i) => <li key={i}>{se}</li>) }
            </ul>

            <form id="auth-form" onSubmit={onSubmitAuthForm}>

                <label htmlFor="user-name-input">User name:</label>
                <input type="text" id="user-name-input" value={userName} placeholder="Your username" onChange={(e)=>setUsername(e.target.value)}/>

                <label htmlFor="password-input">Password</label>
                <input type="password" id="password-input" value={password} onChange={(e)=>setPassword(e.target.value)}/>

                <input type="submit" value="submit" />

            </form>

        </div>
    );
}

export default WelcomePage;
