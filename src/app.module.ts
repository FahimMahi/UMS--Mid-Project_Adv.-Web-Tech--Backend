import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsModule } from './students/students.module';

@Module({
  imports: [AdminModule, TypeOrmModule.forRoot(
    { type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '665566Ab',
    database: 'UMS',
    autoLoadEntities: true,
    synchronize: true,
    } ), StudentsModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
