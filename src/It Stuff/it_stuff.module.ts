import { Module } from '@nestjs/common';
import { ITStuffController } from './it_stuff.controller';
import { ITStuffService } from './it_stuff.service';
import { ITStuffEntity } from './it_stuff.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer/dist';
import { StudentEntity } from './students.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([ITStuffEntity,StudentEntity]),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'durjoyghosh716@gmail.com',
          pass: 'wikaucdfxljkgmau',
        },
      },
      defaults: {
        from: 'durjoyghosh716@gmail.com',
      },
      
    }),
    PassportModule,
    JwtModule.register({
      secret: 'secretKey', // Your secret key for JWT
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [ITStuffController],
  providers: [ITStuffService],
})
export class ITStuffModule {}
