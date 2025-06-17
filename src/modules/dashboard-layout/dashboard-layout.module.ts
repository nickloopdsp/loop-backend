import { Module } from '@nestjs/common';
import { DashboardLayoutService } from './services/dashboard-layout.service';
import { DashboardLayoutController } from './controllers/dashboard-layout.controller';

@Module({
  controllers: [DashboardLayoutController],
  providers: [DashboardLayoutService],
})
export class DashboardLayoutModule { }
