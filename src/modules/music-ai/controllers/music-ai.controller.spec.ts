import { Test, TestingModule } from '@nestjs/testing';
import { MusicAiController } from './music-ai.controller';
import { MusicAiService } from '../services/music-ai.service';

describe('MusicAiController', () => {
  let controller: MusicAiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MusicAiController],
      providers: [MusicAiService],
    }).compile();

    controller = module.get<MusicAiController>(MusicAiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
