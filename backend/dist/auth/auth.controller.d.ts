import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    loginByPhone(body: {
        phone: string;
        code: string;
    }): Promise<{
        access_token: string;
        user: import("../entities/user.entity").User;
    }>;
    adminLogin(body: Record<string, any>): Promise<{
        access_token: string;
        user: {
            username: string;
            role: string;
        };
    }>;
}
