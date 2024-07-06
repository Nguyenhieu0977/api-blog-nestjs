import { Post } from "src/post/entities/post.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent, UpdateDateColumn } from "typeorm";

@Entity()
@Tree("nested-set")
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name:string;

    @Column()
    description:string;

    @Column({type:"int", default:1})
    status:number;

    @TreeChildren()
    children: Category[]

    @TreeParent()
    parent?: Category

    // @ManyToOne((type) => Category, (category) => category.nestedCategories)
    // parentCategory: Category

    // @OneToMany((type) => Category, (category) => category.parentCategory)
    // nestedCategories: Category[]

    @CreateDateColumn()
    created_at:Date;

    
    @UpdateDateColumn()
    updated_at:Date;

    @OneToMany(()=>Post, (post) => post.category)
    posts:Post[]

}

// parentCategory   Category?  @relation("CategoriesHierarchy", fields: [parentCategoryId], references: [id])
//   nestedCategories Category[] @relation("CategoriesHierarchy")
//   parentCategoryId Int?
