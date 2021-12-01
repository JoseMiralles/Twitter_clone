import { IUser, IUserRepository } from "../model/userModel";
import mongoose, { Schema } from "mongoose";
import createHttpError from "http-errors";
import { decode } from "jsonwebtoken";

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    followees: [{ type: Schema.Types.ObjectId, ref: "users" }]
});

const User = mongoose.model("user", userSchema);

class MongoDBUserRepository implements IUserRepository {

    private extractUserIdFromRequest (request: any): string | null {
        let jwt: any = Object.values(request.rawHeaders).find(
            (k:any) => k.includes("Bearer")
        );
        jwt = jwt.split(" ")[1];
        jwt = decode(jwt);
        return jwt.aud;
    }

    private checkUserAuthorization (
        resourceId: string,
        request: any
    ): void {

        const claimUserId = this.extractUserIdFromRequest(request);

        if (!claimUserId || claimUserId !== resourceId )
            throw new createHttpError.Unauthorized();
    }

    public async getUser (userId: string, request: any): Promise<IUser> {

        const user = await User.findById(userId);
        
        if (!user) throw new createHttpError.NotFound("This user does not exist");
        return user;
    }

    public async getUserFollowees (userId: string): Promise<IUser[]> {

        let user = await User.findById(userId);

        if (!user) throw new createHttpError.NotFound("This user does not exist");

        let followees = await User.find(user.followees);

        return followees;
    }

    public async followUser (
        userId: string,
        followeeId: string,
        request: any
    ): Promise<boolean> {

        // TODO: Ensure that the userId is the same as the jwt.
        this.checkUserAuthorization(userId, request);

        const user = User.findById(userId);

        if (!user) throw new createHttpError.NotFound();

        user.followees.push(followeeId);
        user.save();

        return true;
    }

    public async unfollowUser(
        userId: string,
        followeeId: string,
        request: any
    ): Promise<boolean> {

        this.checkUserAuthorization(userId, request);

        const user: any = User.findById(userId);

        if (!user) throw new createHttpError.notFound();

        user.followees.pull({_id: followeeId});
        user.save();

        return true;
    }
}


const repo = new MongoDBUserRepository();
export default repo;
