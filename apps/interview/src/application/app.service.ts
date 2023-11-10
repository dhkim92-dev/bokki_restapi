import {Injectable} from "@nestjs/common/decorators";

@Injectable()
export class AppService {
  
  constructor() {
  }

  getHello(): string {
    return "Hello World!";
  }
}
