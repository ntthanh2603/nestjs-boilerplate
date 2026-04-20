import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';
import request from 'supertest';
import type { App } from 'supertest/types';
jest.mock('@thallesp/nestjs-better-auth', () => ({
  AuthGuard: jest.fn().mockImplementation(() => ({
    canActivate: () => true,
  })),
  AuthModule: {
    forRootAsync: jest.fn().mockReturnValue({
      module: class {
        static forRootAsync() {
          return {
            module: class {},
            providers: [],
          };
        }
      },
      providers: [],
    }),
  },
  AllowAnonymous: () => jest.fn(),
  Roles: () => jest.fn(),
  Session: () => jest.fn(),
  ActiveUser: () => jest.fn(),
}));

jest.mock('better-auth', () => ({
  betterAuth: jest.fn().mockReturnValue({
    handler: jest.fn(),
    api: {},
  }),
}));

jest.mock('better-auth/plugins', () => ({
  admin: jest.fn(),
  jwt: jest.fn(),
  bearer: jest.fn(),
  twoFactor: jest.fn(),
  multiSession: jest.fn(),
  emailOTP: jest.fn(),
  openAPI: jest.fn(),
  phoneNumber: jest.fn(),
}));

import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api'); // Match main.ts configuration
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/health (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/health')
      .expect(200)
      .expect('ok');
  });
});
