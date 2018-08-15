
import { ModelInterface } from '../libs/interface/ModelInterface';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Length, ValidationError, ValidationOptions, validate } from 'class-validator';
import { User } from './User';

@Entity()
export class Book implements ModelInterface {

  @PrimaryGeneratedColumn()
  id: number;

  @Length(0, 80)
  @Column()
  name: String

  @Length(0, 80)
  @Column()
  author: String

  @Length(0, 80)
  @Column()
  review: String

  @Length(0, 80)
  @Column()
  pages: String

  @Column()
  rating: Number

  @Length(0, 80)
  @Column()
  price: String

  @ManyToOne(type => User, user => user.books)
  user: User

  @Column()
  userId: number

  public validate = async (groups?: ValidationOptions): Promise<Array<ValidationError>> => {
    return await validate(this, groups);
  }

}