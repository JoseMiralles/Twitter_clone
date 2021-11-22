import { appActionsTypes } from "../model/appModel";
import { IAuthState } from "../model/authModel";

const initialState: IAuthState = {
    loading: false,
    restoringSession: false,
    errors: []
};

export const authReducer = (
    state: IAuthState = initialState,
    action: appActionsTypes
): IAuthState => {

    switch (action.type) {

        case "SET_AUTH_LOADING":

            return {
                ...state,
                loading: action.isLoading
            };

        case "RECEIVE_SESSION":

            return {
                ...state,
                loading: false,
                userId: action.userId
            };

        case "REMOVE_SESSION":

            return {
                ...state,
                loading: false,
                userId: undefined,
            }

        case "RECEIVE_SESSION_ERRORS":

            return {
                ...state,
                loading: false,
                errors: action.errors
            }

        default: return state;
    }

};
