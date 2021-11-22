import axios from "axios";
import { IUser } from "../model/userModel";

let authUrl;
if (process.env.AUTH_API_URL) {
    authUrl = process.env.AUTH_API_URL
} else {
    throw new Error("AUTH_API_URL not specified in .env!");
}

const login = async (
    username: string,
    password: string
): Promise<IUser> => {
    
    const res = await axios({
        method: "POST",
        data: { username, password }
    });

    console.log(res);
    return res.data;
};

const signup = async (
    username: string,
    password: string
): Promise<IUser> => {

    const res = await axios({
        method: "POST",
        data: { username, password }
    });

    console.log(res);
    return res.data;
};

const logout = async (
    refreshToken: string
): Promise<boolean> => {

    const res = await axios({
        method: "DELETE",
        data: { refreshToken }
    });

    return true;
};
