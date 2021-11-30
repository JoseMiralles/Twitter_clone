import axios from "axios";
import decode from "jwt-decode";

export const authUrl = process.env.AUTH_SERVICE_URL;
export const gqlUrl = process.env.GRAPHQL_SERVICE_ULR;

export const userName = "charles_babbage";
export const password = "1234";

export const secondUserName = "grace_hopper";
export const secondPassword = "1234";

interface ILoginRes {
    userId: string;
    accessToken: string;
    refreshToken: string;
}

/**
 * @returns An object containing the userId and the accessToken.
 */
export const login = async (
    userName: string,
    password: string
): Promise<ILoginRes> => {

    const res = await axios({
        url: authUrl,
        method: "POST",
        data: {
            userName,
            password
        }
    });

    return {
        userId: decode<{aud: string}>(res.data.accessToken).aud,
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken
    }
}
