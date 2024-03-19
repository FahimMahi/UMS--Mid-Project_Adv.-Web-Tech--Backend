import { Body, Controller, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentsDto, OfferedCoursesDto, UpdateStudentsDto } from './students.dto';
import { OfferedCoursesEntity } from './offeredCourse/course.entity';


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
}
