import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async loginByPhone(phone: string) {
    let user = await this.userRepository.findOne({ where: { phone } });
    if (!user) {
      user = this.userRepository.create({ phone, nickname: `用户_${phone.slice(-4)}` });
      user = await this.userRepository.save(user);
    }
    
    const payload = { sub: user.id, phone: user.phone };
    return {
      access_token: this.jwtService.sign(payload),
      user
    };
  }

  async adminLogin(username: string, pass: string) {
    const adminUsername = process.env.ADMIN_USERNAME || 'i';
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      throw new Error('ADMIN_PASSWORD environment variable is not set');
    }

    if (username === adminUsername && pass === adminPassword) {
      const payload = { sub: 'admin', role: 'admin' };
      return {
        access_token: this.jwtService.sign(payload),
        user: { username, role: 'admin' }
      };
    }
    
    throw new UnauthorizedException('Invalid admin credentials');
  }
}
