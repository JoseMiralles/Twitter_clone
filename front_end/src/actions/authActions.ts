
export interface ISetAuthLoading {
    type: "SET_AUTH_LOADING",
    isLoading: boolean
}

export interface IReceiveSession {
    type: "RECEIVE_SESSION";
    jwt: string;
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
    jwt: string,
    refreshToken: string,
    userId: string
): IReceiveSession => ({
    type: "RECEIVE_SESSION",
    jwt,
    refreshToken,
    userId
});
