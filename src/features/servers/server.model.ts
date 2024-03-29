import { Column, Model, Table, BelongsToMany } from 'sequelize-typescript';
import { ServerUser } from 'src/features/server-user/server-user.model';
import { User } from 'src/features/users/user.model';

@Table({ tableName: 'servers' })
export class Server extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column
  name: string;

  @Column
  photo: string;

  @Column
  admin: string;

  @Column({ defaultValue: false })
  isPublic: boolean;

  @Column({ defaultValue: true })
  isActive: boolean;

  @Column({ defaultValue: 1 })
  totalMembers: number;

  @BelongsToMany(() => User, () => ServerUser)
  members: User[];
}
