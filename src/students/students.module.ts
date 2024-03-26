import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { StudentsEntity, OfferedCoursesEntity, ParkingEntity, CoreCurriculam } from './students.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([StudentsEntity,OfferedCoursesEntity, ParkingEntity, CoreCurriculam]),],
  providers: [StudentsService],
  controllers: [StudentsController]
})
export class StudentsModule {}
