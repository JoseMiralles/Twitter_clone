import React, { useState } from "react";
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

            </div>

        </section>
    );
}

interface IAuthFormParams {
    formType: formTypes;
}

/**
 * Can handle Login and Signup form.
 */
const AuthForm = ({formType}: IAuthFormParams) => {

    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const submitFunction = formType === "Login" ? async()=>{} : async()=>{};

    const onSubmitAuthForm = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        
        console.log(formType);
        
        if (password && userName) {
            
            (async () => {
                await submitFunction();
            })();
        }
    }

    return (
        <div id="auth-form-wrapper">

            <h1>{formType}</h1>

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
