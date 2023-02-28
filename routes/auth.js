const express = require('express');
const passport = require('passport');

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
      //response
      res.json({
        message: "user authenticated",
        data: req.user
      })
    } catch (error) {
      next(error)
    }
  }
);


module.exports = router;
