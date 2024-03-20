import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Admin, Course, Department, Faculty, Staff, Student } from "./admin.entity";
import { MailerModule } from "@nestjs-modules/mailer";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

@Module({
    imports: [MailerModule.forRoot({
        transport: {
        host: 'smtp.gmail.com',
        port: 465,
        ignoreTLS: true,
        secure: true,
        auth: {
        user: 'fahim.mahi@gmail.com',
        pass: 'xdpdfsqwyyxfraxw'
        }
        }, defaults:{
            from: 'fahim.mahi@gmail.com',
          }
        }),TypeOrmModule.forFeature([Admin, Student, Faculty, Staff, Course, Department]),PassportModule,
        JwtModule.register({
          secret: 'secretKey',
          signOptions: { expiresIn: '60m' },
        })],
    controllers: [AdminController],
    providers: [AdminService],
})
export class AdminModule {}
