const express = require('express')
const app= express()
const path = require('path')
const methodOverride = require('method-override');
const multer = require('multer')

const mainRoute = require('./routes/mainRoute');
const userRoute = require('./routes/userRoute');

const session = require('express-session');
const cookies = require('cookie-parser');

app.use(session({
    secret: 'Nombre del sitio',
    resave: false,
    saveUninitialized: true,
}));

app.use(cookies())

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', mainRoute);
app.use('/users', userRoute);

app.set('view engine', 'ejs');

app.set('views', './src/views');


app.use('/public/', express.static(__dirname + '../../public/'));


app.get('', (req,res) =>{
    //res.send("Hola Mundo");  // Permite enviar texto o codigo HTML
    res.sendFile(path.resolve(__dirname, './views/home'));  // Permite enviar un archivo HTML
});

app.use(express.static(path.resolve(__dirname, '/public')));

app.listen(3002, () => {
    console.log("Servidor corriendo");
});

