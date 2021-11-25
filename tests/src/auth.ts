import dotenv from "dotenv";
dotenv.config();

import "mocha";
import axios from "axios";
import { assert } from "console";
import { expect } from "chai";

const authUrl = process.env.AUTH_SERVICE_URL;
const gqlUrl = process.env.GRAPHQL_SERVICE_ULR;

describe("Authentication", () => {

    let accessToken: string;
    let refreshToken: string;

    before(async () => {

        if (!accessToken) {
            const res = await axios({
                url: authUrl + "/login",
                method: "POST",
                data: {
                    userName: "charles_babbage",
                    password: "1234"
                }
            });

            accessToken = res.data.accessToken;
            refreshToken = res.data.refreshToken;
        }
    });

    describe("Login", () => {
        it ("Should return an access token and a refresh token", () => {

            expect(accessToken).to.be.string;
            expect(refreshToken).to.be.string;
        });
    });

    describe("Refresh Token", () => {
        it ("Should return a new access token, and a new refresh token", async () => {

            const res = await axios({
                url: authUrl + "/refresh-token",
                method: "POST",
                data: {
                    refreshToken
                }
            });

            accessToken = res.data.accessToken;
            refreshToken = res.data.refreshToken;

            expect(res.data.accessToken).to.be.string;
            expect(res.data.refreshToken).to.be.string;
        });
    });
});