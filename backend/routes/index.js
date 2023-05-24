const express = require('express');
const authcontroller = require('../controller/authController');
const blogController = require('../controller/blogController');
const commentController = require('../controller/commentController');
const router = express.Router();
const auth = require('../middleware/auth');

// =================User Authentication=================
//register
router.post('/register', authcontroller.register);

//login
router.post('/login', authcontroller.login);

//logout
router.post('/logout', auth, authcontroller.logout)

//refresh
router.get('/refresh', authcontroller.refresh)


// =================Blog=================
//create
router.post('/blog', auth, blogController.create);

//getAll
router.get('/blog/all', auth, blogController.getAll);

//get blog by id
router.get('/blog/:id', auth, blogController.getById);

//update
router.put('/blog', auth, blogController.update);

//delete
router.delete('/blog/:id', auth, blogController.delete);

// =================Comment=================
//create
router.post('/comment', auth, commentController.create);

//get
router.get('/comment/:id', auth, commentController.getById);


module.exports = router;