import { Test, TestingModule } from '@nestjs/testing';
import { MusicAiService } from './music-ai.service';

describe('MusicAiService', () => {
  let service: MusicAiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MusicAiService],
    }).compile();

    service = module.get<MusicAiService>(MusicAiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
