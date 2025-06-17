import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";
import { PaginationDto } from "../../../../core/dtos/pagination.dto";

export class SoundchartArtistDto {
    @ApiProperty({
        description: 'The UUID of the artist',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @IsString()
    uuid: string;

    @ApiProperty({
        description: 'The name of the artist',
        example: 'John Doe'
    })
    @IsString()
    name: string;

    @ApiPropertyOptional({
        description: 'The image of the artist',
        example: 'https://example.com/image.jpg'
    })
    @IsString()
    @IsOptional()
    image?: string;

    @ApiPropertyOptional({
        description: 'The image URL of the artist',
        example: 'https://example.com/image.jpg'
    })
    @IsString()
    @IsOptional()
    imageUrl?: string;

    @ApiPropertyOptional({
        description: 'The slug of the artist',
        example: 'john-doe'
    })
    @IsString()
    @IsOptional()
    slug?: string;

    @ApiPropertyOptional({
        description: 'Whether the artist is verified',
        example: true
    })
    @IsBoolean()
    @IsOptional()
    verified?: boolean;

    @ApiPropertyOptional({
        description: 'The genres of the artist',
        example: ['Pop', 'Rock']
    })
    @IsArray()
    @IsOptional()
    genres?: string[];

    @ApiPropertyOptional({
        description: 'The country of the artist',
        example: 'United States'
    })
    @IsString()
    @IsOptional()
    country?: string;
}

export class SoundchartsArtistSearchResponse {
    @ApiProperty({
        description: 'The items of the artist',
        example: [
            {
                uuid: '123e4567-e89b-12d3-a456-426614174000',
                name: 'John Doe',
                image: 'https://example.com/image.jpg',
                imageUrl: 'https://example.com/image.jpg',
                slug: 'john-doe',
            }
        ]
    })
    @IsArray()
    items: SoundchartArtistDto[];

    @ApiProperty({
        description: 'The pagination of the artist',
        example: {
            offset: 0,
            total: 100,
            next: 'https://example.com/next',
            previous: 'https://example.com/previous',
            limit: 10
        }
    })
    page: PaginationDto;
}

// Spotify Stats DTO
export class SpotifyStatsDto {
    @ApiProperty({
        description: 'The followers of the artist',
        example: 100
    })
    @IsNumber()
    followers: number;

    @ApiProperty({
        description: 'The monthly listeners of the artist',
        example: 100
    })
    @IsNumber()
    monthlyListeners: number;

    @ApiProperty({
        description: 'The popularity of the artist',
        example: 100
    })
    @IsNumber()
    popularity: number;
}

// Instagram Stats DTO
export class InstagramStatsDto {
    @ApiProperty({
        description: 'The followers of the artist',
        example: 100
    })
    @IsNumber()
    followers: number;

    @ApiProperty({
        description: 'The engagement of the artist',
        example: 100
    })
    @IsNumber()
    engagement: number;
}

// TikTok Stats DTO
export class TikTokStatsDto {
    @ApiProperty({
        description: 'The followers of the artist',
        example: 100
    })
    @IsNumber()
    followers: number;

    @ApiProperty({
        description: 'The likes of the artist',
        example: 100
    })
    @IsNumber()
    likes: number;
}

// YouTube Stats DTO
export class YouTubeStatsDto {
    @ApiProperty({
        description: 'The subscribers of the artist',
        example: 100
    })
    @IsNumber()
    subscribers: number;

    @ApiProperty({
        description: 'The views of the artist',
        example: 100
    })
    @IsNumber()
    views: number;
}

// Main Artist Stats DTO
export class ArtistStatsDto {
    @ApiPropertyOptional({
        description: 'The stats of the artist',
        example: {
            followers: 100,
            monthlyListeners: 100,
            popularity: 100
        }
    })
    @IsOptional()
    spotify?: SpotifyStatsDto;

    @ApiPropertyOptional({
        description: 'The stats of the artist',
        example: {
            followers: 100,
            engagement: 100
        }
    })
    @IsOptional()
    instagram?: InstagramStatsDto;

    @ApiPropertyOptional({
        description: 'The stats of the artist',
        example: {
            followers: 100,
            views: 100
        }
    })
    @IsOptional()
    youtube?: YouTubeStatsDto;
}

export class ArtistAudienceDto {
    @ApiProperty({
        description: 'The platform of the artist',
        example: 'spotify'
    })
    @IsString()
    platform: string;

    @ApiProperty({
        description: 'The value of the artist',
        example: 100
    })
    @IsNumber()
    value: number;

    @ApiProperty({
        description: 'The change of the artist',
        example: 100
    })
    @IsNumber()
    change: number;

    @ApiProperty({
        description: 'The date of the artist',
        example: '2021-01-01'
    })
    @IsString()
    date: string;
}

export class VenueDto {
    @ApiProperty({
        description: 'The name of the venue',
        example: 'Madison Square Garden'
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'The city where the venue is located',
        example: 'New York'
    })
    @IsString()
    city: string;

    @ApiProperty({
        description: 'The country where the venue is located',
        example: 'United States'
    })
    @IsString()
    country: string;
}

export class ArtistConcertDto {
    @ApiProperty({
        description: 'The unique identifier of the concert',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @IsString()
    id: string;

    @ApiProperty({
        description: 'The name of the concert',
        example: 'World Tour 2024'
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'The date of the concert',
        example: '2024-06-15T20:00:00Z'
    })
    @IsString()
    date: string;

    @ApiProperty({
        description: 'The venue information',
        type: VenueDto
    })
    venue: VenueDto;

    @ApiProperty({
        description: 'The type of concert',
        example: 'tour',
        enum: ['tour', 'festival', 'one-off', 'residency']
    })
    @IsString()
    type: string;
}
