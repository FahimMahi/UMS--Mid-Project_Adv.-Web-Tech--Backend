import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Res, Session, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { TeacherService } from "./teacher.service";
import { TeacherDTO } from "./teacher.DTO";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";

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
    async getAllUsers() {
        return this.teacherService.getAllUsers();
    }
    
    @Post('upload')
    @UseInterceptors(FileInterceptor('myfile',
    { 
        fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
            cb(null, true);
        else {
            cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
        },
        limits: { fileSize: 30000 },
        storage:diskStorage({
            destination: './upload',
            filename: function (req, file, cb) {
                cb(null,Date.now()+file.originalname)
            },
        })
    }
    ))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        console.log(file);
    }
    
    @Get('/getimage/:name')
    getImages(@Param('name') name:string, @Res() res) {
        res.sendFile(name,{ root: './upload' })
    }
    @Post('/createUser')
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FileInterceptor('profilepic',
    {
        fileFilter: (req, file, cb) => {
            if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                cb(null, true);
            else {
                cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
            }
        },
        limits: { fileSize: 30000 },
        storage:diskStorage({
        destination: './upload',
            filename: function (req, file, cb) {
                cb(null,Date.now()+file.originalname)
            },
        })
    }
    ))
    async createUser(@Body() teacherDto:TeacherDTO) {
        return this.teacherService.createUser(teacherDto);
    }

    @Get('/search/:substring')
    async getUsersBySubstring(@Param('substring') substring: string) {
      return this.teacherService.getUsersBySubstring(substring);
    }

    @Get('/getUser/:username')
    async getUserByUsername(@Param('username') username: string) {
        return this.teacherService.getUserByUsername(username);
    }

    @Put('/updateUser/:username')
    async updateUser(@Param('username') username: string, @Body() teacherDto: TeacherDTO) {
        return this.teacherService.updateUser(username, teacherDto);
    }

    @Delete('/removeUser/:username')
    async removeUserByUsername(@Param('username') username: string) {
        return this.teacherService.removeUserByUsername(username);
    }

    @Post('login')
    async login(@Body() teacherDto:TeacherDTO, 
    @Session() session)
    {
        if(await this.teacherService.login(teacherDto))
        {
            session.email=teacherDto.username;
            return true;
        }
        else
        {
            throw new HttpException('UnauthorizedException', HttpStatus.UNAUTHORIZED); 
        }
    }
}