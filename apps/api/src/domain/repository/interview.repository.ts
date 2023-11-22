import {InterviewEntity} from "../entity/interview.entity";

export interface InterviewRepository {

  save(data : InterviewEntity) : Promise<InterviewEntity>;

  findById(documentId: string) : Promise<InterviewEntity>;

  findByAuthor(authorId: string) : Promise<InterviewEntity[]>;
}
