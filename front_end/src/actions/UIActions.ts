import { modalTypes } from "../model/UIModel";

export interface ISetPageTitle {
    type: "SET_PAGE_TITLE";
    title: string;
}

export interface ISetUILoading {
    type: "SET_UI_LOADING";
    isLoading: boolean;
}

export interface ISetModal {
    type: "CHOOSE_MODAL";
    modal: modalTypes;
}

export type UIActions = ISetPageTitle | ISetUILoading | ISetModal;

export const setTitle = (title: string): ISetPageTitle => ({
    type: "SET_PAGE_TITLE",
    title
} as const);

export const setModal = (modal: modalTypes): ISetModal => ({
    type: "CHOOSE_MODAL",
    modal
} as const);
