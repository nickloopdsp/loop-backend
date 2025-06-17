import { Injectable } from '@nestjs/common';
import { DashboardLayoutDto } from '../dto/dashboard-layout.dtos';

@Injectable()
export class DashboardLayoutService {

  async getDashboardLayout(userId: number): Promise<DashboardLayoutDto> {
    return {
      id: 1,
      userId: userId,
      layout: {}
    };
  }

  async createDashboardLayout(createDashboardLayoutDto: any): Promise<DashboardLayoutDto> {
    return {
      id: 1,
      userId: 1,
      layout: {}
    };
  }

}
