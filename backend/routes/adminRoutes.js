const express = require('express')
const router = express.Router()
const { loginAdmin, registerAdmin, getMyData } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', loginAdmin)
router.post('/register', registerAdmin)
router.get('/me', protect, getMyData)

module.exports = router