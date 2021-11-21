import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre("save", async function (next): Promise<void> {
    try {
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(
            (this as any).password, salt
        );
        (this as any).password = hashedPassword;
        next();

    } catch (error: any) {
        next(error);
    }
});

/**
 * Performs a hash comparison to see if a password is correct.
 * 
 * @param password raw password received from the client.
 * @returns True if the password is valid.
 */
userSchema.methods.isValidPassword = async function (password: string): Promise<boolean> {
    try {

        return await bcrypt.compare(password, (this as any).password);

    } catch (error) {
        throw error;
    }
}

const user = mongoose.model("user", userSchema);

export default user;
