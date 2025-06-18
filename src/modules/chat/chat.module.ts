import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ChatService } from './services/chat.service';
import { ChatController } from './controllers/chat.controller';
import { AIModule } from '../ai/ai.module';
import { OpenAIMiddleware } from 'src/core/middlewares';

@Module({
  imports: [AIModule],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(OpenAIMiddleware)
      .forRoutes(ChatController);
  }
}
