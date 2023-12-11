import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Blog } from "./Blog";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToMany(() => Blog, (blog) => blog.user)
  blogs: Blog[];
}
