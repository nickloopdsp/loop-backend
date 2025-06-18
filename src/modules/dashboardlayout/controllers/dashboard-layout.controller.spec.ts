import { Test, TestingModule } from '@nestjs/testing';
import { DashboardLayoutController } from './dashboard-layout.controller';
import { DashboardLayoutService } from '../services/dashboard-layout.service';

describe('DashboardLayoutController', () => {
  let controller: DashboardLayoutController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DashboardLayoutController],
      providers: [DashboardLayoutService],
    }).compile();

    controller = module.get<DashboardLayoutController>(DashboardLayoutController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
