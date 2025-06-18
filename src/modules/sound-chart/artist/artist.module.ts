import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ArtistService } from './services/artist.service';
import { ArtistController } from './controllers/artist.controller';
import { SoundChartServiceMiddleware, SoundChartServiceModule } from '../../../services/soundchart';

@Module({
  imports: [SoundChartServiceModule],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SoundChartServiceMiddleware)
      .forRoutes(ArtistController);
  }

}
