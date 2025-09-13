import { UserRepository } from "src/domain/repositories/user.repository";
import * as bcrypt from 'bcrypt';

export class LoginUserUseCase {
    constructor (private readonly userRepo: UserRepository){}

    async execute (email: string, password: string): Promise<{ valid: boolean, userId?: string}> {
        const user = await this.userRepo.findByEmail(email);
        if (!user) return { valid: false };

        const match = await bcrypt.compare(password, user.password);
        if (!match) return { valid: false };


        return { valid: true, userId: user.id };
        }}