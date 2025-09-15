import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../infrastructure/prisma.service';
import { UserPrismaRepository } from '../../infrastructure/prisma/repositories/user.prisma.repository';
import { RegisterUserUseCase } from '../../application/register-user.usecase';
import { LoginUserUseCase } from '../../application/login-user.usecase';

@Injectable()
export class AuthService {
    private readonly userRepo: UserPrismaRepository;

    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ) {
        this.userRepo = new UserPrismaRepository(prisma);
    }

    async register(email: string, password: string) {
        const registerUseCase = new RegisterUserUseCase(this.userRepo);
        const user = await registerUseCase.execute(email, password);


        const payload = { sub: user.id, email: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async login(email: string, password: string) {
        const loginUseCase = new LoginUserUseCase(this.userRepo);
        const result = await loginUseCase.execute(email, password);

        if (!result.valid) {
            throw new Error('Invalid credentials');
        }

        const payload = { sub: result.userId, email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}