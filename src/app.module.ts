import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { TodoEntity } from "./todo/entity/todo.entity";
import { ConfigModule } from "@nestjs/config";
import { AuthMiddleware } from "./middlewares/auth/auth.middleware";
import { CvEntity } from "./cv/entities/cv.entity";
import { UserEntity } from "./user/entities/user.entity";
import { SkillEntity } from "./skill/entities/skill.entity";
import { CvModule } from "./cv/cv.module";
import { UserModule } from "./user/user.module";
import { SkillModule } from "./skill/skill.module";


@Module({
  imports: [TodoModule,CvModule,UserModule,SkillModule,ConfigModule.forRoot({
    isGlobal:true,
  }),
    TypeOrmModule.forRoot(
    {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username:'root',
      password: 'dualipa2',
      database: 'tp3',
     entities: [TodoEntity,CvEntity,SkillEntity,UserEntity],
      synchronize: true,
    })
    ],
  controllers: [AppController],
  providers: [AppService],
})
  
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('todo');
  }
}


