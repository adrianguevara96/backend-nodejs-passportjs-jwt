const express = require('express');
const passport = require('passport')

//services
const CustomersService = require('./../services/customers.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createCustomerSchema , updateCustomerSchema, getCustomerSchema } = require('./../schemas/customer.schema')

//middleware authorization
const { checkApiKey } = require('./../middlewares/auth.handler')
const service = new CustomersService();
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const customers = await service.find();
    res.json(customers);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  passport.authenticate('jwt', {session: false}),
  checkApiKey,
  validatorHandler(getCustomerSchema, 'params'),
  async (req,res, next) => {
    try{
      const { id } = req.params;
      const customer = await service.findOne(id);
      res.json(customer);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      //body
      const body = req.body;
      const newCustomer = await service.create(body);
      //response
      res.json({
        message: "customer added",
        data: newCustomer
      })
    } catch (error) {
      next(error)
    }
  }
);

router.patch(
  '/:id',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      //params
      const { id } = req.params;
      //receive data
      const body = req.body;
      const customer = await service.update(id, body);
      //response
      res.json({
        message: 'customer updated',
        data: customer
      })
    } catch (error) {
      next(error);
    }

});

router.delete(
  '/:id',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      //params
      const { id } = req.params;
      //receive data
      const customer = await service.delete(id);
      //response
      res.json({
        message: 'customer deleted',
        id: customer
      })
    } catch (error) {
      next(error);
    }

})

module.exports = router;

