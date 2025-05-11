const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/updateUser', verifyToken, userController.updateUser);

// // POST /user
// router.post('/user', (req, res) => {
//     const { error, value } = userSchema.validate(req.body);

//     if (error) {
//         return res.status(400).json({ error: error.details[0].message });
//     }

//     res.status(200).json({
//         message: `User ${value.name} with role ${value.role} received successfully!`,
//         data: value
//     });
// });

module.exports = router;
