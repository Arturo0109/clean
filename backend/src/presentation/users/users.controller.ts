import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    const user = await this.usersService.register(body.email, body.password);
    return { message: 'Usuario registrado con éxito', userId: user.id };
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.usersService.validateUser(
      body.email,
      body.password,
    );

    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    return { message: 'Login exitoso', userId: user.id };
  }
}
