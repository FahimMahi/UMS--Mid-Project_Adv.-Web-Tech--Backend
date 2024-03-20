import { BadRequestException, Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, ParseIntPipe, Patch, Post, Put, Query, Res, Session, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminDTO, AdminInfo, CourseDTO, CreateAdminDto, CreateStaffDto, CreateStudentDto, CreateTeacherDto, DepartmentDTO, FacultyInfo, StaffInfo, StudentInfo, StudentRecordsDto, TeacherInfo, } from "./admin.dto";
import { FileInterceptor } from "@nestjs/platform-express/multer/interceptors/file.interceptor";
import { MulterError, diskStorage } from "multer";
import { Admin, Faculty, Staff, Student } from "./admin.entity";
import { SessionGuard } from "./admin.session.guard";

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

    // @Post('createstudent')
    // @UsePipes(new ValidationPipe)
    // createStudent(@Body() createStudentDto: CreateStudentDto) {
    //     return this.adminService.createStudent(createStudentDto);
    // }

    @Post('createteacher')
    @UsePipes(new ValidationPipe)
    createteacher(@Body() createTeacherDto: CreateTeacherDto) {
        return this.adminService.createteacher(createTeacherDto);
    }
    
    // @Post('createstaff')
    // @UsePipes(new ValidationPipe)
    // createstaff(@Body() createStaffDto: CreateStaffDto) {
    //     return this.adminService.createstaff(createStaffDto);
    // }

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

    // @Get('staff/:id')
    // getStaffById(@Param('id') id: string): object{
    //     return this.adminService.getStaffById(id);
    // }
    
    // @Get(':id')
    // getAdminById(@Param('id') id: string): object{
    //     return this.adminService.getAdminById(id);
    // }

    // @Put('/update/:id')
    // updateAdmin(@Param('id') id:number, @Body() adminInfo:AdminInfo)
    // {
    //     return this.adminService.updateAdmin(id,adminInfo);
    // }
    
    // @Put('students/update/:id')
    // updateStudent(@Param('id') id:number, @Body() studentInfo:StudentInfo)
    // {
    //     return this.adminService.updateStudent(id,studentInfo);
    // }
    
    @Put('teachers/update/:id')
    updateTeacher(@Param('id') id:number, @Body() teacherInfo:TeacherInfo)
    {
        return this.adminService.updateTeacher(id,teacherInfo);
    }

    // @Put('staff/update/:id')
    // updateStaff(@Param('id') id:number, @Body() staffInfo:StaffInfo)
    // {
    //     return this.adminService.updateStaff(id,staffInfo);
    // }

    // @Post('upload')
    // @UseInterceptors(FileInterceptor('file'))
    // uploadFile(@UploadedFile() file: Express.Multer.File){
    //     console.log(file);
    // }

    @Post('uploadnid')
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

    // @Post('addadmin')
    // @UsePipes(new ValidationPipe())
    // @UseInterceptors(FileInterceptor('profilepic',
    // { 
    //     fileFilter: (req, file, cb) => {
    //     if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
    //     cb(null, true);
    // else {
    //     cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
    // }
    // },
    // limits: { fileSize: 2 * 1024 * 1024  },
    // storage:diskStorage({
    // destination: './upload',
    // filename: function (req, file, cb) {
    //     cb(null,Date.now()+file.originalname)
    // },
    // })
    // }
    // ))
    // addAdmin(@Body() adminInfo:AdminInfo, @UploadedFile()  file: Express.Multer.File) :Promise<Admin>{
    //     // adminInfo.filename = file.filename;
    //     return this.adminService.addAdmin(adminInfo);
    // }

    @Get('search/getAllAdmin')
    getAllAdminUsers(): Promise<Admin[]> {
        return this.adminService.getAllAdminUsers();
    }

    @Get('search/:id')
    getAdminUserById(@Param('id') id: number): Promise<Admin> {
        return this.adminService.getAdminUserById(id);
    }

    // @Put('adminupdate/:id')
    // // updateAdminUser(@Param('id') id: number, @Body() updatedadminUser: Partial<Admin>): Promise<Admin> 
    // updateAdminUser(@Param('id') id: number, @Body() updatedadminUser: AdminInfo){
    //     return this.adminService.updateAdminUser(id, updatedadminUser);
    // }

    // @Patch('updatepartialadmin/:id')
    // updatePartialAdminUser(@Param('id') id: number, @Body() updatedUser: AdminInfo){
    //     return this.adminService.updateAdminUser(id, updatedUser);
    // }

    // @Get('/searchuserbyid/:id')
    // getUser(@Param('id') id: number): Promise<Admin[]> {
    //     return this,this.adminService.getUsersByIdDetails(id);
    // }
    
    @Delete('delete/:id')
    deleteUser(@Param('id') id: number): Promise<void> {
        return this.adminService.deleteUser(id);
    }

    // @Get('admin/admin/null_list')
    // async getUsersWithNullFullName(): Promise<Admin[]> {
    //     return this.adminService.getUsersWithNullFullName();
    // }

    // @Post('createadmin')
    // createUser(@Body() user: AdminInfo): Promise<Admin> {
    //     return this.adminService.createAdmin(user);
    // }

    
    // @Get()
    // async getAllStudents() {
    //     const students = await this.adminService.getAllStudents();
    //     return { students }; // Assuming students is an array of student objects retrieved from the service
    // }


    // @Post('login')
    // async login(@Session() session, @Body('email') email: string, @Body('password') password: string){
    //     try {
    //         const result = await this.adminService.login({ email, password });
    //         if (result === 1) {
    //             session.email = email;
    //             console.log(session.email);
    //             return {success: true, message: "User Login Successful." };
    //         } 
    //         else {
    //           return {success: false, message: "Invalid email or password." };
    //         }
    //     } 
    //     catch (error) {
    //         throw new HttpException(
    //         {
    //             status: HttpStatus.BAD_REQUEST,
    //             error: 'Login Failed',
    //         },
    //         HttpStatus.BAD_REQUEST,
    //         );
    //     }
    // }

    @Post('login')
    async login(@Session() session, @Body() adminInfo:AdminInfo){
        try {
            const result = await this.adminService.login(adminInfo);
            console.log(result);
            if (result === true) {
                session.email = adminInfo.email;
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

    // @Post('login')
    // async login(@Body() adminInfo:AdminInfo, @Session() session)
    // {
    //     if(await this.adminService.login(adminInfo)){
    //     session.email=adminInfo.username;
    //     return true;
    //     }
    //     else
    //     {
    //     throw new HttpException('UnauthorizedException', HttpStatus.UNAUTHORIZED); 
    //     }
    // }
    
  
    @Get('logout')
    logout(@Session() session) {
      try {
        if (session.email) {
          session.destroy();
          return { message: "logged out." };
        } else {
          return { message: "already logged out long time ago." };
        }
      } catch (error) {
        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'error occurred during logout.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    @Post('/sendmail')
    @UseGuards(SessionGuard)
    sendEmail(@Body() data){
        return this.adminService.sendEmail(data);
    }

    @Post('createadminaccount')
    @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FileInterceptor('profilepic',
    { fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(webp|png|jpg|jpeg|heic)$/))
        cb(null, true);
    else {
        cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
    }},
    limits: { fileSize: 400000 },
    storage:diskStorage({
        destination: './uploads/admins',
        filename: function (req, file, cb) {
            cb(null,Date.now()+file.originalname)
        },})
    }))
    async addAdmin(@Body() adminInfo:AdminInfo, @UploadedFile()  myfile: Express.Multer.File) {
        adminInfo.profilepic = myfile.filename;
        try {
            const result = await this.adminService.addAdmin(adminInfo);
            return { message: "Admin created Successfully", result };
        } 
        catch (error) {
            throw new HttpException(
                {
                  status: HttpStatus.BAD_REQUEST,
                  error: 'Failed to create admin.',
                },
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    @Put('/updateadmin/:id')
    @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    async updateAdmin(@Param('id') id:number, @Body() adminInfo:AdminInfo){
        try{
            const result = await this.adminService.updateAdmin(id,adminInfo);
            return  { message: "Admin profile updated Successfully", result};
        }
        catch (error) {
            throw new HttpException(
                {
                  status: HttpStatus.FORBIDDEN,
                  error: 'Failed to Update Admin.',
                },
                HttpStatus.FORBIDDEN,
              );
        }
    }

    @Delete('/removeAdmin/:id')
    @UseGuards(SessionGuard)
    removeAdmin(@Param('id') id:number){
        try{
            const result = this.adminService.removeAdmin(id);
            if (result) {
                return { message: `Admin ${id} deleted successfully.` };
            } else {
                return { message: `Admin ${id} not found.` };
            }
        }
        catch (error) {
            throw new HttpException(
                {
                  status: HttpStatus.BAD_REQUEST,
                  error: 'Failed to delete admin.',
                },
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    @Get('/adminprofilelist')
    @UseGuards(SessionGuard)
    async getAllAdminProfile() : Promise<any>{
        try{
            const result = await this.adminService.getAllAdminProfile();
            return {message:"Admin list found successfully.", result};
        }
        catch(error){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'No admin found'
            },
            HttpStatus.NOT_FOUND,
            );
        }
    }

    @Get('/findadminbyemail/:email')
    @UseGuards(SessionGuard)
    async getAdminByEmail(@Param('email') email: string): Promise<Admin> {
        const res = await this.adminService.getAdminByEmail(email);
        if (res !== null) {
            return res;
        } else {
            throw new HttpException("No admin found", HttpStatus.NOT_FOUND);
        }
    }

    @Get('/findadminbyid/:id')
    @UseGuards(SessionGuard)
    async getAdminById(@Param('id', ParseIntPipe) id: number): Promise<any> {
        try{
            const result = await this.adminService.getAdminById(id);
            return {message: `Admin ${id} found successfully.`, result}
        }catch(error){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'No admin found'
            },
            HttpStatus.NOT_FOUND,
            );
        }
    }

    @Post('/createStudent')
    @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FileInterceptor('profilepic',
    { fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(webp|png|jpg|jpeg|heic)$/))
        cb(null, true);
    else {
        cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
    }},
    limits: { fileSize: 400000 },
    storage:diskStorage({
        destination: './uploads/students',
        filename: function (req, file, cb) {
            cb(null,Date.now()+file.originalname)
        },})
    }))
    async createStudent(@Body() StudentData: StudentRecordsDto, @UploadedFile()  myfile: Express.Multer.File) {
        StudentData.profilepic = myfile.filename;
        try{
            const result = await this.adminService.addStudent(StudentData);
            return { message: "Student created Successfully", result };
        } catch (error) {
          throw new HttpException(
              {
                status: HttpStatus.FORBIDDEN,
                error: 'Failed to create Student.',
              },
              HttpStatus.FORBIDDEN,
            );
        }
    }

    @Get('/studentprofilelist')
    @UseGuards(SessionGuard)
    async getAllStudentProfile() : Promise<any>{
        try{
            const result = await this.adminService.getAllStudentProfile();
            return {message:"Student list found successfully.", result};
        }
        catch(error){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'No Student found'
            },
            HttpStatus.NOT_FOUND,
            );
        }
    }

    
    @Get('/findstudentbyemail/:email')
    @UseGuards(SessionGuard)
    async getStudentByEmail(@Param('email') email: string): Promise<Student> {
        const res = await this.adminService.getStudentByEmail(email);
        if (res !== null) {
            return res;
        } else {
            throw new HttpException("No Student found", HttpStatus.NOT_FOUND);
        }
    }

    @Get('/findstudentbyid/:id')
    @UseGuards(SessionGuard)
    async getStudentById(@Param('id', ParseIntPipe) id: number): Promise<any> {
        try{
            const result = await this.adminService.getStudentById(id);
            return {message: `Student ${id} found successfully.`, result}
        }catch(error){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'No Student Found'
            },
            HttpStatus.NOT_FOUND,
            );
        }
    }

    @Put('/updatestudent/:id')
    @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    async updateStudent(@Param('id') id:number, @Body() studentInfo:StudentRecordsDto){
        try{
            const result = await this.adminService.updateStudent(id,studentInfo);
            return  { message: "Student updated Successfully", result};
        }
        catch (error) {
            throw new HttpException(
                {
                  status: HttpStatus.FORBIDDEN,
                  error: 'Failed to Update Admin.',
                },
                HttpStatus.FORBIDDEN,
              );
        }
    }

    @Delete('/removestudent/:id')
    @UseGuards(SessionGuard)
    removeStudent(@Param('id') id:number){
        try{
            const result = this.adminService.removeStudent(id);
            if (result) {
                return { message: `Student ${id} deleted successfully.` };
            } else {
                return { message: `Student ${id} not found.` };
            }
        }
        catch (error) {
            throw new HttpException(
                {
                  status: HttpStatus.BAD_REQUEST,
                  error: 'Failed to delete Student.',
                },
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    @Post('/createFaculty')
    @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FileInterceptor('profilepic',
    { fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(webp|png|jpg|jpeg|heic)$/))
        cb(null, true);
    else {
        cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
    }},
    limits: { fileSize: 400000 },
    storage:diskStorage({
        destination: './uploads/faculty',
        filename: function (req, file, cb) {
            cb(null,Date.now()+file.originalname)
        },})
    }))
    async createFaculty(@Body() FacultyData: FacultyInfo, @UploadedFile()  myfile: Express.Multer.File) {
        FacultyData.profilepic = myfile.filename;
        try{
            const result = await this.adminService.addFaculty(FacultyData);
            return { message: "Faculty created Successfully", result };
        } catch (error) {
          throw new HttpException(
              {
                status: HttpStatus.FORBIDDEN,
                error: 'Failed to create Faculty.',
              },
              HttpStatus.FORBIDDEN,
            );
        }
    }

    @Get('/facultyprofilelist')
    @UseGuards(SessionGuard)
    async getAllFacultyProfile() : Promise<any>{
        try{
            const result = await this.adminService.getAllFacultyProfile();
            return {message:"Faculty list found successfully.", result};
        }
        catch(error){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'No Faculty found'
            },
            HttpStatus.NOT_FOUND,
            );
        }
    }
    @Get('/findfacultybyemail/:email')
    @UseGuards(SessionGuard)
    async getFacultyByEmail(@Param('email') email: string): Promise<Faculty> {
        const res = await this.adminService.getFacultyByEmail(email);
        if (res !== null) {
            return res;
        } else {
            throw new HttpException("No Faculty found", HttpStatus.NOT_FOUND);
        }
    }

    @Get('/findfacultybyid/:id')
    @UseGuards(SessionGuard)
    async getFacultyById(@Param('id', ParseIntPipe) id: number): Promise<any> {
        try{
            const result = await this.adminService.getFacultyById(id);
            return {message: `Faculty ${id} found successfully.`, result}
        }catch(error){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'No Faculty Found'
            },
            HttpStatus.NOT_FOUND,
            );
        }
    }

    @Delete('/removestudent/:id')
    @UseGuards(SessionGuard)
    removeFaculty(@Param('id') id:number){
        try{
            const result = this.adminService.removeFaculty(id);
            if (result) {
                return { message: `Faculty ${id} deleted successfully.` };
            } else {
                return { message: `Faculty ${id} not found.` };
            }
        }
        catch (error) {
            throw new HttpException(
                {
                  status: HttpStatus.BAD_REQUEST,
                  error: 'Failed to Delete Faculty.',
                },
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    @Put('/updatefaculty/:id')
    @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    async updateFaculty(@Param('id') id:number, @Body() facultyInfo:FacultyInfo){
        try{
            const result = await this.adminService.updateFaculty(id,facultyInfo);
            return  { message: "Faculty updated Successfully", result};
        }
        catch (error) {
            throw new HttpException(
                {
                  status: HttpStatus.FORBIDDEN,
                  error: 'Failed to Update Faculty.',
                },
                HttpStatus.FORBIDDEN,
              );
        }
    }

    @Post('/createStaff')
    @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FileInterceptor('profilepic',
    { fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(webp|png|jpg|jpeg|heic)$/))
        cb(null, true);
    else {
        cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
    }},
    limits: { fileSize: 400000 },
    storage:diskStorage({
        destination: './uploads/Staff',
        filename: function (req, file, cb) {
            cb(null,Date.now()+file.originalname)
        },})
    }))
    async createStaff(@Body() staffData: StaffInfo, @UploadedFile()  myfile: Express.Multer.File) {
        staffData.profilepic = myfile.filename;
        try{
            const result = await this.adminService.addStaff(staffData);
            return { message: "Staff created Successfully", result };
        } catch (error) {
          throw new HttpException(
              {
                status: HttpStatus.FORBIDDEN,
                error: 'Failed to create Staff.',
              },
              HttpStatus.FORBIDDEN,
            );
        }
    }
    @Get('/staffprofilelist')
    @UseGuards(SessionGuard)
    async getAllStaffProfile() : Promise<any>{
        try{
            const result = await this.adminService.getAllStaffProfile();
            return {message:"Staff list found successfully.", result};
        }
        catch(error){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'No Staff found'
            },
            HttpStatus.NOT_FOUND,
            );
        }
    }

    @Get('/findstaffbyemail/:email')
    @UseGuards(SessionGuard)
    async getStaffByEmail(@Param('email') email: string): Promise<Staff> {
        const res = await this.adminService.getStaffByEmail(email);
        if (res !== null) {
            return res;
        } else {
            throw new HttpException("No Staff found", HttpStatus.NOT_FOUND);
        }
    }

    @Get('/findstaffbyid/:id')
    @UseGuards(SessionGuard)
    async getStaffById(@Param('id', ParseIntPipe) id: number): Promise<any> {
        try{
            const result = await this.adminService.getStaffById(id);
            return {message: `Staff ${id} found successfully.`, result}
        }catch(error){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'No Staff Found'
            },
            HttpStatus.NOT_FOUND,
            );
        }
    }

    @Delete('/removestaff/:id')
    @UseGuards(SessionGuard)
    removestaff(@Param('id') id:number){
        try{
            const result = this.adminService.removestaff(id);
            if (result) {
                return { message: `Staff ${id} deleted successfully.` };
            } else {
                return { message: `Staff ${id} not found.` };
            }
        }
        catch (error) {
            throw new HttpException(
                {
                  status: HttpStatus.BAD_REQUEST,
                  error: 'Failed to Delete Staff.',
                },
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    
    @Put('/updatestaff/:id')
    @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    async updateStaff(@Param('id') id:number, @Body() staffInfo:StaffInfo){
        try{
            const result = await this.adminService.updateStaff(id,staffInfo);
            return  { message: "Staff updated Successfully", result};
        }
        catch (error) {
            throw new HttpException(
                {
                  status: HttpStatus.FORBIDDEN,
                  error: 'Failed to Update Staff.',
                },
                HttpStatus.FORBIDDEN,
              );
        }
    }

    @Post('/createCourse')
    @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    async createCourse(@Body() course: CourseDTO) {
        try{
            const result = await this.adminService.addCourse(course);
            return { message: " Course created Successfully", result };
        } catch (error) {
          throw new HttpException(
              {
                status: HttpStatus.FORBIDDEN,
                error: 'Failed to create Course.',
              },
              HttpStatus.FORBIDDEN,
            );
        }
    }

    @Put('/updatecourse/:id')
    @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    async updateCourse(@Param('id') id:number, @Body() course:CourseDTO){
        try{
            const result = await this.adminService.updateCourse(id,course);
            return  { message: "Course updated Successfully", result};
        }
        catch (error) {
            throw new HttpException(
                {
                  status: HttpStatus.FORBIDDEN,
                  error: 'Failed to Update Course.',
                },
                HttpStatus.FORBIDDEN,
              );
        }
    }

    @Delete('/removecourse/:id')
    @UseGuards(SessionGuard)
    removecourse(@Param('id') id:number){
        try{
            const result = this.adminService.removecourse(id);
            if (result) {
                return { message: `Course ${id} deleted successfully.` };
            } else {
                return { message: `Course ${id} not found.` };
            }
        }
        catch (error) {
            throw new HttpException(
                {
                  status: HttpStatus.BAD_REQUEST,
                  error: 'Failed to Delete Course.',
                },
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    @Get('/courselist')
    @UseGuards(SessionGuard)
    async getAllCourse() : Promise<any>{
        try{
            const result = await this.adminService.getAllCourse();
            return {message:"Course list found successfully.", result};
        }
        catch(error){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'No Course found'
            },
            HttpStatus.NOT_FOUND,
            );
        }
    }

    @Get('/findcoursebyid/:id')
    @UseGuards(SessionGuard)
    async getCourseById(@Param('id', ParseIntPipe) id: number): Promise<any> {
        try{
            const result = await this.adminService.getCourseById(id);
            return {message: `Course ${id} found successfully.`, result}
        }catch(error){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'No Course Found'
            },
            HttpStatus.NOT_FOUND,
            );
        }
    }

    @Post('/addDepartment')
    @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    async addDepartment(@Body() dept: DepartmentDTO) {
        try{
            const result = await this.adminService.addDepartment(dept);
            return { message: "Department created Successfully", result };
        } catch (error) {
          throw new HttpException(
              {
                status: HttpStatus.FORBIDDEN,
                error: 'Failed to create Department.',
              },
              HttpStatus.FORBIDDEN,
            );
        }
    }
    @Put('/updatedept/:id')
    @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    async updateDepartment(@Param('id') id:number, @Body() dept:DepartmentDTO){
        try{
            const result = await this.adminService.updateDepartment(id,dept);
            return  { message: "Department updated Successfully", result};
        }
        catch (error) {
            throw new HttpException(
                {
                  status: HttpStatus.FORBIDDEN,
                  error: 'Failed to Update Department.',
                },
                HttpStatus.FORBIDDEN,
              );
        }
    }
    @Get('/courselist')
    @UseGuards(SessionGuard)
    async getAllDepartment() : Promise<any>{
        try{
            const result = await this.adminService.getAllDepartment();
            return {message:"Department list found successfully.", result};
        }
        catch(error){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'No Department found'
            },
            HttpStatus.NOT_FOUND,
            );
        }
    }

    @Delete('/removecourse/:id')
    @UseGuards(SessionGuard)
    removedept(@Param('id') id:number){
        try{
            const result = this.adminService.removedept(id);
            if (result) {
                return { message: `Department ${id} deleted successfully.` };
            } else {
                return { message: `Department ${id} not found.` };
            }
        }
        catch (error) {
            throw new HttpException(
                {
                  status: HttpStatus.BAD_REQUEST,
                  error: 'Failed to Department Course.',
                },
                HttpStatus.BAD_REQUEST,
            );
        }
    }
    
    @Get('courses/:facultyId')
    @UseGuards(SessionGuard)
    getCoursesByFacultyId(@Param('facultyId') facultyId: number) {
        return this.adminService.getCoursesByFacultyId(facultyId);
    }

