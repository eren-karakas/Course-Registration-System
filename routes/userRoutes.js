const express = require('express');
const { body } = require('express-validator');
const User = require('../models/User');
const authControllers = require('../controllers/authControllers');

const router = express.Router();

router.route('/signup').post(
    [
        body('name').not().isEmpty().withMessage(' Please Enter Your Name ! '),

        body('email').isEmail().withMessage(' Please Enter Valid Email !')
        .custom((userEmail) => {
            return User.findOne({email: userEmail}).then(user => {
                if(user){
                    return Promise.reject(' Email is Already Exists !');
                }
            })
        }),

        body('password').not().isEmpty().withMessage(' Please Enter A Password !'),
    ],
    authControllers.createUser);

router.route('/login').post(authControllers.loginUser);
router.route('/dashboard').get(authControllers.getDashboardPage);
router.route('/logout').get(authControllers.logoutUser);

module.exports = router;