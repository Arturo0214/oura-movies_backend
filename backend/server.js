const express = require('express')
const colors = require('colors')
const connectDB = require('./config/db.js')
const dotenv = require("dotenv").config()
const cors = require('cors')
const {errorHandler} = require('./middleware/errorMiddleware')
const port = process.env.PORT || 5000

connectDB()
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false}))

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/movies', require('./routes/movieRoutes'))

// Ruta para reproducir el video de YouTube
app.get('/video', (req, res) => {
    const videoUrl = req.query.url;
    res.header('Access-Control-Allow-Origin', '*'); // Agregar la cabecera
    res.send(`
      <html>
        <body>
          <iframe width="560" height="315" src="${videoUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </body>
      </html>
    `);
});

app.use(errorHandler)
app.listen(port, () => console.log(`Server iniciado en el puerto ${port}`))