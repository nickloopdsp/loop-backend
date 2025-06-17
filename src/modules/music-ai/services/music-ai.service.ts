import { Injectable } from '@nestjs/common';
import { CreateMusicAiDto, UpdateMusicAiDto } from '../dto/music-ai.dtos';

@Injectable()
export class MusicAiService {
  create(createMusicAiDto: CreateMusicAiDto) {
    return 'This action adds a new musicAi';
  }

  findAll() {
    return `This action returns all musicAi`;
  }

  findOne(id: number) {
    return `This action returns a #${id} musicAi`;
  }

  update(id: number, updateMusicAiDto: UpdateMusicAiDto) {
    return `This action updates a #${id} musicAi`;
  }

  remove(id: number) {
    return `This action removes a #${id} musicAi`;
  }
}
