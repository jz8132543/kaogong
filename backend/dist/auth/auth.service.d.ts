import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    loginByPhone(phone: string): Promise<{
        access_token: string;
        user: User;
    }>;
    adminLogin(username: string, pass: string): Promise<{
        access_token: string;
        user: {
            username: string;
            role: string;
        };
    }>;
}
