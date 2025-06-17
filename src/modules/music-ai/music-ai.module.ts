import { Module } from '@nestjs/common';
import { MusicAiController } from './controllers/music-ai.controller';
import { JobController } from './controllers/job.controller';
import { MusicAiService } from './services/music-ai.service';

@Module({
  controllers: [MusicAiController, JobController],
  providers: [MusicAiService],
  exports: [MusicAiService],
})
export class MusicAiModule { }
