import { Module } from '@nestjs/common';
import { MockService } from './services/mock.service';
import { MockController } from './controllers/mock.controller';

@Module({
  controllers: [MockController],
  providers: [MockService],
})
export class MockModule { }
