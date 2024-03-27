import { BadRequestException, Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Res, Session, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { TeacherService } from "./teacher.service";
import { TeacherDTO } from "./teacher.DTO";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";
import { SessionGuard } from "./teacher.session.guard";

@Controller('teacher')
export class TeacherController{
    constructor(private teacherService: TeacherService) { }
    @Get('/index')
    getIndex(): string{
        return this.teacherService.getIndex();
    }
    @Get('/users/:id')
    getUserByID(@Param('id') id:number):object{
        return this.teacherService.getUserByID(id);
    }
    @Get('/users')
    getUserByNameAndID(@Query('name') name:string, @Query('id') id:string) :object{
        return this.teacherService.getUserByNameAndID(name,id);
    }
    @Post('/add')
    @UsePipes(new ValidationPipe())
    addTeacher(@Body() teacherDTO:TeacherDTO): object{
        return this.teacherService.addTeacher(teacherDTO);
    }




    @Get('/allUsers')
    //@UseGuards(SessionGuard)
    async getAllUsers() {
        return this.teacherService.getAllUsers();
    }

    @Get('/getUser/:username')
    @UseGuards(SessionGuard)
    async getUserByUsername(@Param('username') username: string) {
        return this.teacherService.getUserByUsername(username);
    }

    @Get('/search/:substring')
    @UseGuards(SessionGuard)
    async getUsersBySubstring(@Param('substring') substring: string) {
      return this.teacherService.getUsersBySubstring(substring);
    }
    
    @Post('uploadCV')
    @UseGuards(SessionGuard)
    @UseInterceptors(FileInterceptor('file',
    { 
        fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg|pdf)$/))
            cb(null, true);
        else {
            cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
        },
        limits: { fileSize: 400000 },
        storage:diskStorage({
            destination: './upload',
            filename: function (req, file, cb) {
                cb(null,Date.now()+file.originalname)
            },
        })
    }
    ))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException('CV is required');
        }
        console.log(file);
    }
    
    @Get('/getCV/:name')
    getImages(@Param('name') name:string, @Res() res) {
        res.sendFile(name,{ root: './upload' })
    }


    @Post('/addUser')
    //@UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FileInterceptor('uploadCV',
    {
        fileFilter: (req, file, cb) => {
            if (file.originalname.match(/^.*\.(pdf)$/))
                cb(null, true);
            else {
                cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
            }
        },
        limits: { fileSize: 400000 },
        storage:diskStorage({
        destination: './upload',
            filename: function (req, file, cb) {
                cb(null,Date.now()+file.originalname)
            },
        })
    }
    ))
    async createUser(@Body() teacherDto: TeacherDTO, @UploadedFile()  myfile: Express.Multer.File) {
        teacherDto.uploadCV = myfile.filename;
        //console.log(myfile);
        try {
            const result = await this.teacherService.createUser(teacherDto);
            return { message: "Teacher created Successfully", result };
        } 
        catch (error) {
            throw new HttpException(
                {
                  status: HttpStatus.BAD_REQUEST,
                  error: 'Failed to create teacher.',
                },
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    @Put('/updateUser/:username')
    @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    async updateUser(@Param('username') username: string, @Body() teacherDto: TeacherDTO) {
        try{
            const result = await this.teacherService.updateUser(username, teacherDto);
            return  { message: "User updated Successfully", result};
        }
        catch (error) {
            throw new HttpException(
                {
                  status: HttpStatus.FORBIDDEN,
                  error: 'Failed to Update.',
                },
                HttpStatus.FORBIDDEN,
              );
        }
    }

    @Delete('deleteUser/:username')
    @UseGuards(SessionGuard)
    removeUserByUsername(@Param('username') username: string): Promise<void> {
        return this.teacherService.removeUserByUsername(username);
    }

    @Post('login')
    async login(@Session() session, @Body() teacherDto: TeacherDTO){
        try {
            const result = await this.teacherService.login(teacherDto);
            console.log(result);
            if (result === true) {
                session.email = teacherDto.email;
                console.log(session.email);
                return {success: true, message: "User Login Successful." };
            } 
            else {
              return {success: false, message: "Invalid email or password." };
            }
        } 
        catch (error) {
            throw new HttpException(
            {
                status: HttpStatus.BAD_REQUEST,
                error: 'Login Failed',
            },
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    @Get('logout')
    logout(@Session() session) {
        try {
            if (session.email) {
                session.destroy();
                return { message: "logged out." };
            }
            else {
                return { message: "Already logged out...Please login" };
            }
        }
        catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'error occurred in logout.',
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}