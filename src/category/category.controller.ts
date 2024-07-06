import { Body, Controller, Delete, Get, Param, ParseArrayPipe, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { Category } from './entities/category.entity';
import { CategoryService } from './category.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoryController {

    constructor(private categoryService:CategoryService){}

    @Get()
    findAll():Promise<Category[]> {
        return this.categoryService.findAll();
    }

    // @UseGuards(AuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string): Promise<Category> {
        return this.categoryService.findOne(Number(id));
    }

    @UseGuards(AuthGuard)
    @Post()
    create(@Req() req: any, @Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
        console.log(createCategoryDto);

        return this.categoryService.create(req['user_data'].id, createCategoryDto);
    }
    @UseGuards(AuthGuard)
    @Put(':id')
    update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
        
        return this.categoryService.update(Number(id), updateCategoryDto);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.categoryService.delete(Number(id))
    }

    @Delete('multiple')
    multipleDelete(@Query('ids', new ParseArrayPipe({ items: String, separator: ',' })) ids: string[]) {
        console.log("delete multi=> ", ids)
        return this.categoryService.multipleDelete(ids)
    }

    

}
