import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { IUser } from "../../../domain/entities/user/IUser";

@Entity()
export class UserDB implements IUser {
  @PrimaryGeneratedColumn()
  id!: string;
  @Index()
  @Column({ length: 50 })
  email!: string;
  @Column({ length: 100 })
  password!: string;
}
