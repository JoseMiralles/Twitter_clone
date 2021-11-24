
export interface IUser {
    id: string;
    userName: string;
}

export interface IUserState {
    readonly users: {[userId: string]: IUser};
}
