import { Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login() {
    const mockUser = {
      id: 1,
      username: 'admin',
    };

    return this.authService.login(mockUser);
  }
}
