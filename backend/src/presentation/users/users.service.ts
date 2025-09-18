import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from './users.repository';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private usersRepo: UsersRepository) {}

  async register(email: string, password: string): Promise<User> {
    const exists = await this.usersRepo.findByEmail(email);
    if (exists) throw new BadRequestException('El usuario ya existe');

    const hashed = await bcrypt.hash(password, 10);
    return this.usersRepo.createUser(email, hashed);
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersRepo.findByEmail(email);
    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : null;
  }
}
