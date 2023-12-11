import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false, default: "" })
  title: string;
  @Column({ nullable: false, default: "" })
  content: string;
  @CreateDateColumn({
    nullable: true,
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  createdAt?: Date;

  @UpdateDateColumn({
    nullable: true,
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updatedAt?: Date;

  @ManyToOne(() => User, (user) => user.id, { nullable: true })
  user: User;
}
