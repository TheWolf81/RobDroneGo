import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import config from "../../../config";
import AuthService from '../../services/userService';
import { IUserDTO } from '../../dto/IUserDTO';

import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';
import winston = require('winston');
import isAuth from '../middlewares/isAuth';
import attachCurrentUser from '../middlewares/attachCurrentUser';

import IUserController from '../../controllers/IControllers/IUserController';

const route = Router();

export default (app: Router) => {
  app.use('/auth', route);

  const user_controller = Container.get(config.controllers.user.name) as IUserController;

  route.post(
    '/signupClient',
    celebrate({
      body: Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        username: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        nif: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger') as winston.Logger;
      logger.debug('Calling Sign-Up endpoint with body: %o', req.body )

      try {
        const userOrError = await user_controller.SignUpClient(req, res, next);

        if (userOrError.isFailure) {
          logger.debug(userOrError.errorValue())
          return res.status(401).send(userOrError.errorValue());
        }
    
        const {userDTO, token} = userOrError.getValue();
        console.log("User Created Successfully!!!")
        return res.status(201).json({ userDTO, token });
      } catch (e) {
        //logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.post(
    '/signupAdmin',
    celebrate({
      body: Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        username: Joi.string().required(),
        role: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        phoneNumber: Joi.string(),
        nif: Joi.string(),
      }),
    }),
    isAuth,
    attachCurrentUser,
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger') as winston.Logger;
      logger.debug('Calling Sign-Up endpoint with body: %o', req.body )

      try {
        const userOrError = await user_controller.SignUpAdmin(req as any, res, next);

        if (userOrError.isFailure) {
          logger.debug(userOrError.errorValue())
          return res.status(401).send(userOrError.errorValue());
        }

        const { userDTO, token } = userOrError.getValue();
        console.log("User Created Successfully!!!")
        return res.status(201).json({ userDTO, token });
      } catch (e) {
        //logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );


  route.post(
    '/signin',
    celebrate({
      body: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger') as winston.Logger;
      logger.debug('Calling Sign-In endpoint with body: %o', req.body)
      try {
        const { email, password } = req.body;
        const authServiceInstance = Container.get(AuthService);
        const result = await authServiceInstance.SignIn(email, password);
        
        if( result.isFailure )
          return res.json().status(403);

        const { userDTO, token } = result.getValue();
        return res.json({ userDTO, token }).status(200);

      } catch (e) {
        logger.error('🔥 error: %o',  e );
        return next(e);
      }
    },
  );

  /**
   * @TODO Let's leave this as a place holder for now
   * The reason for a logout route could be deleting a 'push notification token'
   * so the device stops receiving push notifications after logout.
   *
   * Another use case for advance/enterprise apps, you can store a record of the jwt token
   * emitted for the session and add it to a black list.
   * It's really annoying to develop that but if you had to, please use Redis as your data store
   */
  route.post('/logout', middlewares.isAuth, (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get('logger') as winston.Logger;
    logger.debug('Calling Sign-Out endpoint with body: %o', req.body)
    try {
      //@TODO AuthService.Logout(req.user) do some clever stuff
      return res.status(200);
    } catch (e) {
      logger.error('🔥 error %o', e);
      return next(e);
    }
  });

  route.get('/pendingRegistrationUsers', isAuth, attachCurrentUser, async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get('logger') as winston.Logger;
    logger.debug('Calling getPendingResgistrationUsers endpoint with body: %o', req.body)
    try {
      const usersOrError = await user_controller.getPendingResgistrationUsers(req, res, next);

      if (usersOrError.isFailure) {
        logger.debug(usersOrError.errorValue())
        return res.status(401).send(usersOrError.errorValue());
      }

      const userDTOs = usersOrError.getValue();
      return res.status(200).json( userDTOs );
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });

  route.put('/approveOrDenyUserRegistration', 

  celebrate({
    body: Joi.object({
      email: Joi.string().required(),
      newStatus: Joi.string().required(),
    })
  }),
  isAuth,
  attachCurrentUser,
  async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get('logger') as winston.Logger;
    logger.debug('Calling approveUserRegistration endpoint with body: %o', req.body)
    try {
      const userOrError = await user_controller.approveUserRegistration(req, res, next);

      if (userOrError.isFailure) {
        logger.debug(userOrError.errorValue())
        return res.status(401).send(userOrError.errorValue());
      }

      const userDTO = userOrError.getValue();
      return res.status(200).json( userDTO );
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });

  route.patch('/editAccount',
  celebrate({
    body: Joi.object({
      firstName: Joi.string(),
      lastName: Joi.string(),
      username: Joi.string(),
      password: Joi.string(),
      email: Joi.string(), 
      phoneNumber: Joi.string(),
      nif: Joi.string()
    })
  }),
  isAuth,
  attachCurrentUser,
  async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get('logger') as winston.Logger;
    logger.debug('Calling editAccount endpoint with body: %o', req.body)
    try {
      const userOrError = await user_controller.editAccount(req, res, next);

      if (userOrError.isFailure) {
        logger.debug(userOrError.errorValue())
        return res.status(401).send(userOrError.errorValue());
      }

      const userDTO = userOrError.getValue();
      return res.status(200).json( userDTO );
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });

  route.get('/requestDataCopy', 
  isAuth,
  attachCurrentUser,
  async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get('logger') as winston.Logger;
    logger.debug('Calling requestDataCopy endpoint with body: %o', req.body)
    try {

      const userOrError = await user_controller.requestDataCopy(req, res, next);

      if (userOrError.isFailure) {
        logger.debug(userOrError.errorValue())
        return res.status(401).send(userOrError.errorValue());
      }

      const userWithoutSensitiveInfo = userOrError.getValue();

      //res.send(userWithoutSensitiveInfo);

      return res.status(200).json( userWithoutSensitiveInfo );

    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });

  route.delete('/deleteAccount',
  celebrate({
    body: Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    })
  }),
  async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get('logger') as winston.Logger;
    logger.debug('Calling deleteAccount endpoint with body: %o', req.body)
    try {
      const userOrError = await user_controller.deleteAccount(req, res, next);

      if (userOrError.isFailure) {
        logger.debug(userOrError.errorValue())
        return res.status(401).send(userOrError.errorValue());
      }

      const userDTO = userOrError.getValue();
      return res.status(200).json( userDTO );
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });


  app.use('/users', route);

  route.get('/me', middlewares.isAuth, middlewares.attachCurrentUser, user_controller.getMe);
};
