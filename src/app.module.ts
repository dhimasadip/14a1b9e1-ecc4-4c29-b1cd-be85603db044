import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from './configs/database.config';
import { SequelizeModule } from '@nestjs/sequelize';
import sequelizeConfig from './configs/sequelize.config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './shared/intereceptors/transform.interceptor';
import { GlobalExceptionFilter } from './shared/filters/global-exception.filter';
import { JoiPipeModule } from 'nestjs-joi';
import { joiPipeConfig } from './configs/joi-pipe.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
      load: [databaseConfig],
    }),
    SequelizeModule.forRoot({
      ...sequelizeConfig,
      autoLoadModels: true,
      synchronize: true,
    }),
    JoiPipeModule.forRoot(joiPipeConfig),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
