import { Type } from "class-transformer";
import { Category } from "src/category/entities/category.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Video {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    url: string;

    @Column()
    thumbnail: string;

    @Column({ type: "int", default: 1 })
    status: number

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @ManyToOne(() => User, (user) => user.videos, {
        onDelete: "CASCADE"
    })
    user: User

    // @ManyToOne(() => Category, (category) => category.videos)
    // category: Category
}