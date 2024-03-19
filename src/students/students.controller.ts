import { Body, Controller, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentsDto, UpdateStudentsDto } from './students.dto';
import { StudentsEntity } from './students.entity';

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

  
}
