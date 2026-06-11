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
        stage: this.config.get<string>('stage'),
        environment: this.config.get<string>('nodeEnv'),
        hostApi: this.config.get<string>('hostApi'),
      },
    };
  }
}
