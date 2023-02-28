const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt')

const UserService = require('./../../../services/users.service');
const service = new UserService();

const LocalStrategy = new Strategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    async (email, password, done) => {
        try {
            //find email in bd
            const user = await service.findByEmail(email);
            if(!user) {
                done(boom.unauthorized(), false);
            }
            
            //is password match?
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch) {
                done(boom.unauthorized(), false);
            }

            //delete user password
            delete user.dataValues.password;

            //email and password successful
            done(null, user);
        } catch (error) {
            done(error, false);
        }
    }
);

module.exports = { LocalStrategy };