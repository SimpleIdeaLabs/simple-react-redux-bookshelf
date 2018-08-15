import { User } from '../../models/User';
import { Book } from '../../models/Book';
import { plainToClass } from 'class-transformer';
import { BaseSeed } from '../../libs/core/BaseSeed';
import { BCryptService } from '../../services/BCryptService';
import { SeederInterface } from '../../libs/interface/SeederInterface';

/**
 * Seed Users
 */
export class UserSeed extends BaseSeed implements SeederInterface {

  /**
   * Initialize
   */
  constructor() {
    super();
  }

  /**
   * Check if already seeded
   */
  async hasBeenSeed(): Promise<boolean> {
    try {
      const hasData = await this.database.manager.findOne(User);
      if (hasData) return true;
      return false;
    } catch(e) {
      console.log(e);
      throw new Error(e);
    }
  }

  /**
   * Insert User's data
   */
  async execute(): Promise<void> {
    try {
      // Prevent seed twice
      if (await this.hasBeenSeed() === true) return;

      // Create user object
      const newUser = await plainToClass(User, {
        username: 'crc',
        password: await BCryptService.hash('ppwwdd')
      });
      await this.database.manager.save(User, newUser);

      // Save Book
      const newBook1 = await plainToClass(Book, {
        name: 'Star Wars Phantom Menace',
        author: 'George Lucas',
        review: 'This is a great movie',
        pages: 'Pages Sample',
        rating: 10,
        price: '1000',
        user: newUser
      });
      const newBook2 = await plainToClass(Book, {
        name: 'Star Wars Empire Strikes Back',
        author: 'George Lucas',
        review: 'This is a great movie',
        pages: 'Pages Sample',
        rating: 9,
        price: '8000',
        user: newUser
      });
      const newBook3 = await plainToClass(Book, {
        name: 'Star Wars Empire Strikes Back 3',
        author: 'George Lucas',
        review: 'This is a great movie',
        pages: 'Pages Sample',
        rating: 9,
        price: '8000',
        user: newUser
      });
      const newBook4 = await plainToClass(Book, {
        name: 'Star Wars Empire Strikes Back 4',
        author: 'George Lucas',
        review: 'This is a great movie',
        pages: 'Pages Sample',
        rating: 9,
        price: '8000',
        user: newUser
      });
      const newBook5 = await plainToClass(Book, {
        name: 'Star Wars Empire Strikes Back 5',
        author: 'George Lucas',
        review: 'This is a great movie',
        pages: 'Pages Sample',
        rating: 9,
        price: '8000',
        user: newUser
      });
      await this.database.manager.save(Book, [newBook1, newBook2, newBook3, newBook4, newBook5]);

    } catch(e) {
      console.log(e);
      throw new Error(e);
    }
  }

}