import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectModule } from './modules/project/project.module';
import { DesignModule } from './modules/design/design.module';
import { IterationModule } from './modules/iteration/iteration.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FeedbackUnitModule } from './modules/feedback-unit/feedback-unit.module';
import { RatingModule } from './modules/rating/rating.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ImageModule } from './modules/image/image.module';
import { FeedbackUnitService } from './modules/feedback-unit/feedback-unit.service';
import { UserActivityModule } from './modules/user-activity/user-activity.module';

@Module({
  imports: [
    DesignModule,
    ProjectModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URL'),
        useNewUrlParser: true,
      }),
      inject: [ConfigService],
    }),
    RatingModule,
    FeedbackUnitModule,
    IterationModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      exclude: ['/api*'],
    }),
    UserModule,
    AuthModule,
    ImageModule,
    UserActivityModule,
  ],
  controllers: [AppController],
  providers: [AppService, FeedbackUnitService],
})
export class AppModule {}
