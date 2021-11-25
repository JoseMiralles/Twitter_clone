import dotenv from "dotenv";
dotenv.config();

import "mocha";
import {expect} from "chai";
import axios from "axios";
import decode from "jwt-decode";

const authUrl = process.env.AUTH_SERVICE_URL;
const gqlUrl = process.env.GRAPHQL_SERVICE_ULR;

const userName = "charles_babbage";
const password = "1234";

const secondUserName = "grace_hopper";
const secondPassword = "1234";

describe("Fetch Users", () => {

    let accessToken: string;
    let userId: string;

    let secondUserId: string;

    before(async () => {

        const res = await axios({
            url: authUrl + "/login",
            method: "POST",
            data: {
                userName: userName,
                password: password
            }
        });

        const res2 = await axios({
            url: authUrl + "/login",
            method: "POST",
            data: {
                userName: secondUserName,
                password: secondPassword
            }
        });

        accessToken = res.data.accessToken;
        userId = decode<{aud: string}>(accessToken).aud;
        secondUserId = decode<{aud: string}>(res2.data.accessToken).aud;
    });

    describe("Single User", async () => {
        
        it ("should get a single user by id", async () => {

            const res = await axios({
                url: gqlUrl,
                method: "POST",
                data: {
                    query: `
                        {
                            user(id: "${userId}") {
                                id
                                userName
                            }
                        }
                    `
                }
            });

            expect(res.data.data.user.userName).to.be.equal(userName);
        })
    });

    describe("Follow", async () => {
        it ("should be able to follow a user, as well as get a list of users being followed", async () => {

            const res = await axios({
                url: gqlUrl,
                method: "POST",
                data: {
                    mutate: `
                        {
                            followUser(id: "${userId}", followeeId: "${secondUserId}")
                        }
                    `
                }
            });

            expect(res.status).to.be.equal(200);

            const res2 = await axios({
                url: gqlUrl,
                method: "POST",
                data: {
                    query: `
                        {
                            getFollowees(id: "${userId}") {
                                id,
                                name
                            }
                        }
                    `
                }
            });
        });
        it ("should be able to retreive a list of the people following the user", async () => {

        });
    });
});
