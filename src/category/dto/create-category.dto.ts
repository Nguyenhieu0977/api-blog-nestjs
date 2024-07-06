import { IsInt, IsNotEmpty, IsNumber } from "class-validator";
import { User } from "src/user/entities/user.entity";
import { Category } from "../entities/category.entity";
import { Transform } from "class-transformer";

export class CreateCategoryDto {
    @IsNotEmpty()
    name: string;

    description: string;

    parent: Category;

    idCate?: number;


    // @IsInt({ each: true })
    // nestedCategoryIds?: number[];

    status: number;

    user: User;
}