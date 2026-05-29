import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private readonly config: ConfigService) {}

  @Get('health')
  health() {
    return {
      data: {
        status: 'ok',
        service: 'email-backend',
        environment: this.config.get<string>('nodeEnv'),
      },
    };
  }
}
