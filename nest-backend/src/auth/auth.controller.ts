import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, CreateUserDto, LoginDTO, CreateAuthDto } from './dto'
import { AuthGuard } from './guards/auth.guard';
import { User } from './entities/user.entity';
import { LoginResponse } from './interfaces/login-response';
//import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  create(@Body() createUserDTO: CreateUserDto) {
    return this.authService.create(createUserDTO);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req: Request) {
    console.log(req);
    const user = req['user'];
    return this.authService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('check-token')
  checkToken(@Request() req: Request): LoginResponse {
    const user = req['user'];
    return {
      user,
      token: this.authService.generateJWToken(user)
    };

  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  /*  @Patch(':id')
   update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
     return this.authService.update(+id, updateAuthDto);
   } */

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }

  @Post('/login')
  login(@Body() LoginDTO: LoginDTO) {
    return this.authService.login(LoginDTO);
  }

  @Post('/register')
  register(@Body() resgisterDTO: RegisterDto) {
    return this.authService.register(resgisterDTO);
  }

}
