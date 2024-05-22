import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { jwtPayload } from './interfaces/jwt.payload';
import { LoginResponse } from './interfaces/login-response';
import { RegisterDto, CreateUserDto } from './dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
  ) { }


  async create(createUserDto: CreateUserDto): Promise<User> {

    try {
      const { password, ...userData } = createUserDto;
      const newUser = new this.userModel({
        password: bcrypt.hashSync(password, 10),
        ...userData
      });

      await newUser.save();

      const { password: _, ...user } = newUser.toJSON();
      return user;
    }
    catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`${createUserDto.email} already exists`);
      }
      throw new InternalServerErrorException('Something bad Happened');
    }

  }

  findAll():Promise<User[]> {
    return this.userModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  /*  update(id: number, updateAuthDto: UpdateAuthDto) {
     return `This action updates a #${id} auth`;
   } */

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  async login(LoginDTO: LoginDTO): Promise<LoginResponse> {
    const { email, password } = LoginDTO;

    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Invalid credentials - password');
    }

    const { password: _, ...result } = user.toJSON();

    return {
      user: result,
      token: this.generateJWToken({ id: user.id }),
    };
  }

  async register(registerDto:RegisterDto):Promise<LoginResponse>{
    const user = await this.create(registerDto);
    return {
      user:user,
      token:this.generateJWToken({id:user._id})
    }
  }

  generateJWToken(payload: jwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

 async findUserById(id: string) {
    const user = await this.userModel.findById(id);
    const { password: _, ...result } = user.toJSON();
    return result;
  }
}
