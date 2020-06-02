import {TOKEN} from '../app.config';

export class TokenService {
    get token(): string {
        return localStorage.getItem(TOKEN) || '';
    }

    set token(value: string) {
        localStorage.setItem(TOKEN, value);
        document.cookie = `token=${value};path=/`;
    }

    clearTokens(): void {
        localStorage.removeItem(TOKEN);
    }
}
