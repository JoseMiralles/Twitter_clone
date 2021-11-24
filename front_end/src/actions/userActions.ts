import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { AppStateType } from "../model/appModel";
import { IUser } from "../model/userModel";
import { fetchUser } from "../util/userUtil";

export interface IReceiveAllUsers {
    type: "RECEIVE_ALL_USERS",
    users: IUser[];
}

export interface IReceiveOneUser {
    type: "RECEIVE_ONE_USER",
    user: IUser
}

export type UserActionTypes =
    IReceiveAllUsers |
    IReceiveOneUser;

export const receiveAllUsers = (
    users: IUser[]
): IReceiveAllUsers => ({
    type: "RECEIVE_ALL_USERS",
    users
});

export const receiveOneUser = (
    user: IUser
): IReceiveOneUser => ({
    type: "RECEIVE_ONE_USER",
    user
});

export const fetchUserAction = async (
    userId: string
): Promise<ThunkAction<void, AppStateType, unknown, AnyAction>> => {
    return async (dispatch) => {
        try {
            const user = await fetchUser(userId);
            return dispatch(receiveOneUser(user));
        }
        catch(err: any) {
            throw err;
        }
    }
}
