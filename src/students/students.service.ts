import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentsEntity, OfferedCoursesEntity, ParkingEntity  } from './students.entity';
import { Repository } from 'typeorm';
import { CreateStudentsDto, OfferedCoursesDto, ParkingDto, UpdateStudentsDto } from './students.dto';

@Injectable()
export class StudentsService {
  constructor(@InjectRepository(StudentsEntity) private studentsRepo: Repository<StudentsEntity>,@InjectRepository(OfferedCoursesEntity) private courseRepo: Repository<OfferedCoursesEntity>,
  @InjectRepository(ParkingEntity) private parkingRepo: Repository<ParkingEntity>
  ) {}
  

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

  applyParking(parking: ParkingDto): Promise<ParkingDto> {
    return this.parkingRepo.save(parking);
  }

}
