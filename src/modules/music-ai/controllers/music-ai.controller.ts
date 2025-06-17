import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MusicAiService } from '../services/music-ai.service';
import { CreateMusicAiDto, UpdateMusicAiDto } from '../dto/music-ai.dtos';

@Controller('music-ai')
export class MusicAiController {
  constructor(private readonly musicAiService: MusicAiService) { }

  @Post()
  create(@Body() createMusicAiDto: CreateMusicAiDto) {
    return this.musicAiService.create(createMusicAiDto);
  }

  @Get()
  findAll() {
    return this.musicAiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.musicAiService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMusicAiDto: UpdateMusicAiDto) {
    return this.musicAiService.update(+id, updateMusicAiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.musicAiService.remove(+id);
  }
}
