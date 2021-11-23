
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { AppStateType } from "../model/appModel";
import { login, logout, signup } from "../util/authUtil";

export interface ISetAuthLoading {
    type: "SET_AUTH_LOADING",
    isLoading: boolean
}

export interface IReceiveSession {
    type: "RECEIVE_SESSION";
    userId: string;
}

export interface IRemoveSession {
    type: "REMOVE_SESSION";
    refreshToken: string;
}

export interface IReceiveSessionErrors {
    type: "RECEIVE_SESSION_ERRORS";
    errors: string[];
}

export type authActionTypes =
    ISetAuthLoading |
    IReceiveSession |
    IRemoveSession |
    IReceiveSessionErrors;

export const setAuthLoading = (isLoading: boolean): ISetAuthLoading => ({
    type: "SET_AUTH_LOADING",
    isLoading
});

export const receiveSession = (
    userId: string
): IReceiveSession => ({
    type: "RECEIVE_SESSION",
    userId
});

export const loginAction = async (
    userName: string,
    password: string
): Promise<ThunkAction<void, AppStateType, unknown, AnyAction>> => {

    return async (dispatch) => {
        try {

            const {userId} = await login(userName, password);
            return dispatch(receiveSession(userId));    
        }
        catch (error: any) {

            return dispatch({
                type: "RECEIVE_SESSION_ERRORS",
                errors: [error.response.data.error.message ?? "Something went wrong"]
            } as IReceiveSessionErrors);
        }
    };
};

export const signUpAction = async (
    userName: string,
    password: string
): Promise<ThunkAction<void, AppStateType, unknown, AnyAction>> => {

    return async (dispatch) => {
        try {
            
            const {userId} = await signup(userName, password);
            return dispatch(receiveSession(userId));
        }
        catch (error: any) {
            
            return dispatch({
                type: "RECEIVE_SESSION_ERRORS",
                errors: [error.response.data.error.message ?? "Something went wrong"]
            } as IReceiveSessionErrors);
        }
    }
};

export const logoutAction = async (
    refreshToken: string
): Promise<ThunkAction<void, AppStateType, unknown, AnyAction>> => {

    return async (dispatch) => {
        try {
            
            await logout(refreshToken);
            dispatch({
                type: "REMOVE_SESSION"
            } as IRemoveSession);

        } catch (error: any) {

            console.log(error.message);
        }
    }
};
