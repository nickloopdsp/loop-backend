import { Module } from '@nestjs/common';
import { MusicAiController } from './controllers/music-ai.controller';
import { MusicAiJobController } from './controllers/music-ai.job.controller';
import { MusicAiService } from './services/music-ai.service';
import { AIModule } from '../ai/ai.module';
import { MusicAiJobService } from './services/music-ai.job.service';
import { MusicAiProvider } from './services/musicai.provider';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [AIModule, HttpModule],
  controllers: [MusicAiController, MusicAiJobController],
  providers: [MusicAiService, MusicAiJobService, MusicAiProvider],
})
export class MusicAiModule { }