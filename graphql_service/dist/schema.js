"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var UserType = new graphql_1.GraphQLObjectType({
    name: "User",
    description: "A user",
    fields: function () { return ({
        id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        followes: {
            type: new graphql_1.GraphQLList(UserType),
            resolve: function (user) { return repo.getUserFollowees(user.id); }
        }
    }); },
});
