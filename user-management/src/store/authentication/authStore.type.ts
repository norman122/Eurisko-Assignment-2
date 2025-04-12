export interface AuthState {
    accessToken: string | null;
    expiresIn: number | null;
    setToken: (token: string, expiresIn: number) => void;
    clearToken: () => void;
}
