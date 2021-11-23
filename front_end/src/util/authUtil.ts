import axios from "axios";
import jwtDecode from "jwt-decode";
import { IUser } from "../model/userModel";


let authUrl = "";
if (process.env.REACT_APP_AUTH_API_URL) {
    authUrl = process.env.REACT_APP_AUTH_API_URL
} else {
    throw new Error("REACT_APP_AUTH_API_URL not specified in .env!");
}

type AuthPayload = {userId: string};

export const login = async (
    userName: string,
    password: string
): Promise<AuthPayload> => {
    
    const res = await axios({
        url: authUrl + "/login",
        method: "POST",
        data: { userName, password }
    });

    receiveTokens(res.data.accessToken, res.data.refreshToken);

    return res.data;
};

export const signup = async (
    userName: string,
    password: string
): Promise<AuthPayload> => {

    const res = await axios({
        url: authUrl + "/register",
        method: "POST",
        data: { userName, password }
    });

    receiveTokens(res.data.accessToken, res.data.refreshToken);

    return res.data;
};

export const logout = async (
    refreshToken: string
): Promise<boolean> => {

    await axios({
        url: authUrl + "/logout",
        method: "DELETE",
        data: { refreshToken }
    });

    return true;
};

/**
 * Attempts to restore the previous session.
 * 
 * @returns The user id if the session was restored. Undefined otherwise.
 */
export const restoreSession = async (): Promise<string | undefined> => {

    return (await performTokenRefresh())?.userId;
};

/**
 *  Setups axios headers and middleware to always include jwt.
 *  And to automatically refresh the tokens when the jwt goes stale.
 *  It also persists the refreshToken.
 */
export const receiveTokens = (
    accessToken: string,
    refreshToken: string
): void => {

    // Adds the access token to the header of every request.
    axios.defaults.headers.common["Authorization"] = "Bearer" + accessToken;
    
    const expirationTime = (jwtDecode(accessToken) as any).exp;
    const expDate = new Date(expirationTime * 1000);

    // Set the token to refresh automatically if it is expired.
    // This middleware quietly runs before every request.
    axios.interceptors.request.use(async function (config) {

        // If the token is expired, refresh it.
        if (new Date() >= expDate && !refreshToken) {

            refreshingToken = true;
            await performTokenRefresh();
            refreshingToken = false;
        }

        return config;
    });

    // Persist refresh token
    persistRefreshToken(refreshToken);
};

let refreshingToken = false;

/**
 * Refreshes both tokens.
 * Can be used to restore a session.
 */
export const performTokenRefresh = async (): Promise<AuthPayload | null> => {

    let refreshToken = loadRefreshToken();

    // Session cannot be restored.
    if (!refreshToken) return null;

    const res = await axios({
        url: authUrl + "/refresh-token",
        method: "POST",
        data: { refreshToken }
    });

    refreshToken = res.data.refreshToken;
    const accessToken = res.data.accessToken;
    
    // Token restoration was rejected.
    if (!refreshToken || !accessToken) return null;

    receiveTokens(accessToken, refreshToken);

    return res.data
};

export let jwtExpirationTime: Date;

export const persistRefreshToken = (
    refreshToken: string
): void => {
    localStorage.setItem("trt", refreshToken);
}

export const loadRefreshToken = (): string | null => {
    return localStorage.getItem("trt");
}

export const removeRefreshToken = () => {
    localStorage.removeItem("trt");
}
