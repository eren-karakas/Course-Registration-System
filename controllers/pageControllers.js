const getHomePage = (req, res) => {
    res.status(200).render('home', {
        page_name: 'home'
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

const getLessonsPage = (req, res) => {
    res.status(200).render('lessons', {
        page_name: 'lessons'
    });
}

const getTeachersPage = (req, res) => {
    res.status(200).render('teachers', {
        page_name: 'teachers'
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