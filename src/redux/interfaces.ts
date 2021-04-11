export interface User {
    uid: string | undefined;
    email: string | null;
}

export interface AuthState {
    user: User | null;
    loading: boolean;
}