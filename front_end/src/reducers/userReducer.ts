import { appActionsTypes } from "../model/appModel";
import { IUser, IUserState } from "../model/userModel";

const initialState: IUserState = {
    users: {}
}

export const userReducer = (
    state: IUserState = initialState,
    action: appActionsTypes
): IUserState => {

    switch(action.type) {

        case "RECEIVE_ALL_USERS":

            const userObject: {[userId: string]: IUser} = {};

            action.users.forEach(u => userObject[u.id] = u);

            return {
                ...state,
                users: userObject
            }

        break;

        case "RECEIVE_ONE_USER":

            const addition: {[userId: string]: IUser} = {};
            addition[action.user.id] = action.user;

            return {
                ...state,
                users: Object.assign(state.users, addition)
            }

        break;

        case "REMOVE_SESSION": {

            return {
                ...state,
                users: {}
            }
        }

        default: return state;

    }
}
