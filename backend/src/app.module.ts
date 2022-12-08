import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/users.model';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { SkillModule } from './skills/skill.module';
import { Skill } from './skills/skill.model';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import * as dbConfig from './database/config.json';
import { WorkExperienceModule } from './workExperience/workExperience.module';
import { EducationModule } from './education/education.module';
import { Education } from './education/education.model';
import { WorkExperience } from './workExperience/workExperience.model';
import { Company } from './company/company.model';
import { CompanyModule } from './company/company.module';
import { EducationOrganization } from './educationOrganization/educationOrganization.model';
import { EducationOrganizationModule } from './educationOrganization/educationOrganization.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
    ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, 'static') }), // чтобы сервер мог раздавать статику (например изображения)
    SequelizeModule.forRoot({
      dialect: dbConfig[process.env.NODE_ENV].dialect,
      host: dbConfig[process.env.NODE_ENV].host,
      port: dbConfig[process.env.NODE_ENV].port,
      username: dbConfig[process.env.NODE_ENV].username,
      password: dbConfig[process.env.NODE_ENV].password,
      database: dbConfig[process.env.NODE_ENV].database,
      models: [
        User,
        Role,
        Skill,
        Education,
        WorkExperience,
        Company,
        EducationOrganization,
      ],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    SkillModule,
    EducationModule,
    WorkExperienceModule,
    CompanyModule,
    EducationOrganizationModule,
  ],
})
export class AppModule {}
