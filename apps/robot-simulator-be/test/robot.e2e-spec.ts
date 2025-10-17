import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { Express } from 'express';
import { PrismaService } from '../src/prisma/prisma.service';

describe('Robots API (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prismaService = moduleFixture.get<PrismaService>(PrismaService);

    // Clean the database before tests
    await prismaService.robotHistory.deleteMany();

    await app.init();
  }, 30000);

  afterAll(async () => {
    // Clean up database after tests
    await prismaService.robotHistory.deleteMany();
    await app.close();
  });

  it('POST /robot-history should create a new robot record and return coordinates', async () => {
    const res = await request(app.getHttpServer() as Express)
      .post('/robot-history')
      .send({ x: 1, y: 2, direction: 'up' })
      .expect(201);

    expect(res.body).toMatchObject({
      id: expect.any(String) as string,
      x: 1,
      y: 2,
      direction: 'up',
    });
  });

  it('GET /robot-history/latest should return the latest robot record', async () => {
    const res = await request(app.getHttpServer() as Express)
      .get('/robot-history/latest')
      .expect(200);

    expect(res.body).toMatchObject({
      x: 1,
      y: 2,
      direction: 'up',
    });
  });

  it('DELETE /robot-history should delete all records', async () => {
    await request(app.getHttpServer() as Express)
      .delete('/robot-history')
      .expect(200);

    await request(app.getHttpServer() as Express)
      .get('/robot-history/latest')
      .expect(404);
  });
});
