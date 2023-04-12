import { createMock } from '@golevelup/ts-jest';
import { ExecutionContext } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import configuration from 'src/config/configuration';
import configurationSchema from 'src/config/schema';
import { BearerGuard } from './bearer.guard';

describe('BearerGuard', () => {
  let bearerGuard: BearerGuard;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.env.test',
          load: [configuration],
          validationSchema: configurationSchema,
          validationOptions: {
            abortEarly: true,
          },
        }),
      ],
      providers: [BearerGuard],
    }).compile();

    bearerGuard = module.get<BearerGuard>(BearerGuard);
    configService = await module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(bearerGuard).toBeDefined();
  });

  it.each`
    bearer          | expected
    ${''}           | ${true}
    ${'bad-bearer'} | ${false}
  `('should authorized request or not', async ({ bearer, expected }) => {
    // --- ARRANGE
    // Twist to use the config because it's unavailable in the each parameters context
    bearer = expected ? configService.get<string>('security.apiBearer') : bearer;

    const mockExecutionContext: ExecutionContext = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: `Bearer ${bearer}`,
          },
        }),
      }),
    });

    // --- ACT
    const isAuthorized = await bearerGuard.canActivate(mockExecutionContext);

    // --- ASSERT
    expect(isAuthorized).toEqual(expected);
  });
});
