import {Injectable} from "@nestjs/common/decorators";

/**
 * class AppService
 */
@Injectable()
export class AppService {
  /**
   * @description return hello world string
   * @return {string} "Hello world"
   */
  getHello(): string {
    return "Hello World!";
  }
}
