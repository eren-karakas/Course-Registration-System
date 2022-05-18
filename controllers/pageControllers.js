const User = require('../models/User');
const Course = require('../models/Course');

const getHomePage = async (req, res) => {
    const allCourses = await Course.find().sort('-createdAt').limit(3).populate('user');

    res.status(200).render('home', {
        page_name: 'home',
        allCourses
    });
}

const getAboutPage = (req, res) => {
    res.status(200).render('about', {
        page_name: 'about'
    });
}

const getContactPage = (req, res) => {
    res.status(200).render('contact', {
        page_name: 'contact'
    });
}

const getLessonsPage = async (req, res) => {
    const allCourses = await Course.find().sort('-createdAt')

    res.status(200).render('lessons', {
        page_name: 'lessons',
        allCourses
    });
}

const getTeachersPage = async (req, res) => {
    const allTeachers = await User.find({role: 'Teacher'});

    res.status(200).render('teachers', {
        page_name: 'teachers',
        allTeachers
    });
}

const getLoginPage = (req, res) => {
    res.status(200).render('login', {
        page_name: 'login'
    });
}

const getRegisterPage = (req, res) => {
    res.status(200).render('register', {
        page_name: 'register'
    });
}

module.exports = {
    getHomePage,
    getAboutPage,
    getContactPage,
    getLessonsPage,
    getTeachersPage,
    getLoginPage,
    getRegisterPage
}