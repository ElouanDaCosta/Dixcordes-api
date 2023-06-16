import { Column, Model, Table, HasOne } from 'sequelize-typescript';
import { Photo } from '../photos/photo.model';

@Table({ tableName: 'users' })
export class User extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column({ defaultValue: false })
  isAdmin: boolean;

  @Column({ defaultValue: true })
  isActive: boolean;

  // @HasOne(() => Photo)
  // photo: Photo;
}
