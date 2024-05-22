import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'process';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports:[
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{
      name:'User',
      schema: UserSchema
    }]),
    JwtModule.register({
      secret :process.env.JWT_SECRET,
      signOptions: {expiresIn: '6h'},
    })
  ]
})
export class AuthModule {}
