import { AppModule } from "../app.module";
import { rand, randEmail,randFilePath,randFirstName,randJobTitle,randLastName,randNumber,randPassword, randSkill, randUserName } from '@ngneat/falso';
import { NestFactory } from "@nestjs/core";
import { UserService } from "../user/user.service";
import { SkillService } from "../skill/skill.service";
import { CvService } from "../cv/cv.service";

import { UserEntity } from "../user/entities/user.entity";
import { CvEntity } from "../cv/entities/cv.entity";
import { SkillEntity } from "../skill/entities/skill.entity";

/*async function bootstrap() {
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
}*/



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
    // Création de l'utilisateur
    const user = new UserEntity();
    user.username = randUserName();
    user.email = randEmail();
    user.password = randPassword();
    await userService.create(user);

    // Création du ou des CV associé(s) à l'utilisateur
    const numCvs = randNumber({ min: 1, max: 20 }); // Nombre aléatoire de CV par utilisateur (entre 1 et 20)
    for (let j = 0; j < numCvs; j++) {
      const cv = new CvEntity();
      cv.age = randNumber({ min: 18, max: 100 });
      cv.cin = randNumber({ min: 1000, max: 99999999 });
      cv.job = randJobTitle();
      cv.firstname = randFirstName();
      cv.name = randLastName();
      cv.path = randFilePath();
      cv.user = user; // Associer le CV à l'utilisateur
      await cvService.create(cv);

      // Ajouter des compétences associées au CV
      const numSkills = randNumber({ min: 1, max: 20 }); // Nombre aléatoire de compétences par CV (entre 1 et 5)
      const skills = await skillService.findAll(); // Récupérer toutes les compétences existantes
      for (let k = 0; k < numSkills; k++) {
        let skill=new SkillEntity();
        skill = skills[Math.floor(Math.random() * skills.length)]; 
        skill.cvs=[]; // Sélectionner une compétence aléatoire
        skill.cvs.push(cv); // Ajouter le CV à la compétence (relation many-to-many)
        await skillService.update(skill.id, skill); // Mettre à jour la compétence pour enregistrer le CV associé
      }
    }
  }

  await app.close();
}
bootstrap();