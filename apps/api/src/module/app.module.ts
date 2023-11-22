import {Module} from "@nestjs/common/decorators";
import {AppController} from "../interface/app.controller";
import {AppService} from "../application/app.service";
import {InterviewModule} from "./interview.module";
import {PassportModule} from "@nestjs/passport";
import {AuthenticationStrategy} from "../security/authentication.strategy";
import {FirebaseModule} from "nestjs-firebase";
import {FireormModule} from "nestjs-fireorm";
import {InterviewReviewModule} from "./interview.review.module";

@Module({
  imports: [
    InterviewModule, 
    InterviewReviewModule,
    FirebaseModule.forRoot({}),
    FireormModule.forRoot({}),
    PassportModule.register({defaultStrategy : "firebase-jwt"}),
  ],
  controllers: [AppController],
  providers: [AppService, AuthenticationStrategy],
})
export class AppModule {}
