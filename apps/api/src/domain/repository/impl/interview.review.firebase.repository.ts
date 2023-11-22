import {Injectable, InternalServerErrorException, Logger, NotFoundException} from "@nestjs/common";
import {InterviewReviewRepository} from "../interview.review.repository";
import {InjectRepository} from "nestjs-fireorm";
import {InterviewReviewEntity} from "../../entity/interview.review.entity";
import {BaseFirestoreRepository} from "fireorm";

@Injectable()
export class InterviewReviewFirebaseRepository implements InterviewReviewRepository {

  constructor(
    @InjectRepository(InterviewReviewEntity)
    private readonly repository : BaseFirestoreRepository<InterviewReviewEntity>
  ) {}

  async save(entity: InterviewReviewEntity): Promise<InterviewReviewEntity> {
    try {
      const savedEntity = await this.repository.create(entity);
      return savedEntity;
    } catch(error) {
      Logger.error("Fail to save Interview Review entity");
      Logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  async findById(id: string): Promise<InterviewReviewEntity> {
    try {
      const record = await this.repository.findById(id);
      return record;
    } catch(error) {
      throw new NotFoundException();
    }
  }

  async findByMemberId(memberId: string): Promise<InterviewReviewEntity[]> {
    return this.repository.whereEqualTo("member_id", memberId)
    .orderByDescending("created_at")
    .find();
  }

  findByResult(result: string): Promise<InterviewReviewEntity[]> {
    return this.repository.whereEqualTo("result", result)
    .orderByDescending("created_at")
    .find();
  }

  findByEstimation(estimation: string): Promise<InterviewReviewEntity[]> {
    return this.repository.whereEqualTo("estimation", estimation)
    .orderByDescending("created_at")
    .find();
  }
}