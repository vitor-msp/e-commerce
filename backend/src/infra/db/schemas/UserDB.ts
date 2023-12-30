import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { UserFields } from "../../../domain/entities/user/UserFields";
import { User } from "../../../domain/entities/user/User";

@Entity()
export class UserDB {
  @PrimaryGeneratedColumn()
  pk?: number;

  @Index()
  @Column({ length: 100 })
  id?: string;

  @Index()
  @Column({ length: 50 })
  email?: string;

  @Column({ length: 100 })
  password?: string;

  public constructor() {}

  public static build(fields: UserFields) {
    return new UserDB().hydrate(fields);
  }

  public hydrate(fields: UserFields): UserDB {
    const { id, email, password } = fields.getData();
    this.id = id;
    this.email = email.email;
    this.password = password;
    return this;
  }

  public getEntity(): User {
    if (!this.id || !this.email) throw new Error("id and/or email not setted");
    return new User(UserFields.rebuild(this.id, this.email, this.password));
  }
}
