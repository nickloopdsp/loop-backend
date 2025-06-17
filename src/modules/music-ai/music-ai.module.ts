import { Module } from '@nestjs/common';
import { MusicAiService } from './services/music-ai.service';
import { MusicAiController } from './controllers/music-ai.controller';

@Module({
  controllers: [MusicAiController],
  providers: [MusicAiService],
})
export class MusicAiModule { }
