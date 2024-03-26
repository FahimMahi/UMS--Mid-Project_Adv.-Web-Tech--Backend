import { Module } from "@nestjs/common";
import { TeacherController } from "./teacher.controller";
import { TeacherService } from "./teacher.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TeacherEntity } from "./teacher.entity";
import { MailerModule } from "@nestjs-modules/mailer";

@Module({
    imports:[TypeOrmModule.forFeature([TeacherEntity])],
    controllers: [TeacherController],
    providers:[TeacherService],
})
export class TeacherModule{}