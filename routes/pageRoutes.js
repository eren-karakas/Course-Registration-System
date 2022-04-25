const express = require('express');
const pageControllers = require('../controllers/pageControllers');

const router = express.Router();

router.route('/').get(pageControllers.getHomePage)
router.route('/about').get(pageControllers.getAboutPage)
router.route('/contact').get(pageControllers.getContactPage)
router.route('/lessons').get(pageControllers.getLessonsPage)
router.route('/teachers').get(pageControllers.getTeachersPage)
router.route('/login').get(pageControllers.getLoginPage)
router.route('/register').get(pageControllers.getRegisterPage)


module.exports = router;