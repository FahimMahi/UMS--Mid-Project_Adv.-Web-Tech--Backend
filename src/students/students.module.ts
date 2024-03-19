import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { StudentsEntity } from './students.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfferedCoursesEntity } from './offeredCourse/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StudentsEntity,OfferedCoursesEntity]),],
  providers: [StudentsService],
  controllers: [StudentsController]
})
export class StudentsModule {}
