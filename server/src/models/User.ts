import { BaseModel } from '../libs/core/BaseModel';
import { ValidateLogin } from '../validators/LoginValidator';
import { IsUsernameTaken } from '../validators/IsUsernameTaken';
import { ModelInterface } from '../libs/interface/ModelInterface';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Length, ValidationError, ValidationOptions, validate } from 'class-validator';
import { Book } from './Book';

@Entity()
export class User implements ModelInterface {

  @PrimaryGeneratedColumn()
  id: number;

  @Length(1, 80, {
    groups: ['save', 'update', 'login']
  })
  @IsUsernameTaken({
    message: 'Username is already taken.',
    groups: ['save', 'update']
  })
  @ValidateLogin({
    message: 'Account not found.',
    groups: ['login']
  })
  @Column()
  username: String

  @Length(1, 80, {
    groups: ['save', 'update', 'login']
  })
  @Column()
  password: String

  @OneToMany(type => Book, book => book.user)
  books: Book

  public validate = async (groups?: ValidationOptions): Promise<Array<ValidationError>> => {
    return await validate(this, groups);
  }

}