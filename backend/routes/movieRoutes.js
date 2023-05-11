const express = require('express')
const router = express.Router()
const { getMovies, setMovie, updateMovie, deleteMovie, setLikes } = require('../controllers/movieController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getMovies).post(protect, setMovie)
router.route('/:id').put(protect, updateMovie).delete(protect, deleteMovie)
router.route('/:id/like').put(protect, setLikes)

module.exports = router