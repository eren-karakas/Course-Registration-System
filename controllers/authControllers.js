const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const User = require('../models/User');

const createUser = async (req, res) => {
    try {
      let user = await User.create(req.body);
  
      res.status(201).redirect('/login');
    } catch (error) {
        const errors = validationResult(req);
        console.log(errors);
        res.status(400).redirect('/register');
    }
};

const loginUser = async (req, res) => {
  try{
    const { email, password } = req.body;
    await User.findOne({email}, (err, user) => {
      if(user){
        bcrypt.compare(password, user.password, (err, same) => {
          if(same){
            // Session ID
            req.session.userID = user._id;
            res.status(200).redirect('/users/dashboard');
          }else{
            res.status(400).redirect('/login');
          }
        })
      } else{
        res.status(400).redirect('/register');
      }
    })
  } catch (error){

  }
}

const getDashboardPage = async (req, res) => {

  const user = await User.findOne({_id : req.session.userID})

  res.status(200).render('dashboard',{
    page_name : 'dashboard',
    user,
  });
}

const logoutUser = async (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
}

module.exports = {
    createUser,
    loginUser,
    getDashboardPage,
    logoutUser
}   