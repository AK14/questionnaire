// Настройки
const setup = {port:8080}
// Подключаем express
const express = require ('express');
// const jquery = require('jquery');
// const mongoose = require('mongoose');

const app = express ();
app.use(express.json())

mongoose.connect('mongodb://hooploop14@gmail.com:Sasha68913040@77c7cbc9-5796-41a7-9e0b-00cc1fdef3ad.questionnaire-200.mongo.a.osc-fr1.scalingo-dbs.com:39447/questionnaire-200?replicaSet=questionnaire-200-rs0&ssl=true',
    {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});


// app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/public', express.static(__dirname + '/node_modules/bootstrap/dist') );
app.use('/public', express.static(__dirname + '/node_modules/font-awesome/') );
app.use('/public', express.static(__dirname + '/node_modules/popper.js/dist') );
app.use('/public', express.static(__dirname + '/css') );
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/js', express.static(__dirname + '/node_modules/@poperjs/core/dist'));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

app.get('/quests', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});


// Слушаем порт и при запуске сервера сообщаем
app.listen(process.env.PORT || setup.port, () => {
    console.log('Сервер: порт %s - старт!', setup.port);
});
