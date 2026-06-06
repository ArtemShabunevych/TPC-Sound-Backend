import { Controller, Post, Body, UseInterceptors, UploadedFiles, Get, Param, Patch, Delete } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';

import { UpdateTrackDto } from './dto/update-track.dto';
@Controller('tracks')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'audio', maxCount: 1 },
      { name: 'cover', maxCount: 1 },
    ]),
  )
  create(
    @Body() createTrackDto: CreateTrackDto,
    @UploadedFiles() files: { audio?: Express.Multer.File[], cover?: Express.Multer.File[] },
  ) {
    const audioFile = files.audio?.[0];
    const coverFile = files.cover?.[0];

    return this.tracksService.create(createTrackDto, audioFile, coverFile);
  }

@Get()
findAll() {
  return this.tracksService.findAll();
}


@Get(':id')
findOne(@Param('id') id: string) {
  return this.tracksService.findOne(id);
}
@Patch(':id')
update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
  return this.tracksService.update(id, updateTrackDto);
}
@Delete(':id')
remove(@Param('id') id: string) {
  return this.tracksService.remove(id);
}
}