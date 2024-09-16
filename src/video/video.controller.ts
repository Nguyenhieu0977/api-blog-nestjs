import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { storageConfig } from 'helpers/config';
import { extname } from 'path';
import { CreateVideoDto } from './dto/create-video.dto';
import { VideoService } from './video.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateVideoDto } from './dto/update-video.dto';
import { FilterVideoDto } from './dto/filter-video.dto';
import { Video } from './entities/video.entity';

@Controller('videos')
export class VideoController {
  constructor(private videoService: VideoService) {}

  
  // @UseGuards(AuthGuard)
  @Get()
  findAll(@Query() query: FilterVideoDto): Promise<any> {
    return this.videoService.findAll(query);
  }

  @Get(':id')
    findDetail(@Param('id') id: string): Promise<Video> {
        return this.videoService.findDetail(Number(id));
    }

  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'thumbnail' }, { name: 'url' }], {
      storage: storageConfig('video'),
      fileFilter: (req, file, cb) => {
        const ext = extname(file.originalname);
        const allowedExtArr = ['.jpg', '.png', '.jpeg', '.mp4'];
        if (!allowedExtArr.includes(ext)) {
          req.fileValidationError = `Wrong extension type. Accepted file ext are: ${allowedExtArr.toString()}`;
          cb(null, false);
        } else {
          const fileSize = parseInt(req.headers['content-length']);
          if (fileSize > 1024 * 1024 * 50) {
            req.fileValidationError =
              'File size is too large. Accepted file size is less than 50 MB';
            cb(null, false);
          } else {
            cb(null, true);
          }
        }
      },
    }),
  )


  @UseGuards(AuthGuard)
  // @Post()
  create(
    @Req() req: any,
    @Body() createVideoDto: CreateVideoDto,
    @UploadedFiles()
    file: { thumbnail?: Express.Multer.File; url?: Express.Multer.File },
  ) {
    console.log(req['user_data']);
    console.log(createVideoDto);
    console.log(file);
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    if (!file) {
      throw new BadRequestException('File is required');
    }

    return this.videoService.create(req['user_data'].id, {
      ...createVideoDto,
      thumbnail: 'video/' + file.thumbnail[0].filename,
      url: 'video/' + file.url[0].filename,
    });
    // return this.userService.updateAvatar(req.user_data.id, file.fieldname + '/' + file.filename);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'thumbnail' }, { name: 'url' }], {
      storage: storageConfig('video'),
      fileFilter: (req, file, cb) => {
        const ext = extname(file.originalname);
        const allowedExtArr = ['.jpg', '.png', '.jpeg', '.mp4'];
        if (!allowedExtArr.includes(ext)) {
          req.fileValidationError = `Wrong extension type. Accepted file ext are: ${allowedExtArr.toString()}`;
          cb(null, false);
        } else {
          const fileSize = parseInt(req.headers['content-length']);
          if (fileSize > 1024 * 1024 * 50) {
            req.fileValidationError =
              'File size is too large. Accepted file size is less than 50 MB';
            cb(null, false);
          } else {
            cb(null, true);
          }
        }
      },
    }),
  )
  update(
    @Param('id') id: string,
    @Req() req: any,
    @Body() updateVideoDto: UpdateVideoDto,
    @UploadedFiles()
    file: { thumbnail?: Express.Multer.File; url?: Express.Multer.File },
  ) {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }

    if (file) {
      (updateVideoDto.thumbnail = 'video/' + file.thumbnail[0].filename),
        (updateVideoDto.url = 'video/' + file.url[0].filename);
    }

    return this.videoService.update(Number(id), updateVideoDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.videoService.delete(Number(id));
  }

  @UseGuards(AuthGuard)
  @Delete('multiple')
  multipleDelete(
    @Query('ids', new ParseArrayPipe({ items: String, separator: ',' }))
    ids: string[],
  ) {
    console.log('delete multi=> ', ids);
    return this.videoService.multipleDelete(ids);
  }
}
