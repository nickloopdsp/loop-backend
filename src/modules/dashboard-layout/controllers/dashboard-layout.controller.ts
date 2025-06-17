import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DashboardLayoutService } from '../services/dashboard-layout.service';
import { CreateDashboardLayoutDto, UpdateDashboardLayoutDto } from '../dto/dashboard-layout.dtos';

@Controller('dashboard-layout')
export class DashboardLayoutController {
  constructor(private readonly dashboardLayoutService: DashboardLayoutService) { }

  @Post()
  create(@Body() createDashboardLayoutDto: CreateDashboardLayoutDto) {
    return this.dashboardLayoutService.create(createDashboardLayoutDto);
  }

  @Get()
  findAll() {
    return this.dashboardLayoutService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dashboardLayoutService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDashboardLayoutDto: UpdateDashboardLayoutDto) {
    return this.dashboardLayoutService.update(+id, updateDashboardLayoutDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dashboardLayoutService.remove(+id);
  }
}
