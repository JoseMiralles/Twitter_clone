import { applyMiddleware, combineReducers, createStore, Store } from "redux";
import { authActionTypes } from "../actions/authActions";
import { UserActionTypes } from "../actions/userActions";
import { authReducer } from "../reducers/authReducer";
import { isDev } from "../util/enviromentUtil";
import logger from "redux-logger";
import thunk from "redux-thunk";

export type appActionsTypes =
    UserActionTypes |
    authActionTypes;

const rootReducer = combineReducers({
    auth: authReducer
});

export type AppStateType = ReturnType<typeof rootReducer>;

export const configureStore = (): Store<AppStateType> => {

    const middleWare = isDev() ? [logger] : [];

    return createStore(
        rootReducer,
        applyMiddleware(
            thunk,
            ...middleWare
        )
    );
};
