const User = require('../models/User');
const Course = require('../models/Course');

const createCourse = async (req, res) => {
    const course = await Course.create({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        user: req.session.userID,
    });

    res.redirect('/login');
}

const getCourse = async (req, res) => {
    const course = await Course.findOne({slug : req.params.slug});
    const user = await User.findById(req.session.userID);
    
    res.status(200).render('course', {
        course,
        user,
        page_name: 'lessons'
    })
}

const deleteCourse = async (req, res) => {
    const course = await Course.findOneAndRemove({slug : req.params.slug})
    res.status(200).redirect('/users/dashboard');
}

const updateCourse = async (req, res) => {
    const course = await Course.findOne({slug : req.params.slug});
    course.name = req.body.name;
    course.description = req.body.description;
    course.save();

    res.status(200).redirect('/users/dashboard');
}

const enrollCourse = async (req, res) => {
    try{
        const user = await User.findById(req.session.userID);
        const course = await Course.findById(req.body.course_id)

        await user.courses.push({ _id: req.body.course_id });
        await course.studentCount.push({ _id: req.session.userID });

        await user.save();
        await course.save();

        res.status(200).redirect('/users/dashboard');
    } catch(err){
        console.log(err)
    }
}

const releaseCourse = async (req, res) => {
    try{
        const user = await User.findById(req.session.userID);
        const course = await Course.findById(req.body.course_id);

        await user.courses.pull({ _id: req.body.course_id });
        await course.studentCount.pull({ _id: req.session.userID });

        await user.save();
        await course.save();

        res.status(200).redirect('/users/dashboard');
    } catch(err){
        console.log(err)
    }
}

module.exports = {
    createCourse,
    getCourse,
    deleteCourse,
    updateCourse,
    enrollCourse,
    releaseCourse
}