//     @Patch(':studentId/enroll/:courseId')
//     @UseGuards(SessionGuard)
//     async enrollInCourse(@Param('studentId') studentId: number, @Body('courseId') courseId: number) {
//     try {
//         await this.adminService.enrollStudentInCourse(studentId, courseId);
//         return { message: 'Student enrolled in course successfully' };
//     } catch (error) {
//         throw new NotFoundException(error.message);
//     }
//   }

    // @Get(':studentId/courses')
    // getCoursesByStudentId(@Param('studentId') studentId: number) {
    //     return this.adminService.getCoursesByStudentId(studentId);
    // }

    @Get(':departmentId/faculties')
    @UseGuards(SessionGuard)
    getFacultiesByDepartmentId(@Param('departmentId') departmentId: number) {
        return this.adminService.getFacultiesByDepartmentId(departmentId);
    }

    @Get(':departmentId/staff')
    @UseGuards(SessionGuard)
    getStaffByDepartmentId(@Param('departmentId') departmentId: number) {
        return this.adminService.getStaffByDepartmentId(departmentId);
    }

    @Get(':departmentId/courses')
    @UseGuards(SessionGuard)
    getCoursesByDepartmentId(@Param('departmentId') departmentId: number) {
        return this.adminService.getCoursesByDepartmentId(departmentId);
    }
    
    @Patch(':courseId/faculty/:facultyId')
    @UseGuards(SessionGuard)
    async assignFacultyToCourse(
        @Param('courseId') courseId: number,
        @Param('facultyId') facultyId: number,
    ) {
        try {
            const updatedCourse = await this.adminService.assignFacultyToCourse(courseId, facultyId);
            return { message: 'Faculty assigned to course successfully', course: updatedCourse };
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    @Patch(':adminId/staff/:staffId')
    @UseGuards(SessionGuard)
    async assignStaffToAdmin(
        @Param('adminId') adminId: number,
        @Param('staffId') staffId: number,
    ) {
        try {
            const updatedAdmin = await this.adminService.assignStaffToAdmin(adminId, staffId);
            return { message: 'Staff assigned to admin successfully', updatedAdmin };
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    @Get(':courseId/students')
    @UseGuards(SessionGuard)
    getStudentsForCourse(@Param('courseId') courseId: number) {
        return this.adminService.findStudentsByCourseId(courseId);
    }

    @Get(':studentId/courses')
    @UseGuards(SessionGuard)
    getCoursesForStudent(@Param('studentId') studentId: number) {
        return this.adminService.findCoursesByStudentId(studentId);
    }

    
    // if we update one to many then we can do one to many
    // @Get('/with-courses')
    // findAllStudentsWithCourses() {
    //     return this.adminService.findAllStudentsWithCourses();
    // }

//     @Patch(':facultyId/department/:departmentId')
//     async assignFacultyToDepartment(
//     @Param('facultyId') facultyId: number,
//     @Param('departmentId') departmentId: number,
//     ) {
//     try {
//       const updatedFaculty = await this.adminService.assignFacultyToDepartment(facultyId, departmentId);
//       return { message: 'Faculty assigned to department successfully', faculty: updatedFaculty };
//     } catch (error) {
//       throw new NotFoundException(error.message);
//     }
//   }




}
