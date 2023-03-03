const express = require('express');
const passport = require('passport');

//services
const OrderService = require('./../services/order.service');
//validator handler
const validatorHandler = require('./../middlewares/validator.handler');
//schemas
const { createOrderSchema , updateOrderSchema, getOrderSchema } = require('./../schemas/order.schema');
const { addItemSchema } = require('./../schemas/order-product.schema');

const service = new OrderService();
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const orders = await service.find();
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try{
      const { id } = req.params;
      const order = await service.findOne(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      //body
      const body = req.body;
      const newOrder = await service.create(body);
      //response
      res.json({
        message: "order added",
        data: newOrder
      })
    } catch (error) {
      next(error)
    }
  }
);

//create order from jwt
router.post(
  '/create',
  passport.authenticate('jwt', {session: false}),
  // validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      //body
      const body = { userId: req.user.sub};
      const newOrder = await service.createFromJWT(body);
      //response
      res.json({
        message: "order added",
        data: newOrder
      })
    } catch (error) {
      next(error)
    }
  }
);

router.patch(
  '/:id',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(getOrderSchema, 'params'),
  validatorHandler(updateOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      //params
      const { id } = req.params;
      //receive data
      const body = req.body;
      const order = await service.update(id, body);
      //response
      res.json({
        message: 'order updated',
        data: order
      })
    } catch (error) {
      next(error);
    }

});

router.delete(
  '/:id',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      //params
      const { id } = req.params;
      //receive data
      const order = await service.delete(id);
      //response
      res.json({
        message: 'order deleted',
        id: order
      })
    } catch (error) {
      next(error);
    }

});

//======   ORDER-PRODUCT   ======
router.post(
  '/add-item',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      //body
      const body = req.body;
      const newItem = await service.addItem(body);
      //response
      res.json({
        message: "item added",
        data: newItem
      })
    } catch (error) {
      next(error)
    }
  }
);

module.exports = router;
