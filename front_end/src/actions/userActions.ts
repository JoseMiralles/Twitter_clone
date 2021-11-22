import { IUser } from "../model/userModel";

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
