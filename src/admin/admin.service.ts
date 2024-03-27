import { Injectable, NotFoundException } from "@nestjs/common";
import { AdminDTO, AdminInfo, CourseDTO, CreateAdminDto, CreateStaffDto, CreateStudentDto, CreateTeacherDto, DepartmentDTO, FacultyInfo, StaffInfo, StudentInfo, StudentRecordsDto, TeacherInfo} from "./admin.dto";
import { Admin, Course, Department, Faculty, Staff, Student } from "./admin.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { MailerService } from "@nestjs-modules/mailer";


@Injectable()
export class AdminService {
    private users = [
        {
            "id": 1,
            "name": "Fahim",
            "email": "fahim@gmail.xyz",
            "role": "STUDENT",
        },
        {
            "id": 2,
            "name": "Mahi",
            "email": "mahi@gmail.xyz",
            "role": "FACULTY",
        },
        {
            "id": 3,
            "name": "Bhuiyan",
            "email": "bhuiyan@gmail.xyz",
            "role": "STAFF",
        },
        {
            "id": 4,
            "name": "Shakib",
            "email": "shakib@yahoo.xyz",
            "role": "ADMIN",
        }
    ]

    constructor(@InjectRepository(Admin) private adminRepo: Repository<Admin>,
    private readonly mailerService: MailerService,
    @InjectRepository(Student)
        private studentRepo: Repository<Student>,
        @InjectRepository(Faculty)
        private facultyRepo: Repository<Faculty>,
        @InjectRepository(Staff)
        private staffRepo: Repository<Staff>,
        @InjectRepository(Course)
        private courseRepo: Repository<Course>,
        @InjectRepository(Department)
        private deptRepo: Repository<Department>
        ) {}


