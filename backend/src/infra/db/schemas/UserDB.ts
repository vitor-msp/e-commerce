import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { UserFields } from "../../../domain/entities/user/UserFields";
import { User } from "../../../domain/entities/user/User";
import { ApplicationError } from "../../../errors/ApplicationError";
import { Role } from "../../../domain/value-objects/Role";

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

  @Column({ length: 20 })
  role?: string;

  @Column({ length: 500, nullable: true })
  refreshJwt?: string;

  public constructor() {}

  public static build(user: User) {
    return new UserDB().hydrate(user);
  }

  public hydrate(user: User): UserDB {
    const { id, email, role, password, refreshJwt } = user
      .getFields()
      .getData();
    this.id = id;
    this.email = email.email;
    this.role = role.toString();
    this.password = password;
    this.refreshJwt = refreshJwt;
    return this;
  }

  public getEntity(): User {
    if (!this.id || !this.email)
      throw new ApplicationError("id and/or email not setted");
    return new User(
      UserFields.rebuild(
        this.id,
        this.email,
        Role[this.role as keyof typeof Role],
        this.password,
        this.refreshJwt
      )
    );
  }
}
