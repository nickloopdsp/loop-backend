import { PartialType } from '@nestjs/swagger';

export class CreateMockDto { }

export class UpdateMockDto extends PartialType(CreateMockDto) { }
