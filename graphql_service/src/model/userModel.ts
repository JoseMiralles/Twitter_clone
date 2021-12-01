
export interface IUser {
    id: string;
    name: string;
    followees?: IUser[]
}

export interface IUserRepository {
    getUser: (userId: string, third: any) => Promise<IUser>;
    getUserFollowees: (userId: string) => Promise<IUser[]>;
    followUser: (userId: string, followeeId: string, request:any) => Promise<boolean>;
    unfollowUser: (userId: string, followeeId: string, request: any) => Promise<boolean>;
}
