import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentsEntity } from './students.entity';
import { Repository } from 'typeorm';
import { CreateStudentsDto, UpdateStudentsDto } from './students.dto';

@Injectable()
export class StudentsService {
  constructor(@InjectRepository(StudentsEntity) private studentsRepo: Repository<StudentsEntity>) {}

  createStudents(createStudents: CreateStudentsDto): Promise<CreateStudentsDto> {
    return this.studentsRepo.save(createStudents);
  }

  async updateStudents(id: number, updateStudent: UpdateStudentsDto) {
    return await this.studentsRepo.update(id, updateStudent)
  }
}
