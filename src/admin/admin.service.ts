import { Injectable } from "@nestjs/common";
import { AdminDTO, AdminInfo, CreateAdminDto, CreateStaffDto, CreateStudentDto, CreateTeacherDto, StaffInfo, StudentInfo, TeacherInfo } from "./admin.dto";


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
    
    async createStudent(createStudentDto: CreateStudentDto) {
        return { message: 'Student created successfully', student: createStudentDto };
    }

    async createteacher(createTeacherDto: CreateTeacherDto) {
        return { message: 'Teacher created successfully', teacher: createTeacherDto};
    }

    async createstaff(createStaffDto: CreateStaffDto) {
        return { message: 'Staff created successfully', staff: createStaffDto};
    }

    async createadmin(createAdminDto: CreateAdminDto) {
        return { message: 'Admin created successfully', admin: CreateAdminDto};
    }

    getTeachersById(id: string): object{
        return {message: "You id is " + id};
    }

    getStudentsById(id: string): object{
        return {message: "You id is " + id};
    }

    getStaffById(id: string): object{
        return {message: "You id is " + id};
    }

    getAdminById(id: string): object{
        return {message: "You id is " + id};
    }

    updateAdmin(id:number, adminInfo:AdminInfo):object{
        return {message: "Updated Succesfully. ID NO: " + id};
    }

    updateStudent(id:number, studentInfo:StudentInfo):object{
        return {message: "Updated Succesfully. ID NO: " + id};
    }

    updateTeacher(id:number, teacherInfo:TeacherInfo):object{
        return {message: "Updated Succesfully. ID NO: " + id};
    }

    updateStaff(id:number, staffInfo:StaffInfo):object{
        return {message: "Updated Succesfully. ID NO: " + id};
    }    
}
