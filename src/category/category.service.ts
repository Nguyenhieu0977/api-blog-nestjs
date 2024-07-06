import { ConsoleLogger, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { DeleteResult, In, Repository, UpdateResult } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { User } from 'src/user/entities/user.entity';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Category) private categoryRepository: Repository<Category>
    ) { }

    async findAll(): Promise<Category[]> {

        const existingCategory = await this.categoryRepository.findOneBy({ id: 3 })
        try {
            return await this.categoryRepository.manager.getTreeRepository(Category).findTrees()
        } catch (error) {
            throw new HttpException('Tạo danh mục không thanh công!', HttpStatus.BAD_REQUEST);
        }
        //findRoots()
        //findTrees({ depth: 2 })
        // const treeCategoriesWithLimitedDepth = await this.categoryRepository.manager.getTreeRepository(Category).findTrees({ depth: 2 })
        // console.log(treeCategoriesWithLimitedDepth)
    }

    async findOne(id: number): Promise<Category> {
        // return await this.categoryRepository.findOneBy({ id });
        const existingCategory = await this.categoryRepository.findOneBy({ id })

        try {
            return await this.categoryRepository.manager.getTreeRepository(Category).findAncestorsTree(existingCategory)
        } catch (error) {
            throw new HttpException('Tạo danh mục không thanh công!', HttpStatus.BAD_REQUEST);
        }
        //findAncestorsTree: lấy parent //findDescendants //, { depth: 1 },
        //countDescendants: lay cac gia tri tu ngon den goc
        //findAncestorsTree
        //findDescendantsTree

    }

    async create(userId: number, createCategoryDto: CreateCategoryDto): Promise<Category> {
        const user = await this.userRepository.findOneBy({ id: userId });
        const { parent, idCate } = createCategoryDto
        // console.log(createCategoryDto.idCate)
        console.log(createCategoryDto)



        try {

            let parent = await this.categoryRepository.findOneBy({ id: createCategoryDto.idCate })
            console.log(parent)
            const res = await this.categoryRepository.save({
                ...createCategoryDto, user, parent
            })
            return await this.categoryRepository.findOneBy({ id: res.id });

        } catch (error) {
            throw new HttpException('Tạo danh mục không thanh công!', HttpStatus.BAD_REQUEST);
        }

    }

    async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<UpdateResult> {
        try {
            console.log(updateCategoryDto.parent)
            return await this.categoryRepository.update(id, updateCategoryDto)
        } catch (error) {
            throw new HttpException('Cập nhật danh mục không thanh công!', HttpStatus.BAD_REQUEST);
        }
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.categoryRepository.delete(id);
    }

    async multipleDelete(ids: string[]): Promise<DeleteResult> {
        return await this.categoryRepository.delete({ id: In(ids) })
    }



}
