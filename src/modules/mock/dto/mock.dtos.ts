import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class MockTrendingDto {
    @ApiProperty({
        description: 'The rank of the trending item',
        example: 1,
    })
    @IsNumber()
    rank: number;

    @ApiProperty({
        description: 'The name of the trending item',
        example: 'Synthwave Revival',
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'The mentions of the trending item',
        example: '2.3K',
    })
    @IsString()
    mentions: string;

    @ApiProperty({
        description: 'The growth of the trending item',
        example: 10,
    })
    @IsNumber()
    growth: number;
}

export class MockHealthMetricsDto {
    @ApiProperty({
        description: 'The total number of streams',
        example: '2.1M'
    })
    @IsString()
    streams: string;

    @ApiProperty({
        description: 'The total number of followers',
        example: '45.8K'
    })
    @IsString()
    followers: string;

    @ApiProperty({
        description: 'The total revenue',
        example: '$8,540'
    })
    @IsString()
    revenue: string;

    @ApiProperty({
        description: 'The growth rate of streams',
        example: 12.5
    })
    @IsNumber()
    streamGrowth: number;

    @ApiProperty({
        description: 'The growth rate of followers',
        example: 8.3
    })
    @IsNumber()
    followersGrowth: number;

    @ApiProperty({
        description: 'The growth rate of revenue',
        example: 15.2
    })
    @IsNumber()
    revenueGrowth: number;
}

export class RegionDataDto {
    @ApiProperty({
        description: 'The name of the region',
        example: 'North America'
    })
    name: string;

    @ApiProperty({
        description: 'The number of listeners in the region',
        example: '125K'
    })
    @IsString()
    listeners: string;
}

export class MockGeoDataDto {
    @ApiProperty({
        description: 'Top region data',
        example: { name: "North America", listeners: "125K" }
    })
    topRegion: RegionDataDto;

    @ApiProperty({
        description: 'Second region data',
        example: { name: "Europe", listeners: "89K" }
    })
    secondRegion: RegionDataDto;

    @ApiProperty({
        description: 'Third region data',
        example: { name: "Asia-Pacific", listeners: "43K" }
    })
    thirdRegion: RegionDataDto;
}

export class MockTodoDto {

    @ApiProperty({
        description: 'The ID of the todo item',
        example: '1'
    })
    @IsString()
    id: string;

    @ApiProperty({
        description: 'The title of the todo item',
        example: 'Release new single'
    })
    @IsString()
    title: string;

    @ApiProperty({
        description: 'The description of the todo item',
        example: 'Finalize mastering and distribution'
    })
    @IsString()
    description: string;

    @ApiProperty({
        description: 'The status of the todo item',
        example: 'todo'
    })
    @IsString()
    status: string;

    @ApiPropertyOptional({
        description: 'The due date of the todo item',
        example: '2024-01-20'
    })
    @IsString()
    @IsOptional()
    dueDate?: string;
}

export class MockChatMessageDto {
    @ApiProperty({
        description: 'The ID of the chat message',
        example: '1'
    })
    @IsString()
    id: string;

    @ApiProperty({
        description: 'The sender of the chat message',
        example: 'mc'
    })
    @IsString()
    sender: string;

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