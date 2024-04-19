// Import library
import express from 'express';

// Initialize Express app
const app = express();
export const __dirname = import.meta.dirname;

// Serve static assets from 'assets' folder
app.use(express.static('assets'));

// Root 
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Array of user names
const usuarios = [
    'felipe',
    'ignacio',
    'romina',
    'macarena',
    'cristian',
    'luis',
    'francisco'
];

// Route to return array of users in JSON format
app.get('/abracadabra/usuarios', (req, res) => {
    res.json({ usuarios });
});

// Middleware to authenticate user
app.use('/abracadabra/juego/:usuario', (req, res, next) => {
    const nombre = req.params.usuario;
    if (!usuarios.includes(nombre)) {
        return res.sendFile(__dirname + '/assets/who.jpeg');
    }
    next();
});

// Route for authenticated user
app.get('/abracadabra/juego/:usuario', (req, res) => {
    const nombre = req.params.usuario;
    res.send(`<h2>${nombre} autentificado, presiona el boton para jugar</h2>
              <button onclick="window.location.href='/'">Click me!</button>`);
});

// Route to serve images based on random number
app.get('/abracadabra/conejo/:n', (req, res) => {
    const n = Math.floor(Math.random() * 4) + 1;
    const numero = req.params.n;
    if (numero == n) {
        res.sendFile(__dirname + '/assets/conejito.jpg');
    } else {
        res.sendFile(__dirname + '/assets/voldemort.jpg');
    }
});

// Route to handle undefined routes
app.get('*', (req, res) => {
    res.send('<h2>Esta página no existe...</h2>');
});

// Server listening on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`app listening on http://localhost:${PORT}`);
});
