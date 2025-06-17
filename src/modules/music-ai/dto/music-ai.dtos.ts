import { PartialType } from '@nestjs/swagger';

export class CreateMusicAiDto { }

export class UpdateMusicAiDto extends PartialType(CreateMusicAiDto) { }
