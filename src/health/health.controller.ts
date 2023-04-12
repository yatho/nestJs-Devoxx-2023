import { Controller, Get } from '@nestjs/common';

@Controller({
  path: 'health',
  version: '1',
})
export class HealthController {
  @Get()
  public check(): string {
    return 'Everything is ok';
  }
}
