import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { StudentsEntity, OfferedCoursesEntity, ParkingEntity, CoreCurriculam, OfferedClubs, RegisteredCourse, JoinCLub } from './students.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [TypeOrmModule.forFeature([StudentsEntity,OfferedCoursesEntity, ParkingEntity, CoreCurriculam, OfferedClubs, RegisteredCourse, JoinCLub]), AuthModule,],
  providers: [StudentsService],
  controllers: [StudentsController]
})
export class StudentsModule {}
