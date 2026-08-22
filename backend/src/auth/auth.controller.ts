import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login/phone')
  async loginByPhone(@Body() body: { phone: string; code: string }) {
    // 实际业务需要校验短信验证码，这里默认通过
    if (!body.phone) throw new Error('Phone number is required');
    return this.authService.loginByPhone(body.phone);
  }

  @Post('admin/login')
  async adminLogin(@Body() body: Record<string, any>) {
    const { username, password } = body;
    if (!username || !password) {
      throw new UnauthorizedException('Username and password are required');
    }
    return this.authService.adminLogin(username, password);
  }
}
