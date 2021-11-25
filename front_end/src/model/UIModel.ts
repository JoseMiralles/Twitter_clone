
export type modalTypes = "COMPOSE" | "NONE";

export interface IUIState {
    pageTitle: string;
    loading: boolean;
    modal: modalTypes;
}
