import { AppModule } from "../app.module";
import { rand, randEmail,randFilePath,randFirstName,randJobTitle,randLastName,randNumber,randPassword, randSkill, randUserName } from '@ngneat/falso';
import { NestFactory } from "@nestjs/core";
import { UserService } from "../user/user.service";
import { SkillService } from "../skill/skill.service";
import { CvService } from "../cv/cv.service";

import { UserEntity } from "../user/entities/user.entity";
import { CvEntity } from "../cv/entities/cv.entity";
import { SkillEntity } from "../skill/entities/skill.entity";

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const userService= app.get(UserService);
    const skillService=app.get(SkillService);
    const cvService=app.get(CvService);
for(let i = 0; i < 20; i++){
 const user= new UserEntity;
 user.username=randUserName();
 user.email=randEmail();
 user.password=randPassword();
 await userService.create(user);
}
for(let i = 0; i < 20; i++){
    const cv=new CvEntity();
    cv.age= randNumber({min: 18,max: 100});
    cv.cin= randNumber({min: 1000,max: 99999999})
    cv.job= randJobTitle();
    cv.firstname=randFirstName();  
    cv.name=randLastName();
    cv.path=randFilePath();
    await cvService.create(cv);
  }
  for (let i = 0; i < 20; i++) {
    const skill = new SkillEntity();
    skill.designation = randSkill();
    await skillService.create(skill); 
  }

await app.close()
}
bootstrap();


