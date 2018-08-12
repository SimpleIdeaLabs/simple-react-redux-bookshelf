
import { ModelInterface } from '../libs/interface/ModelInterface';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ValidationError, ValidationOptions, validate } from 'class-validator';
import { User } from './User';

@Entity()
export class Book implements ModelInterface {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: String

  @Column()
  author: String

  @Column()
  review: String

  @Column()
  pages: String

  @Column()
  rating: Number

  @Column()
  price: String

  @ManyToOne(type => User, user => user.books)
  user: User

  public validate = async (groups?: ValidationOptions): Promise<Array<ValidationError>> => {
    return await validate(this, groups);
  }

}