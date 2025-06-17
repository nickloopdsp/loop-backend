import { Controller, Get, Param, Query, ParseUUIDPipe } from '@nestjs/common';
import { ArtistService } from '../services/artist.service';
import { ArtistAudienceDto, ArtistConcertDto, ArtistStatsDto, SoundchartArtistDto, SoundchartsArtistSearchResponse } from '../dto/artist.dtos';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Sound Chart Artist')
@ApiBearerAuth()
@Controller('sound-chart/artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) { }

  //search
  @Get('search')
  @ApiOperation({ summary: 'Search for an artist' })
  @ApiResponse({ status: 200, description: 'Search for an artist', type: SoundchartsArtistSearchResponse })
  @ApiQuery({ name: 'q', type: String, required: true })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  search(@Query('q') q: string, @Query('limit') limit: number = 10) {
    return this.artistService.search(q, limit);
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Get an artist by UUID' })
  @ApiResponse({ status: 200, description: 'Get an artist by UUID', type: SoundchartArtistDto })
  @ApiParam({ name: 'uuid', type: String, required: true, example: '123e4567-e89b-12d3-a456-426614174000' })
  getArtist(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.artistService.getArtist(uuid);
  }

  @Get(':uuid/stats')
  @ApiOperation({ summary: 'Get an artist stats by UUID' })
  @ApiResponse({ status: 200, description: 'Get an artist stats by UUID', type: ArtistStatsDto })
  @ApiParam({ name: 'uuid', type: String, required: true, example: '123e4567-e89b-12d3-a456-426614174000' })
  getArtistStats(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.artistService.getArtistStats(uuid);
  }

  @Get(':uuid/audience/:platform')
  @ApiOperation({ summary: 'Get an artist audience by UUID and platform' })
  @ApiResponse({ status: 200, description: 'Get an artist audience by UUID and platform', type: ArtistAudienceDto })
  @ApiParam({ name: 'uuid', type: String, required: true, example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiParam({ name: 'platform', type: String, required: true, example: 'spotify' })
  getArtistAudience(@Param('uuid', ParseUUIDPipe) uuid: string, @Param('platform') platform: string) {
    return this.artistService.getArtistAudience(uuid, platform);
  }

  @Get(':uuid/streaming/:platform')
  @ApiOperation({ summary: 'Get an artist streaming by UUID and platform' })
  @ApiResponse({ status: 200, description: 'Get an artist streaming by UUID and platform', type: Object })
  @ApiParam({ name: 'uuid', type: String, required: true, example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiParam({ name: 'platform', type: String, required: true, example: 'spotify' })
  getArtistStreaming(@Param('uuid', ParseUUIDPipe) uuid: string, @Param('platform') platform: string) {
    return this.artistService.getArtistStreaming(uuid, platform);
  }

  @Get(':uuid/events')
  @ApiOperation({ summary: 'Get an artist events by UUID' })
  @ApiResponse({ status: 200, description: 'Get an artist events by UUID', type: ArtistConcertDto, isArray: true })
  @ApiParam({ name: 'uuid', type: String, required: true, example: '123e4567-e89b-12d3-a456-426614174000' })
  getArtistEvents(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.artistService.getArtistEvents(uuid);
  }

  ///:uuid/songs
  @Get(':uuid/songs')
  @ApiOperation({ summary: 'Get an artist songs by UUID' })
  @ApiResponse({ status: 200, description: 'Get an artist songs by UUID', type: Object, isArray: true })
  @ApiParam({ name: 'uuid', type: String, required: true, example: '123e4567-e89b-12d3-a456-426614174000' })
  getArtistSongs(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.artistService.getArtistSongs(uuid);
  }

  @Get(':uuid/playlists/:platform')
  @ApiOperation({ summary: 'Get an artist playlists by UUID and platform' })
  @ApiResponse({ status: 200, description: 'Get an artist playlists by UUID and platform', type: Object, isArray: true })
  @ApiParam({ name: 'uuid', type: String, required: true, example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiParam({ name: 'platform', type: String, required: true, example: 'spotify' })
  getArtistPlaylists(@Param('uuid', ParseUUIDPipe) uuid: string, @Param('platform') platform: string) {
    return this.artistService.getArtistPlaylists(uuid, platform);
  }

  //:uuid/similar
  @Get(':uuid/similar')
  @ApiOperation({ summary: 'Get an artist similar by UUID' })
  @ApiResponse({ status: 200, description: 'Get an artist similar by UUID', type: Object, isArray: true })
  @ApiParam({ name: 'uuid', type: String, required: true, example: '123e4567-e89b-12d3-a456-426614174000' })
  getArtistSimilar(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.artistService.getArtistSimilar(uuid);
  }

}
