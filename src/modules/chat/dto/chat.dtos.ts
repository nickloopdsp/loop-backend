import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsEnum, IsNumber, IsObject, IsOptional, IsString } from "class-validator";


export class ChatMessageResponseDto {
    @ApiProperty({
        description: 'The message content',
        example: 'Hi Alex! I\'ve been analyzing your recent performance. Your latest track is gaining great momentum! 🎵'
    })
    @IsString()
    message: string;

    @ApiProperty({
        description: 'The timestamp of when the message was sent',
        example: new Date()
    })
    @IsString()
    timestamp: string;
}

export class ChatHistoryDto {
    @ApiProperty({
        description: 'The ID of the chat message',
        example: '1'
    })
    @IsString()
    id: string;

    @ApiProperty({
        description: 'The sender of the chat message',
        example: 'user'
    })
    @IsEnum({
        enum: ['user', 'mc'],
        message: 'Sender must be either user or mc',
        enumName: 'chatHistorySender'
    })
    sender: 'user' | 'mc';

    @ApiProperty({
        description: 'The message content',
        example: 'Hi Alex! I\'ve been analyzing your recent performance. Your latest track is gaining great momentum! 🎵'
    })
    @IsString()
    message: string;

    @ApiProperty({
        description: 'The timestamp of when the message was sent',
        example: new Date()
    })
    @IsString()
    timestamp: string;
}

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

export class ChatRequestDto {
    @ApiProperty({
        description: 'The message content',
        example: 'Hi Alex! I\'ve been analyzing your recent performance. Your latest track is gaining great momentum! 🎵'
    })
    @IsString()
    message: string;

    @ApiPropertyOptional({
        description: 'The conversation history',
        example: []
    })
    @IsArray()
    @IsOptional()
    conversationHistory?: ChatHistoryDto[];

    @ApiPropertyOptional({
        description: 'The context of the chat',
        example: {}
    })
    @IsOptional()
    context?: AIContextDto;
}

export class AnalyzeRequestDto {
    @ApiProperty({
        description: 'The message content',
        example: 'Hi Alex! I\'ve been analyzing your recent performance. Your latest track is gaining great momentum! 🎵'
    })
    @IsString()
    documentContent: string;

    @ApiPropertyOptional({
        description: 'The type of the document',
        example: 'marketing'
    })
    @IsString()
    @IsOptional()
    documentType?: string;
}

export class AnalyzeResponseDto {
    @ApiProperty({
        description: 'The score of the document',
        example: 0.8
    })
    @IsNumber()
    score: number;

    @ApiProperty({
        description: 'The strengths of the document',
        example: ['Strong marketing strategy', 'Good use of data']
    })
    @IsArray()
    @IsString({ each: true })
    strengths: string[];

    @ApiProperty({
        description: 'The improvements of the document',
        example: ['Improve marketing strategy', 'Use more data']
    })
    @IsArray()
    @IsString({ each: true })
    insights: string;

    @ApiProperty({
        description: 'The insights of the document',
        example: 'The document is a good marketing strategy'
    })
    @IsArray()
    @IsString({ each: true })
    improvements: string[];
}
