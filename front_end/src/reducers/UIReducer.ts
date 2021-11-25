import { appActionsTypes } from "../model/appModel";
import { IUIState } from "../model/UIModel";

const initialState: IUIState  = {
    loading: false,
    pageTitle: ""
}

const UIReducer = (
    state: IUIState = initialState,
    action: appActionsTypes
): IUIState => {

    switch(action.type) {

        case "SET_PAGE_TITLE": {
            return {
                ...state,
                pageTitle: action.title
            }
        }

        case "SET_UI_LOADING": {
            return {
                ...state,
                loading: action.isLoading
            }
        }

        default : return state;
    }
}

export default UIReducer;
