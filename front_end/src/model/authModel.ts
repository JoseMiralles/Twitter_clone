
export interface IAuthState {
    readonly userId?: string;
    readonly loading: boolean;
    readonly restoringSession: boolean;
    readonly errors: string[];
}
