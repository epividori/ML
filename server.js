const express = require('express');
const path = require('path');

const app = express();  

const routes = require('./routes');
const build = path.join(__dirname, './build');

// Settings
app.set('port', process.env.PORT || 3000)

// Middlewares
app.use(express.json());

// Routes
app.use('/api', routes);

// Static files
app.use(express.static(build)); 

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'))   
});

// Starting the server
app.listen(app.get('port'), () => { 
    console.log(`Servidor iniciado en puerto ${app.get('port')}`);
});