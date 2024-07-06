import { User } from "src/user/entities/user.entity";
import { Category } from "../entities/category.entity";

export class UpdateCategoryDto {
    name: string;

    description: string;

    parent: Category;

    status: number;
}