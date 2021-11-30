import dotenv from "dotenv";
dotenv.config();

import "mocha";
import {expect} from "chai";
import axios from "axios";
import decode from "jwt-decode";
import { authUrl, gqlUrl, password, secondPassword, secondUserName, userName } from "./helpers/helpers";


describe("Users", () => {

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
});
