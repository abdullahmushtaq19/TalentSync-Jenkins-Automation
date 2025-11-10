const express = require('express');
const {registerUser,loginUser,protectedRoute,} = require('../controllers/userController');

const router = express.Router();
router.get('/api/auth/register', registerUser);
router.post('/api/auth/register', registerUser);
router.post('/api/auth/login', loginUser);
router.get('/api/auth/login', loginUser);
router.post('/api/auth/protected', protectedRoute);


module.exports = router;
