import { Injectable } from '@nestjs/common';
import { CreateDashboardLayoutDto, UpdateDashboardLayoutDto } from '../dto/dashboard-layout.dtos';

@Injectable()
export class DashboardLayoutService {
  create(createDashboardLayoutDto: CreateDashboardLayoutDto) {
    return 'This action adds a new dashboardLayout';
  }

  findAll() {
    return `This action returns all dashboardLayout`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dashboardLayout`;
  }

  update(id: number, updateDashboardLayoutDto: UpdateDashboardLayoutDto) {
    return `This action updates a #${id} dashboardLayout`;
  }

  remove(id: number) {
    return `This action removes a #${id} dashboardLayout`;
  }
}
