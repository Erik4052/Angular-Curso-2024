import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtPayload } from '../interfaces/jwt.payload';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private authService:AuthService) { }

  async canActivate(context: ExecutionContext,):Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Forbidden');
    }

    try {
      const payload = await this.jwtService.verifyAsync<jwtPayload>(
        token,
        { secret: process.env.JWT_SECRET }
      );

      const user = await this.authService.findUserById(payload.id);
      if(!user) throw new UnauthorizedException('Forbidden, User not found');
      if(!user.isActive) throw new UnauthorizedException('Forbidden, User is not active');
      
      request['user'] = user;
    } catch (error) {
      throw new UnauthorizedException('Forbidden');
    }
    // 💡 We're assigning the payload to the request object here
    // so that we can access it in our route handlers

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
