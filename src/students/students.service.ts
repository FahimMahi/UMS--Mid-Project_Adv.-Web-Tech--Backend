import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentsEntity } from './students.entity';
import { Repository } from 'typeorm';
import { CreateStudentsDto, OfferedCoursesDto, UpdateStudentsDto } from './students.dto';
import { OfferedCoursesEntity } from './offeredCourse/course.entity';

@Injectable()
export class StudentsService {
  constructor(@InjectRepository(StudentsEntity) private studentsRepo: Repository<StudentsEntity>,@InjectRepository(OfferedCoursesEntity) private courseRepo: Repository<OfferedCoursesEntity>) {}
  

  createStudents(createStudents: CreateStudentsDto): Promise<CreateStudentsDto> {
    return this.studentsRepo.save(createStudents);
  }

  async updateStudents(id: number, updateStudent: UpdateStudentsDto) {
    return await this.studentsRepo.update(id, updateStudent);
  }

  createCourse(createCourse: OfferedCoursesDto) {
    return this.courseRepo.save(createCourse);
  }

  searchCourseBySemister(semister: string): Promise<OfferedCoursesEntity[]>{
  return this.courseRepo.find({where: {semister}})
  }
}
