const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const { config } = require('./../config/config');

const UserService = require('./users.service');
const service = new UserService();

class AuthService {

    async getUser(email, password) {
        //find email in bd
        const user = await service.findByEmail(email);
        if(!user) {
            throw boom.unauthorized();
        }
            
        //is password match?
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            throw boom.unauthorized();
        }

        //delete user password
        delete user.dataValues.password;
        return user;
    }

    async signToken(user) {
        //define payload to sign
        const payload = {
            sub: user.id,
            role: user.role
        }

        //define token
        const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '1d'} );

        //response
        return {
            message: "user authenticated",
            data: {
                user: user,
                token: token
            }
        };
    }

    async sendRecoveryPassword(email) {
        //find email in bd
        const user = await service.findByEmail(email);
        if(!user) {
            throw boom.unauthorized();
        }

        const payload = { sub: user.id};
        const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '15min'});
        const link = `https://myfrontend.com/recovery?token=${token}`;

        await service.update(user.id, {recoveryToken: token});
        
        const mail = {      
            from: config.gmailEmail, // sender address
            to: `${user.email}`, // list of receivers
            subject: "Email to recovery password ✔", // Subject line
            html: `<b>Join in this link ${link} :)</b>`, // html body
        };

        const response = await this.sendMail(mail);
        return response;
    }

    async changePassword(token, newPassword) {
        try {
            const payload = jwt.verify(token, config.jwtSecret);
            const user = await service.findOne(payload.sub);
            
            if (user.recoveryToken !== token) {
                throw boom.unauthorized();
            }

            const hash = await bcrypt.hash(newPassword, 10);
            await service.update(user.id, {recoveryToken: null, password: hash});

            return {message: 'Password changed'}
        } catch (error) {
            throw boom.unauthorized();
        }
    }

    async sendMail(infoMail) {
        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            secure: true, // true for 465, false for other ports
            port: 465,
            auth: {
                user: config.gmailEmail,
                pass: config.gmailPassword
            }
        });

        // send mail with defined transport object
        await transporter.sendMail(infoMail);

        return {message: 'mail sent'};
    }

}

module.exports = AuthService;