import { PartialType } from '@nestjs/swagger';

export class CreateDashboardLayoutDto { }

export class UpdateDashboardLayoutDto extends PartialType(CreateDashboardLayoutDto) { }



