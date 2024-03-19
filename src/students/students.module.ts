import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { StudentsEntity } from './students.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([StudentsEntity]),],
  providers: [StudentsService],
  controllers: [StudentsController]
})
export class StudentsModule {}
