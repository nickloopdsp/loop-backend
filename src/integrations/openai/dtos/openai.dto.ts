import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsObject, IsOptional, IsString } from "class-validator";
import { ChatHistoryDto } from "../../../modules/chat/dto/chat.dtos";

export class AIContextDto {
    @ApiPropertyOptional({
        description: 'The name of the artist',
        example: 'Alex'
    })
    @IsString()
    @IsOptional()
    artistName?: string;

    @ApiPropertyOptional({
        description: 'The stats of the artist',
        example: {}
    })
    @IsObject()
    @IsOptional()
    artistStats?: any;

    @ApiPropertyOptional({
        description: 'The conversation history',
        example: []
    })
    @IsArray()
    conversationHistory?: ChatHistoryDto[];

}