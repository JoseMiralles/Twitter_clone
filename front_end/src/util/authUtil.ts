import axios from "axios";
import { IUser } from "../model/userModel";


let authUrl = "";
if (process.env.REACT_APP_AUTH_API_URL) {
    authUrl = process.env.REACT_APP_AUTH_API_URL
} else {
    throw new Error("REACT_APP_AUTH_API_URL not specified in .env!");
}

export const login = async (
    username: string,
    password: string
): Promise<{jwt: string, refreshToken: string, userId: string}> => {
    
    const res = await axios({
        url: authUrl + "/login",
        method: "POST",
        data: { username, password }
    });

    console.log(res);
    return res.data;
};

export const signup = async (
    username: string,
    password: string
): Promise<IUser> => {

    const res = await axios({
        url: authUrl + "/signup",
        method: "POST",
        data: { username, password }
    });

    console.log(res);
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
