import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MockService } from '../services/mock.service';
import { CreateMockDto, UpdateMockDto } from '../dto/mock.dtos';

@Controller('mock')
export class MockController {
  constructor(private readonly mockService: MockService) { }

  @Post()
  create(@Body() createMockDto: CreateMockDto) {
    return this.mockService.create(createMockDto);
  }

  @Get()
  findAll() {
    return this.mockService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mockService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMockDto: UpdateMockDto) {
    return this.mockService.update(+id, updateMockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mockService.remove(+id);
  }
}
