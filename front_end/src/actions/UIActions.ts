
export interface ISetPageTitle {
    type: "SET_PAGE_TITLE";
    title: string;
}

export interface ISetUILoading {
    type: "SET_UI_LOADING";
    isLoading: boolean;
}

export type UIActions = ISetPageTitle | ISetUILoading;

export const setTitle = (title: string): ISetPageTitle => ({
    type: "SET_PAGE_TITLE",
    title
} as const);
