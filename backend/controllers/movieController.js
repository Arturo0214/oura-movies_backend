const asyncHandler = require('express-async-handler')
const Movie = require('../models/movieModel')

// Obtener todas las películas
const getMovies = asyncHandler(async (req, res) => {
    try {
      const movies = await Movie.find().populate('user', 'name email')
      res.status(200).json(movies)
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener las películas', error })
    }
  })
  
// Crear una película
const setMovie = asyncHandler (async (req, res) => {
 try{   
  const userId = req.user._id
    const { genre, adult, backdrop_path, original_language, title, overview, popularity, poster_path, release_date, video, likes, link, trailer } = req.body
    if(!req.body) {
      res.status(400)
      throw new Error("All the fields are required")
    }
    if(!req.user || !req.user.isAdmin === true) {
      res.status(401)
      throw new Error('Authentication failed: admin not found in request')
    }
    const movie = new Movie({
      user: userId,
      genre,
      adult,
      backdrop_path,
      original_language,
      title,
      overview,
      popularity,
      poster_path,
      release_date,
      video,
      likes,
      link,
      trailer
    })
    const createdMovie = await movie.save()
    res.status(201).json(createdMovie)
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
    //respuesta del servidor si se cumplen las especificaciones
})

const updateMovie = asyncHandler(async (req, res) => {
  const { id } = req.params
  try {
    const movie = await Movie.findById(id)
    if (!movie) {
      return res.status(404).json({ message: 'Película no encontrada' })
    }
    if (!req.user || !req.user.isAdmin === true) {
      return res.status(401).json({ message: 'Solo los administradores pueden actualizar películas' })
    }
    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, { new: true })
    res.status(200).json(updatedMovie)
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la película', error })
  }
})

// Borrar una película
const deleteMovie = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.id)
  try {
    if (!movie) {
      return res.status(404).json({ message: 'Película no encontrada' })
    }
    if (req.user.isAdmin !== true && req.user._id !== movie.user.toString()) {
      return res.status(401).json({ message: 'Solo el administrador puede eliminar esta película' });
    }
    await Movie.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Película eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la película', error });
  }  
})
  
module.exports = { 
    getMovies, 
    setMovie, 
    updateMovie,
    deleteMovie
}
