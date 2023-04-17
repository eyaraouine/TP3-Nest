import { AppModule } from "../app.module";
import { randEmail,randFilePath,randFirstName,randJobTitle,randLastName,randNumber,randPassword, randSkill, randUserName } from '@ngneat/falso';
import { NestFactory } from "@nestjs/core";
import { UserService } from "../user/user.service";
import { SkillService } from "../skill/skill.service";
import { CvService } from "../cv/cv.service";

import { UserEntity } from "../user/entities/user.entity";
import { CvEntity } from "../cv/entities/cv.entity";
import { SkillEntity } from "../skill/entities/skill.entity";




async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userService = app.get(UserService);
  const skillService = app.get(SkillService);
  const cvService = app.get(CvService);
  for (let i = 0; i < 20; i++) {
    const skill = new SkillEntity();
    skill.designation = randSkill();
    await skillService.create(skill); 
  }
  for (let i = 0; i < 20; i++) {

    const user = new UserEntity();
    user.username = randUserName();
    user.email = randEmail();
    user.password = randPassword();
    await userService.create(user);

    const numCvs = randNumber({ min: 1, max: 20 }); 
    for (let j = 0; j < numCvs; j++) {
      const cv = new CvEntity();
      cv.age = randNumber({ min: 18, max: 100 });
      cv.cin = randNumber({ min: 1000, max: 99999999 });
      cv.job = randJobTitle();
      cv.firstname = randFirstName();
      cv.name = randLastName();
      cv.path = randFilePath();
      cv.user = user; 
      await cvService.create(cv);

    
      const numSkills = randNumber({ min: 1, max: 20 }); 
      const skills = await skillService.findAll(); 
      for (let k = 0; k < numSkills; k++) {
        let skill=new SkillEntity();
        skill = skills[Math.floor(Math.random() * skills.length)]; 
        skill.cvs=[];
        skill.cvs.push(cv); 
        await skillService.update(skill.id, skill); 
      }
    }
  }

  await app.close();
}
bootstrap();