    findAll(role?: 'STUDENT' | 'STAFF' | 'ADMIN' | 'FACULTY') {
        if (role) {
            return this.users.filter(user => user.role === role)
        }
        return this.users
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id)
        return user
    }

    getUsers(): object{
        return {message: "hellow Admin"}
    }
    
    getUsersById(id: string): object{
        return {message: "You id is " + id};
    }

    getUsersByNameAndId(name: string, id: string): object{
        return {message: "You id is " + name +
        " and your id is " + id};
    }
    
    async addUser(myobj:AdminDTO):Promise<AdminDTO>{
        console.log(myobj.name);
        return myobj;
    }
    
    // async createStudent(createStudentDto: CreateStudentDto) {
    //     return { message: 'Student created successfully', student: createStudentDto };
    // }

    async createteacher(createTeacherDto: CreateTeacherDto) {
        return { message: 'Teacher created successfully', teacher: createTeacherDto};
    }

    // async createstaff(createStaffDto: CreateStaffDto) {
    //     return { message: 'Staff created successfully', staff: createStaffDto};
    // }

    async createadmin(createAdminDto: CreateAdminDto) {
        return { message: 'Admin created successfully', admin: CreateAdminDto};
    }

    getTeachersById(id: string): object{
        return {message: "You id is " + id};
    }

    getStudentsById(id: string): object{
        return {message: "You id is " + id};
    }

    // getStaffById(id: string): object{
    //     return {message: "You id is " + id};
    // }

    // getAdminById(id: string): object{
    //     return {message: "You id is " + id};
    // }

    // updateAdmin(id:number, adminInfo:AdminInfo):object{
    //     return {message: "Updated Succesfully. ID NO: " + id};
    // }

    // updateStudent(id:number, studentInfo:StudentInfo):object{
    //     return {message: "Updated Succesfully. ID NO: " + id};
    // }

    updateTeacher(id:number, teacherInfo:TeacherInfo):object{
        return {message: "Updated Succesfully. ID NO: " + id};
    }

    // updateStaff(id:number, staffInfo:StaffInfo):object{
    //     return {message: "Updated Succesfully. ID NO: " + id};
    // }    


    // async addAdmin(AdminDTO:AdminInfo):Promise<Admin>{
    //     // const res = await this.adminRepo.save(AdminDTO);
    //     // return res;
    //     return this.adminRepo.save(AdminDTO);
    // }
    
    async getAllAdminUsers(): Promise<Admin[]> {
        return this.adminRepo.find();
    }

    async getAdminUserById(id: number): Promise<Admin> {
        return await this.adminRepo.findOne({ where: { id } });
    }

    // async updateAdminUser(id: number, updatedadminUser: Partial<Admin>): Promise<Admin> 

    // async updateAdminUser(id: number, updatedadminUser: AdminInfo): Promise<Admin> {
    //     // await this.adminRepo.update(id, updatedadminUser);
    //     const res = this.adminRepo.update(id, updatedadminUser);
    //     return await this.adminRepo.findOneBy({id:id});
    // }
    
    // getUsersByIdDetails(id: number): Promise<Admin[]> {
    //     return this.adminRepo.find({
    //         select:{
    //             ad_name:true,
    //             // ad_username:true,
    //             // ad_nid:true,
    //             isActive:true,
    //             ad_phoneNumber:true,
    //         },
    //         where:{
    //             id:id,
    //         },
    //     });
    // }
    
    async deleteUser(id: number): Promise<void> {
        console.log({message: "Deleted Succesfully. ID NO: " + id});
        await this.adminRepo.delete(id);
    }
    
    // async getUsersWithNullFullName(): Promise<Admin[]> {
    //     return await this.adminRepo.find({ where: { ad_name: null, isActive: true } });
    // }

    // constructor(private usersService: UsersService) {}

    // async validateAdmin(username: string, password: string): Promise<any> {
    //     const user = await this.usersService.findOneByUsername(username);
    //     if (user && await bcrypt.compare(password, user.password)) {
    //         const { password, ...result } = user;
    //         return result;
    //     }
    //     return null;
    // }

    // async signin(mydto){
    //     const mydata= await this.user.findOneBy({email: mydto.email});
    //     const check= await bcrypt.compare(mydto.password, mydata.password);

    //     if(check) {
    //         return 1;
    //     }

    //     else {
    //         return 0;
    //     } 
    // }
    
    async addAdmin(adminInfo: AdminInfo): Promise<Admin[]>{
        const salt = await bcrypt.genSalt();
        const hassedpassed = await bcrypt.hash(adminInfo.password, salt);
        adminInfo.password= hassedpassed;
        await this.adminRepo.save(adminInfo);
        return this.adminRepo.find();
    }
    // async addAdmin(adminInfo: AdminInfo): Promise<Admin> {
    //     const salt = await bcrypt.genSalt();
    //     const hashedPassword = await bcrypt.hash(adminInfo.password, salt);
    //     const newAdmin = this.adminRepo.create({
    //         ...adminInfo,
    //         password: hashedPassword, 
    //         username: adminInfo.ausername, 
    //         profilepic: adminInfo.profilepic,
    //     });
    //     return this.adminRepo.save(newAdmin);
    // }

    // async login(adminInfo: { email: string; password: string }): Promise<number> {
    //     const data = await this.adminRepo.findOneBy({ email: adminInfo.email });
    //     if (!data) {
    //         // Log for debugging; remove or adjust for production
    //         console.log("Admin not found with email:", adminInfo.email);
    //         return 0; // Indicates admin not found
    //     }
    
    //     const isMatch = await bcrypt.compare(adminInfo.password, data.password);
    //     if (!isMatch) {
    //         // Log for debugging; remove or adjust for production
    //         console.log("Password mismatch for email:", adminInfo.email);
    //         return 0; // Indicates password mismatch
    //     }
    
    //     return 1; // Indicates success
    // }

    async login(adminInfo:AdminInfo){
        const data= await this.adminRepo.findOneBy({email: adminInfo.email});
        const result= await bcrypt.compare(adminInfo.password, data.password);
        if(result) {
            return true;
        }
        else {
            return false;
        } 
    }

    // async login(adminInfo:AdminInfo)
    // {
    //     const admin = await this.adminRepo.findOneBy({email:adminInfo.email});
    //     const result = await bcrypt.compare(adminInfo.password, admin.password);
    //     if(result)
    //     {
    //         return true;
    //     }
    //     else{
    //         return false;
    //     }

    // }
    async updateAdmin(id:number, adminInfo:AdminInfo): Promise<Admin>{
        const salt = await bcrypt.genSalt();
        const hassedpassed = await bcrypt.hash(adminInfo.password, salt);
        adminInfo.password= hassedpassed;
        await this.adminRepo.update(id,adminInfo);
        return this.adminRepo.findOneBy({id});

    }

    async sendEmail(data) {
        try {
            await this.mailerService.sendMail({
                to: 'fahim.mahi@yahoo.com',
                subject: 'Check',
                text: 'Check'
            });
            return {message: 'Email sent successfully'};  
        } 
        catch (error) {
            return { message: 'Email sent not possible', error: error.message };
        }
    }
    
    async removeAdmin(id:number):Promise<void>{
        await this.adminRepo.delete(id); 
    }

    async getAllAdminProfile(): Promise<Admin[]>{
        return this.adminRepo.find();
    }

    async getAdminByEmail(email: string): Promise<Admin> {
        return this.adminRepo.findOneBy({ email: email });
    }

    async getAdminById(id:number): Promise<Admin>{
        return this.adminRepo.findOneBy({id:id});
    }

    async addStudent(studentInfo: StudentRecordsDto): Promise<Student[]>{
        const salt = await bcrypt.genSalt();
        const hassedpassed = await bcrypt.hash(studentInfo.password, salt);
        studentInfo.password= hassedpassed;
        await this.studentRepo.save(studentInfo);
        return this.studentRepo.find();
    }

    async getAllStudentProfile(): Promise<Student[]>{
        return this.studentRepo.find();
    }

    async getStudentByEmail(email: string): Promise<Student> {
        return this.studentRepo.findOneBy({ email: email });
    }

    async getStudentById(id:number): Promise<Student>{
        return this.studentRepo.findOneBy({id:id});
    }

    async removeStudent(id:number):Promise<void>{
        await this.studentRepo.delete(id); 
    }

    async updateStudent(id:number, studentInfo:StudentRecordsDto): Promise<Student>{
        const salt = await bcrypt.genSalt();
        const hassedpassed = await bcrypt.hash(studentInfo.password, salt);
        studentInfo.password= hassedpassed;
        await this.studentRepo.update(id,studentInfo);
        return this.studentRepo.findOneBy({id});
    }

    async addFaculty(facultyInfo: FacultyInfo): Promise<Faculty[]>{
        const salt = await bcrypt.genSalt();
        const hassedpassed = await bcrypt.hash(facultyInfo.password, salt);
        facultyInfo.password= hassedpassed;
        await this.facultyRepo.save(facultyInfo);
        return this.facultyRepo.find();
    }

    async getAllFacultyProfile(): Promise<Faculty[]>{
        return this.facultyRepo.find();
    }

    async getFacultyByEmail(email: string): Promise<Faculty> {
        return this.facultyRepo.findOneBy({ email: email });
    }

    async getFacultyById(id:number): Promise<Faculty>{
        return this.facultyRepo.findOneBy({id:id});
    }

    async removeFaculty(id:number):Promise<void>{
        await this.facultyRepo.delete(id); 
    }

    async updateFaculty(id:number, facultyInfo:FacultyInfo): Promise<Faculty>{
        const salt = await bcrypt.genSalt();
        const hassedpassed = await bcrypt.hash(facultyInfo.password, salt);
        facultyInfo.password= hassedpassed;
        await this.facultyRepo.update(id,facultyInfo);
        return this.facultyRepo.findOneBy({id});
    }

    async addStaff(stafftInfo: StaffInfo): Promise<Staff[]>{
        const salt = await bcrypt.genSalt();
        const hassedpassed = await bcrypt.hash(stafftInfo.password, salt);
        stafftInfo.password= hassedpassed;
        await this.staffRepo.save(stafftInfo);
        return this.staffRepo.find();
    }

    async getAllStaffProfile(): Promise<Staff[]>{
        return this.staffRepo.find();
    }

    async getStaffByEmail(email: string): Promise<Staff> {
        return this.staffRepo.findOneBy({ email: email });
    }

    async getStaffById(id:number): Promise<Staff>{
        return this.staffRepo.findOneBy({id:id});
    }

    async removestaff(id:number):Promise<void>{
        await this.staffRepo.delete(id); 
    }

    async updateStaff(id:number, staffInfo:StaffInfo): Promise<Staff>{
        const salt = await bcrypt.genSalt();
        const hassedpassed = await bcrypt.hash(staffInfo.password, salt);
        staffInfo.password= hassedpassed;
        await this.staffRepo.update(id,staffInfo);
        return this.staffRepo.findOneBy({id});
    }

    async addCourse(course: CourseDTO): Promise<Course[]>{
        await this.courseRepo.save(course);
        return this.courseRepo.find();
    }

    async updateCourse(id:number, course: CourseDTO): Promise<Course>{
        await this.courseRepo.update(id,course);
        return this.courseRepo.findOneBy({id});
    }

    async removecourse(id:number):Promise<void>{
        await this.courseRepo.delete(id); 
    }

    async getAllCourse(): Promise<Course[]>{
        return this.courseRepo.find();
    }

    async getCourseById(id:number): Promise<Course>{
        return this.courseRepo.findOneBy({id:id});
    }


    async addDepartment(department: DepartmentDTO): Promise<Department[]>{
        await this.deptRepo.save(department);
        return this.deptRepo.find();
    }

    async updateDepartment(id:number, dept: DepartmentDTO): Promise<Department>{
        await this.deptRepo.update(id,dept);
        return this.deptRepo.findOneBy({id});
    }
    async getAllDepartment(): Promise<Department[]>{
        return this.deptRepo.find();
    }
    async removedept(id:number):Promise<void>{
        await this.deptRepo.delete(id); 
    }
    async getCoursesByFacultyId(facultyId: number): Promise<Course[]> {
        const faculty = await this.facultyRepo.findOne({
          where: { id: facultyId },
          relations: ['courses'],
        });
        return faculty ? faculty.courses : null;
    }

    // if we update one to many then we can do one to many
    // async findAllStudentsWithCourses(): Promise<Student[]> {
    //     return this.studentRepo.find({ relations: ['courses'] });
    // } 

    // async enrollStudentInCourse(studentId: number, courseId: number): Promise<void> {
    //     const student = await this.studentRepo.findOne({ where: { id: studentId }, relations: ['courses'] });
    //     const course = await this.courseRepo.findOne({ where: { id: courseId }, relations: ['students'] });

    //     console.log(student, course);

    //     if (!student || !course) {
    //         throw new NotFoundException('Student or Course not found');
    //     }
    
    //     const isEnrolled = course.students.find(s => s.id === student.id);
    //     if (!isEnrolled) {
    //       course.students.push(student);
    //       await this.courseRepo.save(course);
    //     }
    // }
    
    // async getCoursesByStudentId(studentId: number): Promise<Course[]> {
    //     const student = await this.studentRepo.findOne({ where: { id: studentId }, relations: ['courses'] });
    //     if (!student) {
    //       throw new NotFoundException('Student not found');
    //     }
    //     return student.courses;
    // }
    async getFacultiesByDepartmentId(departmentId: number): Promise<Faculty[]> {
        const department = await this.deptRepo.findOne({ where: { id: departmentId }, relations: ['faculty'] });
        if (!department) {
          throw new NotFoundException('Department not found');
        }
        return department.faculty;
    }
    
    async getStaffByDepartmentId(departmentId: number): Promise<Staff[]> {
        const department = await this.deptRepo.findOne({ where: { id: departmentId }, relations: ['staff'] });
        if (!department) {
          throw new NotFoundException('Department not found');
        }
        return department.staff;
    }
    
    async getCoursesByDepartmentId(departmentId: number): Promise<Course[]> {
        const department = await this.deptRepo.findOne({ where: { id: departmentId }, relations: ['courses'] });
        if (!department) {
          throw new NotFoundException('Department not found');
        }
        return department.courses;
    }

    async assignFacultyToCourse(courseId: number, facultyId: number): Promise<Course> {
        const course = await this.courseRepo.findOneBy({ id: courseId });
        if (!course) {
          throw new NotFoundException(`Course with ID ${courseId} not found`);
        }
    
        const faculty = await this.facultyRepo.findOneBy({ id: facultyId });
        if (!faculty) {
          throw new NotFoundException(`Faculty with ID ${facultyId} not found`);
        }
    
        course.faculty = faculty;
        await this.courseRepo.save(course);
        return course;
    }

    async assignStaffToAdmin(adminId: number, staffId: number): Promise<Admin> {
        const admin = await this.adminRepo.findOneBy({ id: adminId });
        const staff = await this.staffRepo.findOneBy({ id: staffId });
    
        if (!admin) {
          throw new NotFoundException(`Admin with ID ${adminId} not found`);
        }
    
        if (!staff) {
          throw new NotFoundException(`Staff with ID ${staffId} not found`);
        }
    
        // admin.staffInfo = staff;
        await this.adminRepo.save(admin);
        return admin;
    }

    async findStudentsByCourseId(courseId: number): Promise<Student[]> {
        const course = await this.courseRepo.findOne({
          where: { id: courseId },
          relations: ['students'],
        });
        if (!course) {
          throw new NotFoundException(`Course with ID ${courseId} not found`);
        }
        return course.students;
    
    }
    async findCoursesByStudentId(studentId: number): Promise<Course[]> {
        const student = await this.studentRepo.findOne({
          where: { id: studentId },
          relations: ['courses'],
        });
        if (!student) {
          throw new NotFoundException(`Student with ID ${studentId} not found`);
        }
        return student.courses;
    }

      

    // async assignFacultyToDepartment(facultyId: number, departmentId: number): Promise<Faculty> {
    //     const faculty = await this.facultyRepo.findOneBy({ id: facultyId });
    //     if (!faculty) {
    //       throw new NotFoundException(`Faculty with ID ${facultyId} not found`);
    //     }
    
    //     const department = await this.deptRepo.findOneBy({ id: departmentId });
    //     if (!department) {
    //       throw new NotFoundException(`Department with ID ${departmentId} not found`);
    //     }
    
    //     faculty.department = department;
    //     await this.facultyRepo.save(faculty);
    //     return faculty;
    // }
    

    


    // async createAdmin(AdminDTO: AdminInfo): Promise<Admin> {
    //     return await this.adminRepo.save(AdminDTO);
    // }


}
