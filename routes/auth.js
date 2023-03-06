const express = require('express');
const passport = require('passport');

//services
const AuthService = require('./../services/auth.service');

const validatorHandler = require('./../middlewares/validator.handler');
const { authUserSchema, recoveryPasswordSchema, createNewPasswordSchema } = require('./../schemas/auth.schema')

const router = express.Router();

const service = new AuthService();

router.post(
  '/login',
  validatorHandler(authUserSchema, 'body'),
  passport.authenticate('local', {session: false}),
  async (req, res, next) => {
    try {
      const user = req.user;
      delete user.dataValues.recoveryToken;

      res.json( await service.signToken(user));
    } catch (error) {
      next(error)
    }
  }
);

router.post(
  '/recovery',
  validatorHandler(recoveryPasswordSchema, 'body'),
  async (req, res, next) => {
    try {
      //body
      const { email } = req.body;
      const response = await service.sendRecoveryPassword(email);
      res.json(response);
    } catch (error) {
      next(error)
    }
  }
);

router.post(
  '/change-password',
  validatorHandler(createNewPasswordSchema, 'body'),
  async (req, res, next) => {
    try {
      //body
      const { token, password } = req.body;
      const response = await service.changePassword(token, password);
      res.json(response);
    } catch (error) {
      next(error)
    }
  }
);


module.exports = router;
