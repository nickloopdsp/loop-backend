import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { DashboardLayoutService } from '../services/dashboard-layout.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DashboardLayoutDto } from '../dto/dashboard-layout.dtos';

@ApiTags('Dashboard Layout')
@ApiBearerAuth()
@Controller('dashboard-layout')
export class DashboardLayoutController {
  constructor(private readonly dashboardLayoutService: DashboardLayoutService) { }

  @Get(':userId')
  @ApiOperation({ summary: 'Get dashboard layout' })
  @ApiResponse({ status: 200, description: 'Get dashboard layout', type: DashboardLayoutDto })
  getDashboardLayout(@Param('userId', ParseIntPipe) userId: number) {
    return this.dashboardLayoutService.getDashboardLayout(userId);
  }

  //post
  @Post()
  @ApiOperation({ summary: 'Create dashboard layout' })
  @ApiResponse({ status: 200, description: 'Create dashboard layout', type: DashboardLayoutDto })
  createDashboardLayout(@Body() createDashboardLayoutDto: any) {
    return this.dashboardLayoutService.createDashboardLayout(createDashboardLayoutDto);
  }

}
