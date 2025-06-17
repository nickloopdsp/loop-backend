import { Test, TestingModule } from '@nestjs/testing';
import { DashboardLayoutService } from './dashboard-layout.service';

describe('DashboardLayoutService', () => {
  let service: DashboardLayoutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DashboardLayoutService],
    }).compile();

    service = module.get<DashboardLayoutService>(DashboardLayoutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
