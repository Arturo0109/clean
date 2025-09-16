import { UserRepository } from "src/domain/repositories/user.repository";
import { User } from "src/domain/user.entity";
import * as bcrypt from 'bcrypt';

export class RegisterUserUseCase {
    constructor(private readonly userRepo: UserRepository) {}

    async execute(email: string, password: string): Promise<User> {
        const exists = await this.userRepo.findByEmail(email);
        if (exists) {
            throw new Error('User already exists');
        }

        const hashed = await bcrypt.hash(password, 10);
        const user = new User (
            crypto.randomUUID(),
            email,
            hashed,
            new Date()
        );

        return this.userRepo.create(user);

    }
}