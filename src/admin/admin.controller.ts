import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Put, Query, Res, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminDTO, AdminInfo, CreateAdminDto, CreateStaffDto, CreateStudentDto, CreateTeacherDto, StaffInfo, StudentInfo, TeacherInfo } from "./admin.dto";
import { FileInterceptor } from "@nestjs/platform-express/multer/interceptors/file.interceptor";
import { MulterError, diskStorage } from "multer";
import { AdminEntity } from "./admin.entity";

@Controller('/admin')
export class AdminController{
    constructor(private readonly adminService: AdminService){}
    @Get()
    getUsers(): object{
        return this.adminService.getUsers();
    }

    @Get('users/:id')
    getUsersById(@Param('id') id: string): object{
        return this.adminService.getUsersById(id);
    }

    @Get('users/')
    getUsersByNameAndId(@Query('name') name: string,
    @Query('id') id:string) : object{
        return this.adminService.getUsersByNameAndId(name, id);
    }

    @Post('adduser')
    @UsePipes(new ValidationPipe)
    async addUser(@Body() myobj: AdminDTO): Promise<AdminDTO>{
        console.log(myobj.name);
        return this.adminService.addUser(myobj);
    }

    @Post('createstudent')
    @UsePipes(new ValidationPipe)
    createStudent(@Body() createStudentDto: CreateStudentDto) {
        return this.adminService.createStudent(createStudentDto);
    }

    @Post('createteacher')
    @UsePipes(new ValidationPipe)
    createteacher(@Body() createTeacherDto: CreateTeacherDto) {
        return this.adminService.createteacher(createTeacherDto);
    }
    
    @Post('createstaff')
    @UsePipes(new ValidationPipe)
    createstaff(@Body() createStaffDto: CreateStaffDto) {
        return this.adminService.createstaff(createStaffDto);
    }

    @Post('createadmin')
    @UsePipes(new ValidationPipe)
    createadmin(@Body() createAdminDto: CreateAdminDto) {
        return this.adminService.createadmin(createAdminDto);
    }

    @Get('teachers/:id')
    getTeachersById(@Param('id') id: string): object{
        return this.adminService.getTeachersById(id);
    }
    
    @Get('students/:id')
    getStudentsById(@Param('id') id: string): object{
        return this.adminService.getStudentsById(id);
    }

    @Get('staff/:id')
    getStaffById(@Param('id') id: string): object{
        return this.adminService.getStaffById(id);
    }
    
    @Get(':id')
    getAdminById(@Param('id') id: string): object{
        return this.adminService.getAdminById(id);
    }

    @Put('/update/:id')
    updateAdmin(@Param('id') id:number, @Body() adminInfo:AdminInfo)
    {
        return this.adminService.updateAdmin(id,adminInfo);
    }
    
    @Put('students/update/:id')
    updateStudent(@Param('id') id:number, @Body() studentInfo:StudentInfo)
    {
        return this.adminService.updateStudent(id,studentInfo);
    }
    
    @Put('teachers/update/:id')
    updateTeacher(@Param('id') id:number, @Body() teacherInfo:TeacherInfo)
    {
        return this.adminService.updateTeacher(id,teacherInfo);
    }

    @Put('staff/update/:id')
    updateStaff(@Param('id') id:number, @Body() staffInfo:StaffInfo)
    {
        return this.adminService.updateStaff(id,staffInfo);
    }

    // @Post('upload')
    // @UseInterceptors(FileInterceptor('file'))
    // uploadFile(@UploadedFile() file: Express.Multer.File){
    //     console.log(file);
    // }

    @Post('upload')
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FileInterceptor('nidfile',
    { 
        fileFilter: (req, file, cb) => {
            if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg|pdf)$/))
            cb(null, true);
        else {
            cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
        },
        limits: { fileSize: 2 * 1024 * 1024 },
        storage:diskStorage({
        destination: './uploads',
        filename: function (req, file, cb) {
            cb(null,Date.now()+file.originalname)
        },
        })
    }))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException('NID image is required');
        }
        console.log(file);
    }

    

    @Get('/getimage/:name')
    getImages(@Param('name') name:string, @Res() res) {
        res.sendFile(name,{ root: './uploads' })
    }

    @Post('addadmin')
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
    limits: { fileSize: 2 * 1024 * 1024  },
    storage:diskStorage({
    destination: './upload',
    filename: function (req, file, cb) {
        cb(null,Date.now()+file.originalname)
    },
    })
    }
    ))
    addAdmin(@Body() adminInfo:AdminInfo, @UploadedFile()  file: Express.Multer.File) :Promise<AdminEntity>{
        // adminInfo.filename = file.filename;
        return this.adminService.addAdmin(adminInfo);
    }

    @Get('search/getAllAdmin')
    getAllAdminUsers(): Promise<AdminEntity[]> {
        return this.adminService.getAllAdminUsers();
    }

    @Get('search/:id')
    getAdminUserById(@Param('id') id: number): Promise<AdminEntity> {
        return this.adminService.getAdminUserById(id);
    }

    @Put('adminupdate/:id')
    // updateAdminUser(@Param('id') id: number, @Body() updatedadminUser: Partial<AdminEntity>): Promise<AdminEntity> 
    updateAdminUser(@Param('id') id: number, @Body() updatedadminUser: AdminInfo){
        return this.adminService.updateAdminUser(id, updatedadminUser);
    }

    @Patch('updatepartialadmin/:id')
    updatePartialAdminUser(@Param('id') id: number, @Body() updatedUser: AdminInfo){
        return this.adminService.updateAdminUser(id, updatedUser);
    }

    @Get('/searchuserbyid/:id')
    getUser(@Param('id') id: number): Promise<AdminEntity[]> {
        return this,this.adminService.getUsersByIdDetails(id);
    }
    
    @Delete('delete/:id')
    deleteUser(@Param('id') id: number): Promise<void> {
        return this.adminService.deleteUser(id);
    }

    @Get('admin/admin/null_list')
    async getUsersWithNullFullName(): Promise<AdminEntity[]> {
        return this.adminService.getUsersWithNullFullName();
    }

    // @Post('createadmin')
    // createUser(@Body() user: AdminInfo): Promise<AdminEntity> {
    //     return this.adminService.createAdmin(user);
    // }

    
    // @Get()
    // async getAllStudents() {
    //     const students = await this.adminService.getAllStudents();
    //     return { students }; // Assuming students is an array of student objects retrieved from the service
    // }

}
