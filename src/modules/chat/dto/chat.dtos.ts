import { PartialType } from '@nestjs/swagger';

export class CreateChatDto { }

export class UpdateChatDto extends PartialType(CreateChatDto) { }



