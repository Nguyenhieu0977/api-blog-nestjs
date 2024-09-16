import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { DeleteResult, In, Like, Repository, UpdateResult } from 'typeorm';
import { Video } from './entities/video.entity';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { FilterVideoDto } from './dto/filter-video.dto';

@Injectable()
export class VideoService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Video) private videoRepository: Repository<Video>
    ) { }

    async findAll(query: FilterVideoDto): Promise<any> {
        const items_per_page = Number(query.items_per_page) || 10;
        const page = Number(query.page) || 1;
        const search = query.search || '';
        const category = Number(query.category) || null;

        const skip = (page - 1) * items_per_page;
        const [res, total] = await this.videoRepository.findAndCount({
            // where: [
            //     {
            //         title: Like('%' + search + '%'),
            //         category: {
            //             id: category
            //         }
            //     },
            //     {
            //         description: Like('%' + search + '%'),
            //         category: {
            //             id: category
            //         }
            //     }
            // ],
            order: { created_at: 'DESC' },
            take: items_per_page,
            skip: skip,
            // relations: {
            //     user: true,
            //     category: true
            // },
            // select: {
                // category: {
                //     id: true,
                //     name: true
                // },
                // user: {
                //     id: true,
                //     first_name: true,
                //     last_name: true,
                //     email: true,
                //     avatar: true
                // }
            // }
        })
        const lastPage = Math.ceil(total / items_per_page);
        const nextPage = page + 1 > lastPage ? null : page + 1;
        const prevPage = page - 1 < 1 ? null : page - 1;

        return {
            data: res,
            total,
            currentPage: page,
            nextPage,
            prevPage,
            lastPage
        }
    }

    async findDetail(id: number): Promise<Video> {
        return await this.videoRepository.findOne({
            where: { id }
        })
    }
    
    async create(userId: number, createVideoDto: CreateVideoDto): Promise<Video> {
        const user = await this.userRepository.findOneBy({ id: userId });

        try {
            const res = await this.videoRepository.save({
                ...createVideoDto, user
            })

            return await this.videoRepository.findOneBy({ id: res.id });
        } catch (error) {
            throw new HttpException('Can not create Video', HttpStatus.BAD_REQUEST);
        }
    }

    async update(id: number, updateVideoDto: UpdateVideoDto): Promise<UpdateResult> {
        return await this.videoRepository.update(id, updateVideoDto)
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.videoRepository.delete(id);
    }

    async multipleDelete(ids: string[]): Promise<DeleteResult> {
        return await this.videoRepository.delete({ id: In(ids) })
    }
}
