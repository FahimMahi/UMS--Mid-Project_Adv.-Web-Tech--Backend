import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { StudentsEntity, OfferedCoursesEntity, ParkingEntity, CoreCurriculam, OfferedClubs, RegisteredCourse } from './students.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([StudentsEntity,OfferedCoursesEntity, ParkingEntity, CoreCurriculam, OfferedClubs, RegisteredCourse]),],
  providers: [StudentsService],
  controllers: [StudentsController]
})
export class StudentsModule {}
