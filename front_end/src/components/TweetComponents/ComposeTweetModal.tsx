import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setModal } from "../../actions/UIActions";
import ProfileIcon from "../ProfileIcon";
import "./compose-tweet-modal.scss"

const ComposeTweetModal = () => {

    const [body, setBody] = useState("");

    const dispatch = useDispatch();

    const closeModal = () => {
        dispatch(setModal("NONE"));
    }

    return (
        <section id="modal-wrapper">
            <div id="compose-tweet-modal">

                <div id="modal-top-bar">
                    <button id="close-modal-button" onClick={closeModal}>X</button>
                </div>
                
                <div id="form-icon-row">
                    <ProfileIcon/>
                    <form id="compose-tweet-form">
                        <textarea
                            id="tweet-body-input"
                            placeholder="What's happening?"
                            value={body}
                            onChange={(e) => {setBody(e.target.value)}} />
                    </form>
                </div>

                <div id="under-form-row">
                    <button>Post</button>
                </div>

            </div>
        </section>
    );
}

export default ComposeTweetModal;
