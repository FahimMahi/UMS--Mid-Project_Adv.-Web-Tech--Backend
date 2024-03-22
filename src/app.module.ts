import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherModule } from './teacher/teacher.module';

@Module({
  imports: [TeacherModule, TypeOrmModule.forRoot(
    { type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '123',
    database: 'Teacher_UMS',//Change to your database name
    autoLoadEntities: true,
    synchronize: true,
    } ),
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
