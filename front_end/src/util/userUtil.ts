import axios from "axios";
import { IUser } from "../model/userModel";

let gqlUrl: string;

if (process.env.REACT_APP_GQL_API_URL) {
    gqlUrl = process.env.REACT_APP_GQL_API_URL
} else {
    throw new Error("REACT_APP_GQL_API_URL not specified in .env!");
}

export const fetchUser = async (userId: string): Promise<IUser> => {

    console.log("URL" + gqlUrl);

    const res = await axios({
        url: gqlUrl,
        method: "POST",
        data: {
            query: `{ user(id: "${userId}") { id userName } }`
        }
    });

    return res.data.data.user;
}
