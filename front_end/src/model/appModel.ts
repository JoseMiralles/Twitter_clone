import { applyMiddleware, combineReducers, createStore, Store } from "redux";
import { authActionTypes } from "../actions/authActions";
import { UserActionTypes } from "../actions/userActions";
import { authReducer } from "../reducers/authReducer";
import { isDev } from "../util/enviromentUtil";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { userReducer } from "../reducers/userReducer";
import { UIActions } from "../actions/UIActions";
import UIReducer from "../reducers/UIReducer";

export type appActionsTypes =
    UserActionTypes |
    authActionTypes |
    UIActions;

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    ui: UIReducer
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
