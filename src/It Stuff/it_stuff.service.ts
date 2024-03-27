import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { ITStuffEntity} from './it_stuff.entity';
//import { CreateITStaffDto, ITStuffInfo } from './it_stuff.dto';
import { PasswordUtil } from 'src/it_stuff utils/bcrypt';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer/dist';
import { CreateITStaffDto } from './it_stuff.dto';
import { StudentEntity } from './students.entity';

@Injectable()
export class ITStuffService {
 
  constructor(
    @InjectRepository(ITStuffEntity)
    private readonly itStuffRepository: Repository<ITStuffEntity>, 
    private readonly mailerService: MailerService,
    @InjectRepository(StudentEntity)
    private readonly studentRepository: Repository<StudentEntity>,
  ) {}


  async getAllITStaff(): Promise<ITStuffEntity[]> {
    return this.itStuffRepository.find();
  }

  async getITStaffById(id: number): Promise<ITStuffEntity> {
    const itStaff = await this.itStuffRepository.findOne( {where: { id }, });
    if (!itStaff) {
      throw new NotFoundException('IT Staff not found');
    }
    return itStaff;
  }

  
  async createITStuff(ItData: CreateITStaffDto): Promise<ITStuffEntity> {
    // Hash the agent's password using the utility function
    const hashedPassword = await PasswordUtil.encodePassword(ItData.password);
    ItData.password = hashedPassword;
    const { email } = ItData;
    const existingAgent = await this.itStuffRepository.findOne({ where: { email } });
 
    if (existingAgent) {
      throw new Error('An IT stuff with the same email already exists.');
    }
 
 
    const agent = this.itStuffRepository.create(ItData);
 
    return this.itStuffRepository.save(agent);
  }

  async updateITStaff(id: number, updateITStaffDto: CreateITStaffDto): Promise<ITStuffEntity> {
    const itStaff = await this.getITStaffById(id);
    this.itStuffRepository.merge(itStaff, updateITStaffDto);
    return this.itStuffRepository.save(itStaff);
  }

  async partialUpdateITStaff(id: string, partialUpdateITStaffDto: Partial<CreateITStaffDto>): Promise<ITStuffEntity> {
    const itStaff = await this.getITStaffById(Number(id));
    this.itStuffRepository.merge(itStaff, partialUpdateITStaffDto);
    return this.itStuffRepository.save(itStaff);
  }

  async deleteITStaff(id: number): Promise<void> {
    const result = await this.itStuffRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('IT Staff not found');
    }
  }

  async changeUserStatus(id: number, updateData: Partial<CreateITStaffDto>): Promise<ITStuffEntity> {
    const itStaff = await this.getITStaffById(id);
    itStaff.status = updateData.status;
    return this.itStuffRepository.save(itStaff);
  }

  async getUsersOlderThan(age: number): Promise<ITStuffEntity[]> {
    return this.itStuffRepository.find({ where: { age: MoreThan(age) } });
  }

  
  async getInactiveUsers(): Promise<ITStuffEntity[]> {
    return this.itStuffRepository.createQueryBuilder('itStaff')
      .where('itStaff.status = :status', { status: 'inactive' })
      .getMany();
  }

  async getUsersByStatus(status: 'active' | 'inactive'): Promise<ITStuffEntity[]> {
    return this.itStuffRepository.find({ where: { status } });
  }

  //mailer
  async sendEmail() {
    try {
      const result = await this.mailerService.sendMail({
        to: 'durjoy@yahoo.com',
        subject: 'Test Email',
        text: 'This is a test email.',
      });
      console.log('Email sent:', result);
    } catch (error) {
      console.error('Email sending failed:', error);
      // Handle specific errors here if needed
    }
}

//reset password
async changeResetPassword(id: number, updateData: Partial<CreateITStaffDto>): Promise<string> {
  const itStaff = await this.getITStaffById(id);
  const hashedPassword = await PasswordUtil.encodePassword(updateData.password);
  itStaff.password = hashedPassword;
  await this.itStuffRepository.save(itStaff);
  return `Password for IT staff member with ID ${id} has been successfully changed.`;
}

//change gender

async changeGender(id: number, gender: string): Promise<ITStuffEntity> {
  const itStaff = await this.itStuffRepository.findOne({where: { id }, });
  if (!itStaff) {
    throw new NotFoundException(`IT staff member with ID ${id} not found`);
  }
  // Update the gender
  itStaff.gender = gender;
  return this.itStuffRepository.save(itStaff);
}

async importITStaffById(id: number): Promise<ITStuffEntity> {
  const itStaff = await this.itStuffRepository.findOne({where: { id }, });
  if (!itStaff) {
    throw new NotFoundException(`IT staff member with ID ${id} not found`);
  }
  return itStaff;
}


// //login session
async login(createITStaffDto: CreateITStaffDto): Promise<boolean> {
  const user = await this.itStuffRepository.findOne({ where: { email: createITStaffDto.email } });
  if (!user) {
    return false;
  }
  const result = await bcrypt.compare(createITStaffDto.password, user.password);
  return result;
}


// delete it stuff
// async removeItStaff(id: number): Promise<void> {
//   const itStaff = await this.itStuffRepository.findOne({where: { id }, });
//   if (!itStaff) {
//     throw new NotFoundException(`IT staff with ID ${id} not found.`);
//   }
//   await this.itStuffRepository.remove(itStaff);
// }

// async getStudentsByITStuffId(id: number): Promise<StudentEntity[]> {
//   const itStuff = await this.itStuffRepository.findOne({ where: { id }, relations: ['students'] });
//   if (!itStuff) {
//     throw new NotFoundException('IT Stuff not found');
//   }
//   return itStuff.students;
// }

//delete 
async deleteITStuff(id: number): Promise<ITStuffEntity> {
 
  const itStuff = await this.itStuffRepository.findOne({where: { id }, });  // Find the IT stuff entity by ID
  if (!itStuff) {
    throw new NotFoundException(`IT stuff with ID ${id} not found.`); 
  }
  const deletedITStuff = await this.itStuffRepository.remove(itStuff);
  return deletedITStuff;
}

//one to one relationship

async createITStuffWithStudent(itStuff: ITStuffEntity, student: StudentEntity): Promise<ITStuffEntity> {
  itStuff.student = student; 
  await this.studentRepository.save(student);
  return this.itStuffRepository.save(itStuff);
}
//one to one
async getITStuffWithStudent(id: number): Promise<ITStuffEntity> {
  return this.itStuffRepository
    .createQueryBuilder('itStuff')
    .leftJoinAndSelect('itStuff.student', 'student')
    .where('itStuff.id = :id', { id })
    .getOne();
}


//one to many
async getStudentsByITStuffId(itStuffId: number): Promise<StudentEntity[]> {
  return this.studentRepository.find({ where: { itStuff: { id: itStuffId } } });
}


}
