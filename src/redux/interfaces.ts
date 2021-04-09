export interface User {
    uid: string | null;
    email: string | null;
}

export interface AuthState {
    user: User | null;
    loading: boolean;
}