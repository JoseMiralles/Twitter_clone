import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import { IUser } from "./model/userModel";
import repo from "./repositories/userRepository";

const UserType: any = new GraphQLObjectType ({
    name: "User",
    description: "A user",
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLString) },
        userName: { type: new GraphQLNonNull(GraphQLString) },
        followes: {
            type: new GraphQLList( UserType ),
            resolve: (user: IUser) => repo.getUserFollowees(user.id)
        }
    }),
});

const rootQueryType = new GraphQLObjectType({
    name: "Query",
    description: "Root Query",
    fields: () => ({

        user: {
            type: UserType,
            description: "Get a single user by id",
            args: { id: { type: GraphQLString } },
            resolve: (
                user: IUser,
                args: { id: string },
                third: any
            ) => repo.getUser(args.id, third)
        }

    })
});

const schema = new GraphQLSchema({
    query: rootQueryType
});

export default schema;
