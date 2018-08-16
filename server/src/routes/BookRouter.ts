import { Context } from 'koa';
import { Book } from '../models/Book';
import { plainToClass } from 'class-transformer';
import { BaseRouter } from '../libs/core/BaseRouter';
import { BCryptService } from '../services/BCryptService';
import { LoggedInOnly } from '../middlewares/LoggedInOnly';
import { RouterInterface } from '../libs/interface/RouterInterface';

/**
 * Book Routes
 */
export class BookRouter extends BaseRouter implements RouterInterface {

  /**
   * Initialize
   */
  constructor() {
    super();
    this.setUpRoutes();
  }

  /**
   * Set Up routes
   */
  setUpRoutes(): void {
    this.router.prefix('/api/books');
    this.router.get('/', this.showList);
    this.router.post('/', this.saveBook);
    this.router.get('/:id', this.getBook);
    this.router.patch('/:id', this.updateBook);
    this.router.delete('/:id', this.deleteBook);
    this.router.get('/:bookId/owner', this.getBookOwner);
  }

  /**
   * Book Lists
   * @param ctx 
   */
  public showList = async (ctx: Context): Promise<any> => {
    try {
      const { skip = 0, take = 10, sortBy = 'asc', sortColumn = 'id' } = ctx.query;
      const books = await this.database.manager.find(Book, {
        take: take,
        skip: skip,
        order: { 
          [sortColumn]: sortBy.toUpperCase() 
        }
      });
      ctx.status = this.responseCodes.SUCCESS;
      ctx.body = books;
    } catch (e) {
      console.log(e);
      ctx.status = this.responseCodes.INTERNAL_ERROR;
      ctx.body = { errors: e };
    }
  }

  /**
   * Get Book by Id
   */
  public getBook = async (ctx: Context): Promise<any> => {
    try {
      const { id } = ctx.params;
      const book:any = await this.database.manager.findOne('Book', id);
      if (!book) {
        ctx.status = this.responseCodes.NOT_FOUND;
        ctx.body = { errors: `Book not found` };
        return;
      }
      ctx.body = book;
    } catch (e) {
      console.log(e);
      ctx.status = this.responseCodes.INTERNAL_ERROR;
      ctx.body = { errors: e };
    }
  }

  /**
   * Save Book
   */
  public saveBook = async (ctx: Context): Promise<any> => {
    try {
      // Convert to object
      const { username, password } = ctx.request.body;
      const bookClass: any = await plainToClass(Book, ctx.request.body);

      // Check for errors
      const errors = await bookClass.validate();
      if (errors.length) {
        ctx.status = this.responseCodes.INVALID_DATA;
        ctx.body = { errors };
        return;
      }

      // Save
      ctx.status = this.responseCodes.NEW_RESOURCE;
      ctx.body = await this.database.manager.save(Book, bookClass);
    } catch (e) {
      console.log(e);
      ctx.status = this.responseCodes.INTERNAL_ERROR;
      ctx.body = { errors: e };
    }
  }

  /**
   * Get Book's Owner
   */
  public getBookOwner = async (ctx: Context): Promise<any> => {
    try {
      const { bookId } = ctx.params;
      const book = await this.database.manager.findOne(Book, bookId, {
        relations: ['user']
      });
      ctx.body = book;
    } catch (e) {
      console.log(e);
      ctx.status = this.responseCodes.INTERNAL_ERROR;
      ctx.body = { errors: e };
    }
  }

  /**
   * Update Book
   */
  public updateBook = async (ctx: Context): Promise<any> => {
    try {
      const { id } = ctx.params;
      const book = await this.database.con
        .createQueryBuilder()
        .update(Book)
        .set({...ctx.request.body})
        .where("id = :id", { id })
        .execute();
      ctx.status = 200;
      ctx.body = book;
    } catch (e) {
      console.log(e);
      ctx.status = this.responseCodes.INTERNAL_ERROR;
      ctx.body = { errors: e };
    }
  }

  /**
   * Delete Book
   */
  public deleteBook = async (ctx: Context): Promise<any> => {
    try {
      const { id } = ctx.params;
      const book = await this.database.manager.delete(Book, id);
      ctx.status = 200;
      ctx.body = {};
    } catch (e) {
      console.log(e);
      ctx.status = this.responseCodes.INTERNAL_ERROR;
      ctx.body = { errors: e };
    }
  }

}