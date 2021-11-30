import axios from "axios";
import { expect } from "chai";
import { gqlUrl, login, password, userName } from "./helpers/helpers";

describe("Tweets", async () => {

    const res = await login(userName, password);
    const userId = res.userId;
    const accessToken = res.accessToken;

    describe("Compose tweet", () => {

        it("Should return the posted tweet with a tweet id included", async () => {

            const text = "This is a test tweet!"

            const res = await axios({
                url: gqlUrl,
                method: "POST",
                data: {
                    mutation: `
                        {
                            composeTweet(userId: ${userId}, text: ${text}) {
                                id
                                userId
                                text
                            }
                        }
                    `
                }
            });

            expect(res.status).to.be.equal(200);
            expect(res.data.data.text).to.be.equal(text);
            expect(res.data.data.userId).to.be.equal(userId);
            expect(res.data.data.id.length).to.be.greaterThanOrEqual(1);
        });
    });
});
