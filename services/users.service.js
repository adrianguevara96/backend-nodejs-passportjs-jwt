const boom = require('@hapi/boom');

//hash password
const bcrypt = require('bcrypt');

//bd sequelize connection
const sequelize = require('./../libs/sequelize');

const { models } = require('./../libs/sequelize');

class UsersService {

  constructor() {}

  async create(data) {
    //hash password
    const hash = await bcrypt.hash(data.password, 10);

    //create user
    const newUser = await models.User.create({
      ...data,
      password: hash
    });

    //delete password to show user
    delete newUser.dataValues.password;

    return newUser;
  }

  async find() {
    //create query
    // const query = 'SELECT * FROM USERS';

    // Con pool
    // const response = await this.pool.query(query);
    
    // Con sequelize para visualizar la data y la metadata
    // const [data, metadata] = await sequelize.query(query);

    // Con sequelize para enviar la data
    // const [data] = await sequelize.query(query);

    //Ahora con los metodos propios de sequelize
    const response = await models.User.findAll({
      include: ['customer']
    });

    console.log("users: ", response.length)

    if(response.length === 0) throw boom.notFound('Users do not exist');

    return response;
  }

  async findOne(id) {
    //create response with sequelize
    const user = await models.User.findByPk(id);

    if(!user){
      throw boom.notFound('User not found');
    }

    //send response
    return user;
  }

  async findByEmail(email) {
    //Ahora con los metodos propios de sequelize
    const response = await models.User.findOne({
      where: { email }
    });

    if(response.length === 0) throw boom.notFound('Email not found');

    return response;
  }

  async update(id, changes) {
    // //find user
    // const user = await this.findOne(id);

    // if(user.length === 0) throw boom.notFound('User not found');

    // //user to update
    // const userUpdate = {
    //   ...user[0],
    //   ...changes
    // };

    // //create query to update user
    // const query = `UPDATE USERS SET NAME='${userUpdate.name}', LASTNAME='${userUpdate.lastname}', ADDRESS='${userUpdate.address}' WHERE ID = ${id}`

    // //create response
    // const response = await this.pool.query(query);

    // //send response
    // if(response.rowCount > 0) return userUpdate;
    const user = await this.findOne(id);
    const response = await user.update(changes);
    console.log("response to update: ", response);
    return response;
  }

  async delete(id) {

    // //find user
    // const user = await this.findOne(id);

    // if(user.length === 0) throw boom.notFound('User not found');

    // //create query to delete user
    // const query = `DELETE FROM USERS WHERE ID = ${id}`

    // //create response
    // const response = await this.pool.query(query);

    // //send response
    // if(response.rowCount > 0) return user;

    const user = await this.findOne(id);
    const response = await user.destroy();
    console.log("response to delete: ", response);
    return id;
  }

}

module.exports = UsersService;
