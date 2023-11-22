import {Module} from "@nestjs/common";
import {FireormModule} from "nestjs-fireorm";
import {InterviewReviewEntity} from "../domain/entity/interview.review.entity";
import {InterviewModule} from "./interview.module";
import {InterviewReviewController} from "../interface/interview.review.controller";
import {InterviewReviewServiceImpl} from "../application/impl/interview.review.service.impl";
import {InterviewReviewFirebaseRepository} from "../domain/repository/impl/interview.review.firebase.repository";

@Module({
  imports: [FireormModule.forFeature([InterviewReviewEntity]),
    InterviewModule,
  ],
  controllers: [InterviewReviewController],
  providers: [{
    provide: "interview.review.service.impl",
    useClass: InterviewReviewServiceImpl,
  }, {
    provide: "interview.review.firebase.repository",
    useClass: InterviewReviewFirebaseRepository,
  }],
})
export class InterviewReviewModule {}