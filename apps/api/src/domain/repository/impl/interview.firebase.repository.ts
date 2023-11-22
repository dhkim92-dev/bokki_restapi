import {Injectable, InternalServerErrorException, Logger, NotFoundException} from "@nestjs/common";
import {InterviewEntity} from "../../entity/interview.entity";
import {InterviewRepository} from "../interview.repository";
import {InjectRepository} from "nestjs-fireorm";
import {BaseFirestoreRepository} from "fireorm";

@Injectable()
export class InterviewFirebaseRepository implements InterviewRepository {

  // constructor(@InjectFirebaseAdmin() readonly firebase : FirebaseAdmin) {
  // }

  constructor(@InjectRepository(InterviewEntity) private readonly repository : BaseFirestoreRepository<InterviewEntity>) {
    
  }

  async save(data: InterviewEntity): Promise<InterviewEntity> {
    try {
      return await this.repository.create(data);
    } catch(error) {
      console.log(error)
      throw new Error("firebase/realtime-database/save-failed.");
    }
  }

  async findById(documentId: string): Promise<InterviewEntity> {
    try {
      return await this.repository.findById(documentId);
    } catch(error) {
      throw new NotFoundException("Not exists interview.");
    }
  }

  async findByAuthor(authorId: string): Promise<InterviewEntity[]> {
    try {
      return await this.repository.
      whereEqualTo("member_id", authorId)
      .orderByDescending("interview_date")
      .find();
    } catch(error) {
      Logger.error(error)
      throw new InternalServerErrorException(error);
    }
  }
}