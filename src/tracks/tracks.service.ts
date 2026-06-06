import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from './entities/track.entity';
import { CreateTrackDto } from './dto/create-track.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
    private cloudinary: CloudinaryService,
  ) {}

  async create(
    createTrackDto: CreateTrackDto,
    audioFile: Express.Multer.File,
    coverFile: Express.Multer.File,
  ): Promise<Track> {


    const [audioUpload, coverUpload] = await Promise.all([
      this.cloudinary.uploadAudio(audioFile),
      this.cloudinary.uploadImage(coverFile)
    ]);


    const dominantColor = coverUpload.colors?.[0]?.[0] || '#121212';

    const newTrack = this.trackRepository.create({
      title: createTrackDto.title,
      genre: createTrackDto.genre,
      audioUrl: audioUpload.secure_url,
      coverUrl: coverUpload.secure_url,
      dominantColor: dominantColor,
    });

    return await this.trackRepository.save(newTrack);
  }


}