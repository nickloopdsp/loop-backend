import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ChatService } from './services/chat.service';
import { ChatController } from './controllers/chat.controller';
import { OpenAIModule, OpenAIMiddleware } from '../../integrations/openai';

@Module({
  imports: [OpenAIModule],
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
