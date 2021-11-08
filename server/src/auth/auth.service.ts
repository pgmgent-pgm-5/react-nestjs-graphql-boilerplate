import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
    ) {}

    validate (email: string, password: string): | null {
        const user = null;

        if (!user) {
            return null;
        }

        const passwordIsValid = password === user.password;
        return passwordIsValid ? user : null;
    }

    login (user: User): { access_token: string} {
        const payload = {
            email: user.email,
            sub: user.userId
        };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async verify (token: string): Promise<User> {
        
    }
}
