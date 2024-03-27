import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentsEntity, OfferedCoursesEntity, ParkingEntity, CoreCurriculam, OfferedClubs, RegisteredCourse, JoinCLub,  Appointment, ApplyHostel  } from './students.entity';
import { Repository } from 'typeorm';
import {  ApplyHostelDto, AppointmentDto, CoreCurriculamDto, CreateStudentsDto, JoinClub, OfferedClubsDto, OfferedCoursesDto, ParkingDto, RegisteredCourseDto, UpdateStudentsDto } from './students.dto';

@Injectable()
export class StudentsService {
  constructor(@InjectRepository(StudentsEntity) private studentsRepo: Repository<StudentsEntity>,@InjectRepository(OfferedCoursesEntity) private courseRepo: Repository<OfferedCoursesEntity>,
  @InjectRepository(ParkingEntity) private parkingRepo: Repository<ParkingEntity>,
  @InjectRepository(CoreCurriculam) private curriculamRepo: Repository<CoreCurriculam>,
  @InjectRepository(OfferedClubs) private offeredClubsRepo: Repository<OfferedClubs>,
  @InjectRepository(RegisteredCourse) private registeredCourseRepo: Repository<RegisteredCourse>,
  @InjectRepository(JoinCLub) private joinClubRepo: Repository<JoinCLub>,
  @InjectRepository(Appointment) private appointmentRepo: Repository<Appointment>,
  @InjectRepository(ApplyHostel) private hostelRepo: Repository<ApplyHostel>
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

  coreCurriculam(createCuriculam: CoreCurriculamDto){
    return this.curriculamRepo.save(createCuriculam);
  }

  async findCurriculam(): Promise<CoreCurriculam[]>{
    return this.curriculamRepo.find()
  }
  
  createOfferedClubs(createClubsDto: OfferedClubsDto) {
    return this.offeredClubsRepo.save(createClubsDto);
  }

  async findClubs(): Promise<OfferedClubs[]>{
    return this.offeredClubsRepo.find()
  }

  courseRegistration(registeredCourseDto: RegisteredCourseDto) {
    return this.registeredCourseRepo.save(registeredCourseDto);
  }

  async findRegisteredStudents() {
    return await this.registeredCourseRepo.find({
      relations: {
        students: true,
      }
    })
  }


  checkCourseStatus(): Promise<RegisteredCourse[]> {
    return this.registeredCourseRepo.find({ where: { CourseStatus: 'Invalid' } });
  }

  joinClub(joinClubDto: JoinClub) {
    return this.joinClubRepo.save(joinClubDto);
  }

  async createAppointment(appointmentDto: AppointmentDto) {
    return this.appointmentRepo.save(appointmentDto);
  }

  async getAppointmentDetails(id: number): Promise<Appointment> {
    return await this.appointmentRepo.findOne({ where: { id } });
  }

  joinHostel(joinHostelDto: ApplyHostelDto) {
    return this.hostelRepo.save(joinHostelDto);
  }

  async getHostelDetails(id: number): Promise<ApplyHostel> {
    return await this.hostelRepo.findOne({ where: { id } });
  }

}
