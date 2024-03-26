import { Body, Controller, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CoreCurriculamDto, CreateStudentsDto, OfferedClubsDto, OfferedCoursesDto, ParkingDto, UpdateStudentsDto } from './students.dto';
import { CoreCurriculam, OfferedClubs, OfferedCoursesEntity } from './students.entity';



@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post('addstudents')
  @UsePipes(ValidationPipe)
  addStudents(@Body() createUserDto: CreateStudentsDto): Promise<CreateStudentsDto>{
    return this.studentsService.createStudents(createUserDto);
  }

  @Patch('update/:id')
  @UsePipes(ValidationPipe)
  updateStudent(@Param('id') id:number, @Body() updateStudent: UpdateStudentsDto){
    return this.studentsService.updateStudents(id, updateStudent);
  }

  @Post('createcourse')
  @UsePipes(ValidationPipe)
  createCourse(@Body() createCourseDto: OfferedCoursesDto): Promise<OfferedCoursesDto> {
    return this.studentsService.createCourse(createCourseDto);
  }

  @Get('offeredcourse/:semister')
  searchCodeBySemister(@Param('semister') semister: string): Promise<OfferedCoursesEntity[]> {
   return this.studentsService.searchCourseBySemister(semister);
  }

  @Post('applyparking')
    applyParking(@Body() parking: ParkingDto): Promise<ParkingDto>{
      return this.studentsService.applyParking(parking);
    
  }

  @Post('createcurriculam')
  createCuriculam(@Body() createCuriculam: CoreCurriculamDto): Promise<CoreCurriculamDto>{
    return this.studentsService.coreCurriculam(createCuriculam);
  }

  @Get('findcurriculam')
  async findCurriculam(): Promise<CoreCurriculam[]>{
    return this.studentsService.findCurriculam();
  }

  @Post('createclubs')
  createOfferedCLubs(@Body() createClubs: OfferedClubsDto): Promise<OfferedClubsDto>{
    return this.studentsService.createOfferedClubs(createClubs);
  }

  @Get('findclubs')
  async findClubs(): Promise<OfferedClubs[]>{
    return this.studentsService.findClubs();
  }
}
