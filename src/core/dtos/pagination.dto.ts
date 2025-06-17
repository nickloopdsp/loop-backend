import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class PaginationDto {
    @ApiProperty({
        description: 'The offset of the pagination',
        example: 0
    })
    @IsNumber()
    offset: number;

    @ApiProperty({
        description: 'The total of the pagination',
        example: 100
    })
    @IsNumber()
    total: number;

    @ApiPropertyOptional({
        description: 'The next of the pagination',
        example: 'https://example.com/next'
    })
    @IsString()
    next: string | null;

    @ApiPropertyOptional({
        description: 'The previous of the pagination',
        example: 'https://example.com/previous'
    })
    @IsString()
    previous: string | null;

    @ApiProperty({
        description: 'The limit of the pagination',
        example: 10
    })
    @IsNumber()
    limit: number;
}