import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { TeacherModule } from './teacher/teacher.module';
import { StudentsModule } from './students/students.module';
import { ITStuffModule } from './It Stuff/it_stuff.module';

@Module({
  imports: [AdminModule, TeacherModule, StudentsModule, ITStuffModule, TypeOrmModule.forRoot(
    { 
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '2222',
      database: 'UMS',
      autoLoadEntities: true,
      synchronize: true,
    } ),
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
