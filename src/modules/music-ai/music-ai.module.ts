import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MusicAiController } from './controllers/music-ai.controller';
import { MusicAiJobController } from './controllers/music-ai.job.controller';
import { MusicAiService } from './services/music-ai.service';
import { MusicAiJobService } from './services/music-ai.job.service';
import { MusicAiServiceModule, MusicAiServiceMiddleware } from '../../services/music-ai';

@Module({
  imports: [MusicAiServiceModule],
  controllers: [MusicAiController, MusicAiJobController],
  providers: [MusicAiService, MusicAiJobService],
})
export class MusicAiModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MusicAiServiceMiddleware)
      .forRoutes(MusicAiController, MusicAiJobController);
  }
}