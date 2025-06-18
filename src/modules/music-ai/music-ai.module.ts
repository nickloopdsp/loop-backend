import { Module } from '@nestjs/common';
import { MusicAiController } from './controllers/music-ai.controller';
import { MusicAiJobController } from './controllers/music-ai.job.controller';
import { MusicAiService } from './services/music-ai.service';
import { AIModule } from '../ai/ai.module';
import { MusicAiJobService } from './services/music-ai.job.service';

@Module({
  imports: [AIModule],
  controllers: [MusicAiController, MusicAiJobController],
  providers: [MusicAiService, MusicAiJobService],
})
export class MusicAiModule { }