// Настройки
const setup = {port:8080}
// Подключаем express
const express = require ('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const Quest = require("./quests/quest")

const app = express ();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/*
* database connection
* */

/*mongoose.connect('mongodb://AlexanderRed:Hel3289608@77c7cbc9-5796-41a7-9e0b-00cc1fdef3ad.questionnaire-200.mongo.a.osc-fr1.scalingo-dbs.com:39447/quest?authSource=questionnaire-200').catch(error => handleError(error));
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});*/

// connect to local DB
mongoose.connect('mongodb://localhost:27017/quest').catch(error => handleError(error));
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});


/**
 * Integrate (css and js) to structure
 */
app.use('/js', express.static(__dirname + '/js'));
app.use('/public', express.static(__dirname + '/node_modules/bootstrap/dist') );
app.use('/public', express.static(__dirname + '/node_modules/font-awesome/') );
app.use('/public', express.static(__dirname + '/node_modules/popper.js/dist') );
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/js', express.static(__dirname + '/node_modules/@poperjs/core/dist'));
app.use('/js/quests/', express.static(__dirname + '/quests/'));
app.use('/public', express.static(__dirname + '/css') );

/**
 * Routes
 */

app.get('/', (req, res) => {
    res.render('index',{
        title:'Questionnaire'
    })
});

const quest = new Quest();
app.get('/quests', async (req, res) => {
    const quests = await quest.getList();
    try {
        // res.send(quests);
        res.render('quests', {
            title:'Опросы',
            quests:quests
        })
    } catch (error) {
        res.status(500).send(error);
    }
    // res.sendFile(__dirname + '/quests/index.html')
});

app.delete('/quests/delete/', async (req, res) => {
    let id = await (req.body.id);
    const result = await quest.deleteQuest(id);
    try {
        res.json(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post('/quests/edit/', async (req, res) => {
    let id = await (req.body.id);
    let data = await ({
        title:req.body.title,
        description:req.body.description
    })

    const result = await quest.editQuest(id,data);
    try {
        res.json(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get("/users", async (request, response) => {
    const users = await userModel.find({});
    try {
        response.send(users);
    } catch (error) {
        response.status(500).send(error);
    }
});


// Слушаем порт и при запуске сервера сообщаем
app.listen(process.env.PORT || setup.port, () => {
    console.log('Сервер: порт %s - старт!', setup.port);
});
