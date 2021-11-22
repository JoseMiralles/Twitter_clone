
export interface IUser {
    userId: string;
    userName: string;
}

export interface IUserState {
    readonly users: {[userId: string]: IUser};
}
