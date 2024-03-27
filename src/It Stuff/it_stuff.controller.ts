import { Body, Controller, Get, Param, Post, Put, Patch, Query, UsePipes,NotFoundException, ValidationPipe, Delete,  UploadedFile, UseInterceptors, ParseIntPipe, Session, HttpException, HttpStatus, UseGuards,  } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ITStuffService } from './it_stuff.service';
import { ITStuffEntity} from './it_stuff.entity';
import { MulterError } from 'multer';
import { diskStorage } from 'multer';
import { MailerService } from '@nestjs-modules/mailer';
import { SessionGuard } from './it_stuff_session_guard';
import { CreateITStaffDto} from './it_stuff.dto';
import { StudentEntity } from './students.entity';

@Controller('/it-stuff')

export class ITStuffController 
{
  constructor(private readonly itStuffService: ITStuffService,
    private readonly mailerService: MailerService) {}

  // : Get a list of all IT staff
  @Get()
  async getAllITStaff() {
    return this.itStuffService.getAllITStaff();
  }

  // : Get IT staff by ID
  @Get(':id')
  @UsePipes(new ParseIntPipe()) // Transformation: Convert id to number
  async getITStaffById(@Param('id') id: number) {
    return this.itStuffService.getITStaffById(id);
  }

  // : Create a new IT staff
  @Post('/create')
  @UsePipes(new ValidationPipe()) 
  async createITStaff(@Body() createITStaffDto: CreateITStaffDto) {
    return this.itStuffService.createITStuff(createITStaffDto);
  }

  // : Update IT staff by ID
  @Put('update/:id')
  @UsePipes(new ValidationPipe()) 
  async updateITStaff(@Param('id') id: number, @Body() updateITStaffDto: CreateITStaffDto) {
    return this.itStuffService.updateITStaff(id, updateITStaffDto);
  }

  // : Partially update IT staff by ID
  @Patch('update/:id')
  @UsePipes(new ValidationPipe()) 
  async partialUpdateITStaff(@Param('id') id: string, @Body() partialUpdateITStaffDto: Partial<CreateITStaffDto>) {
    return this.itStuffService.partialUpdateITStaff(id, partialUpdateITStaffDto);
  }

  // : Delete IT staff by ID
  @Delete('delete/:id')
  async deleteITStaff(@Param('id') id: number) {
    return this.itStuffService.deleteITStaff(id);
  }

  //  Change user status by ID
  @Patch(':id/')
  async changeUserStatus(@Param('id') id: string, @Body() up: CreateITStaffDto) {
    return this.itStuffService.changeUserStatus(parseInt(id), up);
  }

  // : Get a list of users older than 40
  @Get('older-than-40')
  async getUsersOlderThan40(): Promise<ITStuffEntity[]> {
    const age = 40;
    return this.itStuffService.getUsersOlderThan(age);
  }
  
  // : Get a list of inactive users
  @Get('inactive-users')
  async getInactiveUsers(): Promise<ITStuffEntity[]> {
    return this.itStuffService.getInactiveUsers();
  }

  // : Upload file with validation
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: (_req, file, cb) => {
      if (file.originalname.match(/^.*\.(jpg|jpeg)$/)) cb(null, true);
      else cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
    },
    limits: { fileSize: 1000000 },
    storage: diskStorage({
      destination: './uploads',
      filename: (_req, file, cb) => {
        cb(null, Date.now() + file.originalname);
      },
    }),
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }

   //mailer
   @Post('sendemail')
   @UseGuards(SessionGuard)
   async sendEmail() {
     try {
       const result = await this.mailerService.sendMail({
         to: 'durjoyghosh716@gmail.com',
         subject: 'Test Email', 
         text: 'this is a test mail.',
       });
       return { message: 'Email sent successfully', result };
     } catch (error) {
       console.error('Email sending failed:', error.message || error);
       throw new Error('Email sending failed');
     }
   }
  

  //change phone number
  @Patch(':id/change-gender')
  @UseGuards(SessionGuard)
  async changeGender(@Param('id') id: number, @Body('gender') gender: string) {
    return this.itStuffService.changeGender(id, gender);
  }

  //reset password
  @Patch(':id/reset-password')
  @UseGuards(SessionGuard)
  async changeResetPassword(@Param('id') id: number, @Body() updateData: CreateITStaffDto) {
    return this.itStuffService.changeResetPassword(id, updateData);
  }

  //fetch stuff info by id
  @Get(':id/get-stuff_info')
  @UseGuards(SessionGuard)
  async importITStaffById(@Param('id') id: number) {
    return this.itStuffService.getITStaffById(id);
  }




 // login  session
 
 @Post('login')
 async login(@Session() session: Record<string, any>, @Body() createITStaffDto: CreateITStaffDto) {
   try {
     const data = await this.itStuffService.login(createITStaffDto);
     if (data === true) {
       session.email = createITStaffDto.email;
       return { success: true, message: "User Login Successful." };
     } else {
       return { success: false, message: "Invalid email or password." };
     }
   } catch (error) {
     throw new HttpException(
       {
         status: HttpStatus.BAD_REQUEST,
         error: 'Login Failed: ' + error.message,
       },
       HttpStatus.BAD_REQUEST,
     );
   }
 }


 // delete it stuff  not working
// @Delete(':id/removestaff')
//   @UseGuards(SessionGuard) 
//   async removeITStuff(@Param('id') id: number) {
//     try {
//       await this.itStuffService.removeItStaff(id); // Ensure to await the asynchronous operation
//       return { message: `IT Staff ${id} deleted successfully.` };
//     } catch (error) {
//       throw new HttpException(
//         {
//           status: HttpStatus.BAD_REQUEST,
//           error: 'Failed to delete IT staff.',
//         },
//         HttpStatus.BAD_REQUEST,
//       );
//     }
//   }

@Delete(':id')
  async deleteITStuffById(@Param('id') id: number): Promise<{ message: string }> {
    const deletedITStuff = await this.itStuffService.deleteITStuff(id);
    if (!deletedITStuff) {
      throw new NotFoundException(`IT stuff with ID ${id} not found.`);
    }
    return { message: `IT stuff with ID ${id} has been deleted.` };
  }

//Logout
// @Get('logout')
//     logout(@Session() session) {
//       try {
//         if (session.email) {
//           session.destroy();
//           return { message: "logged out." };
//         } else {
//           return { message: "Already Logged Out" };
//         }
//       } catch (error) {
//         throw new HttpException({
//           status: HttpStatus.INTERNAL_SERVER_ERROR,
//           error: 'error occurred during logout.',
//         },
//         HttpStatus.INTERNAL_SERVER_ERROR,
//         );
//       }
//     }


//relation 
//oneto one
@Post('create-with-student')
  async createITStuffWithStudent(@Body() requestBody: { itStuff: ITStuffEntity, student: StudentEntity }): Promise<ITStuffEntity> {
    const { itStuff, student } = requestBody;
    return this.itStuffService.createITStuffWithStudent(itStuff, student);
  }


  //one to one
  @Get(':id')
  async getITStuffWithStudent(@Param('id') id: number): Promise<ITStuffEntity> {
    const itStuff = await this.itStuffService.getITStuffWithStudent(id);
    if (!itStuff) {
      throw new NotFoundException('IT Stuff not found');
    }
    return itStuff;
  }


  @Get(':itStuffId/students')
  async getStudentsByITStuffId(@Param('itStuffId') itStuffId: number): Promise<StudentEntity[]> {
    return this.itStuffService.getStudentsByITStuffId(itStuffId);
  }

  
}
