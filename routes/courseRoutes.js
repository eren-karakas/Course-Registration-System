const express = require('express');
const courseControllers = require('../controllers/courseControllers');
const roleMiddlewares = require('../middlewares/roleMiddleware');

const router = express.Router();

router.route('/create').post(roleMiddlewares(["Teacher", "Admin"]), courseControllers.createCourse)
router.route('/:slug').get(courseControllers.getCourse)
router.route('/:slug').delete(roleMiddlewares(['Teacher', 'Admin']),courseControllers.deleteCourse)
router.route('/:slug').put(roleMiddlewares(['Teacher', 'Admin']),courseControllers.updateCourse)

module.exports = router