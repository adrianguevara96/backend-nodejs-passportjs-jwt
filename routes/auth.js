const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { config } = require('./../config/config.js');

//services
const validatorHandler = require('./../middlewares/validator.handler');
const { authUserSchema } = require('./../schemas/auth.schema')

const router = express.Router();

router.post(
  '/login',
  validatorHandler(authUserSchema, 'body'),
  passport.authenticate('local', {session: false}),
  async (req, res, next) => {
    try {
      //define payload to sign
      const payload = {
        sub: req.user.id,
        role: req.user.role
      }

      //define token
      const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '1d'} );
      
      //response
      res.json({
        message: "user authenticated",
        data: {
          user: req.user,
          token: token
        }
      })
    } catch (error) {
      next(error)
    }
  }
);


module.exports = router;
