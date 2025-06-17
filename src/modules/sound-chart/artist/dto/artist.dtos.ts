import { PartialType } from '@nestjs/swagger';

export class CreateArtistDto { }

export class UpdateArtistDto extends PartialType(CreateArtistDto) { }
