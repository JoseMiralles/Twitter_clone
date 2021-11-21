import mongoose, { mongo } from "mongoose";


//@ts-ignore Issue with mongoose type not including "useNewUrlParser", or "useUnifiedTopology".
mongoose.connect(
    process.env.MONGODB_URL ?? "MONGODB_URI not defined!",
    {
        dbName: process.env.DB_NAME ?? "DB_NAME not defined!",
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    },
).then(() => {

    console.log("MongoDB connected.");

}).catch((err) => {

    console.log(err.message);
});

mongoose.connection.on("connected", () => {

    console.log("Mongoose connected to db");
});

mongoose.connection.on("error", (err) => {
    
    console.log(err.message);
});

mongoose.connection.on("disconnected", () => {

    console.log("Disconnected from MongoDB")
});

// This process runs with we end the app.
process.on("SIGINT", async () => {

    await mongoose.connection.close();
    process.exit(0);
});
