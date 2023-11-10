import {Module} from "@nestjs/common/decorators";
import {InterviewServiceImpl} from "../application/impl/interview.service.impl";
import {InterviewRestController} from "../interface/interview.controller";
import {InterviewFirebaseRepository} from "../domain/repository/impl/interview.firebase.repository";
import { FireormModule } from "nestjs-fireorm";
import { InterviewEntity } from "../domain/entity/interview.entity";

@Module({
  imports: [FireormModule.forFeature([InterviewEntity])],
  controllers: [InterviewRestController],
  providers: [
    {
      provide: "interview.firebase.repository",
      useClass: InterviewFirebaseRepository,
    },
    {
      provide: "interview.service.impl",
      useClass: InterviewServiceImpl,
    },
  ],
})
export class InterviewModule {};