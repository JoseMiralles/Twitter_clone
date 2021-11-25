"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var userRepository_1 = __importDefault(require("./repositories/userRepository"));
var UserType = new graphql_1.GraphQLObjectType({
    name: "User",
    description: "A user",
    fields: function () { return ({
        id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        userName: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        followes: {
            type: new graphql_1.GraphQLList(UserType),
            resolve: function (user) { return userRepository_1.default.getUserFollowees(user.id); }
        }
    }); },
});
var rootQueryType = new graphql_1.GraphQLObjectType({
    name: "Query",
    description: "Root Query",
    fields: function () { return ({
        user: {
            type: UserType,
            description: "Get a single user by id",
            args: { id: { type: graphql_1.GraphQLString } },
            resolve: function (user, args, third) { return userRepository_1.default.getUser(args.id, third); }
        }
    }); }
});
var schema = new graphql_1.GraphQLSchema({
    query: rootQueryType
});
exports.default = schema;
