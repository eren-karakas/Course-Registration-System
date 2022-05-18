const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const Course = require('../models/Course');

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

  const user = await User.findOne({_id : req.session.userID}).populate('courses');
  const courses = await Course.find({user : req.session.userID})

  const allUsers = await User.find();

  res.status(200).render('dashboard',{
    page_name : 'dashboard',
    user,
    courses,
    allUsers
  });
}

const logoutUser = async (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
}

const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id)
  const courses = await Course.deleteMany({user:req.params.id})
  console.log(courses)

  res.status(200).redirect('/users/dashboard');
}

module.exports = {
    createUser,
    loginUser,
    getDashboardPage,
    logoutUser,
    deleteUser
}   