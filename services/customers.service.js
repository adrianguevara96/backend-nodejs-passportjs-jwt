const boom = require('@hapi/boom');

//hash password
const bcrypt = require('bcrypt');

const { models } = require('./../libs/sequelize');

class CustomersService {

  constructor() {}

  async create(data) {
    //create a new customer
    // const newCustomer = await models.Customer.create(data);

    //hash password
    const hash = await bcrypt.hash(data.user.password, 10);

    //new data
    const newData = {
      ...data,
      user: {
        ...data.user,
        password: hash
      }
    }

    const newCustomer = await models.Customer.create(newData, { include: ['user'] });

    //delete password to show user
    console.log("newCu: ", newCustomer, newCustomer.user.dataValues)
    delete newCustomer.user.dataValues.password;

    return newCustomer;
  }

  async find() {
    //find all customer
    const response = await models.Customer.findAll({
      include: ['user']
    });

    if(response.length === 0) throw boom.notFound('Customers do not exist');

    return response;
  }

  async findOne(id) {
    //create response with sequelize
    const customer = await models.Customer.findByPk(id);

    if(!customer){
      throw boom.notFound('Customer not found');
    }

    //send response
    return customer;
  }

  async update(id, changes) {
    const customer = await this.findOne(id);
    const response = await customer.update(changes);
    console.log("response to update: ", response);
    return response;
  }

  async delete(id) {
    //find user
    const customer = await this.findOne(id);

    const response = await customer.destroy();
    console.log("response to delete: ", response);
    return id;
  }

}

module.exports = CustomersService;
