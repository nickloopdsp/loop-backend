import { Inject, Injectable } from '@nestjs/common';
import { ArtistAudienceDto, ArtistConcertDto, ArtistStatsDto, SoundchartArtistDto, SOUNDCHARTS_PROVIDER, SoundchartsArtistSearchResponse, SoundChartServiceProvider } from '../../../../integrations/soundchart';

@Injectable()
export class ArtistService {

  constructor(
    @Inject(SOUNDCHARTS_PROVIDER)
    private readonly soundChartServiceProvider: SoundChartServiceProvider) {

  }

  async search(q: string, limit: number = 10): Promise<SoundchartsArtistSearchResponse> {
    return {
      items: [],
      page: {
        offset: 0,
        total: 0,
        limit: limit,
        next: null,
        previous: null,
      }
    }
  }

  async getArtist(uuid: string): Promise<SoundchartArtistDto> {
    return {
      uuid: '123e4567-e89b-12d3-a456-426614174000',
      name: 'John Doe',
      image: 'https://example.com/image.jpg',
      imageUrl: 'https://example.com/image.jpg',
    }
  }

  async getArtistStats(uuid: string): Promise<ArtistStatsDto> {
    return {
      spotify: {
        followers: 100,
        monthlyListeners: 100,
        popularity: 100
      },
      instagram: {
        followers: 100,
        engagement: 100
      },
      youtube: {
        subscribers: 100,
        views: 100
      }
    }
  }

  async getArtistAudience(uuid: string, platform: string): Promise<ArtistAudienceDto> {
    return {
      platform: platform,
      value: 100,
      change: 100,
      date: '2021-01-01'
    }
  }

  async getArtistStreaming(uuid: string, platform: string): Promise<any> {
    return {
      platform: platform,
      value: 100,
      change: 100,
      date: '2021-01-01'
    }
  }

  async getArtistEvents(uuid: string): Promise<ArtistConcertDto[]> {
    return [
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'World Tour 2024',
        date: '2024-06-15T20:00:00Z',
        venue: {
          name: 'Madison Square Garden',
          city: 'New York',
          country: 'United States'
        },
        type: 'tour'
      }
    ];
  }

  async getArtistSongs(uuid: string): Promise<any> {
    return [];
  }

  async getArtistPlaylists(uuid: string, platform: string): Promise<any> {
    return [];
  }

  async getArtistSimilar(uuid: string): Promise<any> {
    return [];
  }
}
