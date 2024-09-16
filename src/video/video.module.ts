import { Module } from '@nestjs/common';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Video } from './entities/video.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Video, User]),
    ConfigModule
  ],
  controllers: [VideoController],
  providers: [VideoService]
})
export class VideoModule {}
