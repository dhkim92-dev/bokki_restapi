import {Controller, Get} from '@nestjs/common/decorators';

/**
 * App Controller
 */
@Controller()
export class AppController {
  
  /**
   * return current timestamp
   * @return {Date} current timestamp
   */
  @Get("/health-check")
  getHealthCheck(): number {
    return Date.now()
  }
}
