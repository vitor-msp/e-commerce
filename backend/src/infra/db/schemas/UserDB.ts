import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { UserFields } from "../../../domain/entities/user/UserFields";
import { User } from "../../../domain/entities/user/User";
import { ApplicationError } from "../../../errors/ApplicationError";

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

  @Column({ length: 500 })
  refreshJwt?: string;

  public constructor() {}

  public static build(user: User) {
    return new UserDB().hydrate(user);
  }

  public hydrate(user: User): UserDB {
    const { id, email, password } = user.getFields().getData();
    this.id = id;
    this.email = email.email;
    this.password = password;
    return this;
  }

  public getEntity(): User {
    if (!this.id || !this.email)
      throw new ApplicationError("id and/or email not setted");
    return new User(UserFields.rebuild(this.id, this.email, this.password));
  }
}
