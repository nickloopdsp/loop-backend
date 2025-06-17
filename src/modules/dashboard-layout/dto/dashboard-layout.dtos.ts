import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsObject } from "class-validator";

export class DashboardLayoutDto {
    @ApiProperty({
        description: 'The ID of the dashboard layout',
        example: 1
    })
    @IsNumber()
    id: number;

    @ApiProperty({
        description: 'The user ID of the dashboard layout',
        example: 1
    })
    @IsNumber()
    userId: number;

    @ApiProperty({
        description: 'The layout of the dashboard',
        example: {}
    })
    @IsObject()
    layout: unknown;

}