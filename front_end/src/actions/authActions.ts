
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { AppStateType } from "../model/appModel";
import { login } from "../util/authUtil";

export interface ISetAuthLoading {
    type: "SET_AUTH_LOADING",
    isLoading: boolean
}

export interface IReceiveSession {
    type: "RECEIVE_SESSION";
    accessToken: string;
    refreshToken: string;
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
    accessToken: string,
    refreshToken: string,
    userId: string
): IReceiveSession => ({
    type: "RECEIVE_SESSION",
    accessToken,
    refreshToken,
    userId
});

export const loginAction = async (
    userName: string,
    password: string
): Promise<ThunkAction<void, AppStateType, unknown, AnyAction>> => {
    return async (dispatch) => {
        try {
            const {accessToken, refreshToken, userId} = await login(userName, password);
            return dispatch(receiveSession(accessToken, refreshToken, userId));    
        }
        catch (error: any) {
            return dispatch({
                type: "RECEIVE_SESSION_ERRORS",
                errors: [error.response.data.error.message ?? "Something went wrong"]
            } as IReceiveSessionErrors);
        }
    };
};
