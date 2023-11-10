import {Controller, Get} from '@nestjs/common/decorators';

@Controller()
export class AppController {
  constructor() {}
  @Get("/health-check")
  getHealthCheck(): number {
    return Date.now()
  }
}
