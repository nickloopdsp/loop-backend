import { Module } from '@nestjs/common';
import { ChatService } from './services/chat.service';
import { ChatController } from './controllers/chat.controller';
import { OpenAIModule } from '../../core/providers/openai/openai.module';

@Module({
  imports: [OpenAIModule],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule { }
