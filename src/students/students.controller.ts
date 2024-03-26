import { BadRequestException, Body, Controller, Get, Param, Patch, Post, Res, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { StudentsService } from './students.service';
import { AppointmentDto, CoreCurriculamDto, CreateStudentsDto, JoinClub, OfferedClubsDto, OfferedCoursesDto, ParkingDto, RegisteredCourseDto, UpdateStudentsDto } from './students.dto';
import { CoreCurriculam, OfferedClubs, OfferedCoursesEntity, RegisteredCourse } from './students.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';



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
  @UsePipes(ValidationPipe)
  applyParking(@Body() parking: ParkingDto): Promise<ParkingDto>{
    return this.studentsService.applyParking(parking);
    
  }

  @Post('createcurriculam')
  @UsePipes(ValidationPipe)
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

  @Post('courseregistration')
  @UsePipes(ValidationPipe)
  registerCourse(@Body() registeredCourseDto: RegisteredCourseDto): Promise<RegisteredCourseDto> {
  return this.studentsService.courseRegistration(registeredCourseDto)
  }

  @Get('findregisteredstudents')
  async findRegisteredStudents() {
    return this.studentsService.findRegisteredStudents();
  }

  @Post('uploadassignment')
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FileInterceptor('assignmentfile',
    { 
        fileFilter: (req, file, cb) => {
            if (file.originalname.match(/^.*\.(jpg|png|jpeg|pdf)$/))
            cb(null, true);
        else {
            cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
        },
        limits: { fileSize: 60000000 },
        storage:diskStorage({
        destination: './src/students/uploads',
        filename: function (req, file, cb) {
            cb(null,Date.now()+file.originalname)
        },
        })
    }))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException('Assignment file is required');
        }
        
    }

    @Get('/viewassignment/:name')
    getImages(@Param('name') name:string, @Res() res) {
        res.sendFile(name,{ root: './src/students/uploads' })
    }

    @Get('checkstatus')
    getUsersWithDefaultCountry(): Promise<RegisteredCourse[]> {
    return this.studentsService.checkCourseStatus();
  }

  @Post('joinclub')
  @UsePipes(ValidationPipe)
  joinClub(@Body() joinClubDto: JoinClub): Promise<JoinClub> {
    return this.studentsService.joinClub(joinClubDto);
  }

  @Post('appointment')
  @UsePipes(ValidationPipe)
  createAppointment(@Body() appointmentDto: AppointmentDto): Promise<AppointmentDto>{
    return this.studentsService.createAppointment(appointmentDto);
  }
}
