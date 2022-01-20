const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const userController = require('../server/controllers/userControllers');
const dietController = require('../server/controllers/dietControllers');

//--------------------USERS
router.post('/signup', userController.signup);

router.post('/login', userController.login)

router.post('/updateUser',  userController.allowIfLoggedin, userController.updateUser);

router.delete('/deleteUser', userController.allowIfLoggedin, userController.deleteUser);

router.get('/getUser', userController.allowIfLoggedin, userController.getUser);

router.get('/getAllUsers', userController.allowIfLoggedin, userController.getAllUsers);

router.get('/getFilteredUsers', userController.allowIfLoggedin, userController.getFilteredUsers);


//------------------DIET
router.post('/newDiet', userController.allowIfLoggedin, dietController.addNewDiet);

router.post('/updDiet',  userController.allowIfLoggedin, dietController.updateDiet);

router.delete('/delDiet', userController.allowIfLoggedin, dietController.deleteDiet);

// router.get('/getDiet', userController.allowIfLoggedin, dietController.getDiet);

router.get('/getFilteredDiets', userController.allowIfLoggedin, dietController.getFilteredDiets);

router.get('/getAllDiets', userController.allowIfLoggedin, dietController.getAllDiets);




module.exports = router;
