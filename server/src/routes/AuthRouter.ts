import { Context } from 'koa';
import { User } from '../models/User';
import { plainToClass } from 'class-transformer';
import { JWTService } from '../services/JWTService';
import { BaseRouter } from '../libs/core/BaseRouter';
import { RouterInterface } from '../libs/interface/RouterInterface';

/**
 * Auth Routes
 */
export class AuthRouter extends BaseRouter implements RouterInterface {

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
    this.router.prefix('/api/auth');
    this.router.post('/login', this.doLogin);
    this.router.get('/session', this.getSession);
  }

  /**
   * Login User
   */
  public doLogin = async (ctx: Context) => {
    try {
      const userObject:any = await plainToClass(User, ctx.request.body);
      const errors = await userObject.validate({ groups: ['login'] });

      // Check for errors
      if (errors.length) {
        ctx.status = this.responseCodes.INVALID_DATA;
        ctx.body = { errors };
        return;
      }
      
      // Generate Token
      const loggedInUser = await this.database.manager.findOne(User, {
        username: userObject.username 
      },{
        select: ['id', 'username']
      });
      const token = await JWTService.sign(loggedInUser);

      // Success Login
      ctx.status = this.responseCodes.SUCCESS;
      ctx.cookies.set('auth', token);
      ctx.body = {
        token: token,
        userData: loggedInUser
      };

    } catch(e) {
      console.log(e);
      ctx.status = this.responseCodes.INTERNAL_ERROR;
      ctx.body = { errors: e };
    }
  }

  /**
   * Check User Session
   */
  public getSession = async (ctx: Context) => {
    try {
      let cookie = ctx.request.headers.cookie;
      if (!cookie) {
        ctx.status = 401;
        ctx.body = {
          error: 'Not logged in'
        }
      }
      cookie = cookie.split('=');
      const user:any = await JWTService.verify(cookie[1]);
      if (!user) {
        ctx.status = 401;
        ctx.body = {
          error: 'Not logged in'
        }
        return;
      }
      ctx.status = 200;
      ctx.body = {
        token: cookie[1],
        username: user.username,
        id: user.id
      };
    } catch (e) {
      ctx.status = 401;
      ctx.body = {
        error: 'Not logged in',
        e: e
      }
    }
  }

}