// Настройки
const setup = {port:8000}
// Подключаем express
const express = require ('express');
// const jquery = require('jquery');
// const mongoose = require('mongoose');

const app = express ();
app.use(express.json())


// app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/public', express.static(__dirname + '/node_modules/bootstrap/dist') );
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/js', express.static(__dirname + '/node_modules/@poperjs/core/dist'));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});


// Слушаем порт и при запуске сервера сообщаем
app.listen(process.env.PORT || 5000, () => {
    console.log('Сервер: порт %s - старт!', setup.port);
});
