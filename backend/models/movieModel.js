const mongoose = require('mongoose')
//importamos mongoose

const movieSchema = mongoose.Schema({
    //esto une la tabla de peliculas con la del user
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    genre: {
        type: String,
        required: [true, 'Please let me know the genre']
    },
    adult: {
        type: Boolean,
        required: [true, 'Please let me know if it has an adult filter']
    },
    backdrop_path: {
        type: String,
        required: [true, 'Please let me know the path']
    },
    original_language: {
        type: String,
        required: [true, 'Please let me know the original language']
    },
    title: {
        type: String,
        required: [true, 'Please let me know the title']
    },
    overview: {
        type: String,
        required: [true, 'Please give me the overview']
    },
    popularity: {
        type: Number,
        required: [true, 'Please let me know the original language']
    },
    poster_path: {
        type: String,
        required: [true, 'Please give me the poster_path']
    },
    release_date: {
        type: Date,
        required: [true, 'Please give me the release date']
    },
    video: {
        type: Boolean,
        required: [true, 'Please let me know if it is a video']
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    link: {
        type: String,
        required: [true, 'Please give me the image link']
    },
    trailer: {
        type: String,
        required: [true, 'Please give me the trailer link']
    }
}, {
    timestamps: true
    //los timestamps nos dan la fecha de creacion y de actualizacion mediante su funcion
})
//en el esquema, le pedimos obligatoriamente los datos que deberá contener nuestra DB
module.exports = mongoose.model('Movie', movieSchema)
//exportamos el esquema con la variable en mayuscula, singular y en string
//el mismo MONGO se encarga de pasarlo a plural y minuscula