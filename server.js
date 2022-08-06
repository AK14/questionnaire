// Настройки
const setup = {port:8080}
// Подключаем express
/*const express = require ('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const Quest = require("./quests/quest")
const Question = require("./questions/question")*/

import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import Quest from "./quests/quest.js";
import Question from "./questions/question.js";

import mongoose from 'mongoose';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express ();
app.set('view engine', 'ejs');
app.use('views',express.static(__dirname + ('views')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/*
* database connection
* */
const mongo_url = 'mongodb://localhost:27017/quest';
// const mongo_url = 'mongodb://questionnaire-200:pQJiNmjthbVCnTx7xsP_@77c7cbc9-5796-41a7-9e0b-00cc1fdef3ad.questionnaire-200.mongo.a.osc-fr1.scalingo-dbs.com:39447/questionnaire-200?replicaSet=questionnaire-200-rs0&ssl=true';

// connect to local DB
mongoose.connect(mongo_url).catch(error => handleError(error));
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});


/**
 * Integrate (css and js) to structure
 */
app.use('/js', express.static( __dirname + '/js') );
app.use('/public', express.static(__dirname + '/css') );
app.use('/public', express.static(__dirname + '/node_modules/bootstrap/dist') );
app.use('/public', express.static(__dirname + '/node_modules/font-awesome/') );
app.use('/public', express.static(__dirname + '/node_modules/popper.js/dist') );
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/js', express.static(__dirname + '/node_modules/@poperjs/core/dist'));
app.use('/js/quests/', express.static(__dirname + '/quests/'));

/**
 * Routes
 */

app.get('/', async (req, res) => {
    const quests = await quest.getList();
    res.render('index',{
        title:'Опросы на сайте',
        quests: quests
    })
});

let quest = new Quest();

/**
 * Quest routes
 */

app.get('/quests', async (req, res) => {
    const quests = await quest.getList();
    try {
        // res.send(quests);
        res.render('quest/index', {
            title:'Опросы',
            quests:quests
        })
    } catch (error) {
        res.status(500).send(error);
    }
    // res.sendFile(__dirname + '/quests/index.html')
});
app.get('/quests/:questId', async (req, res) => {
    let paramId = req.params.questId;
    const result = await quest.getById(paramId);
    // res.json(result)
    try {
        // res.send(quests);
        res.render('quest/detail', {
            itemData:result
        })
    } catch (error) {
        res.status(500).send(error);
    }
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
app.post('/quests/create/', async (req, res) => {
    let data = await ({
        title:req.body.title,
        description:req.body.description
    })

    const result = await quest.addQuest(data);
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


/**
 * Questions routes
 */
let question = new Question();

app.get('/question', async (req, res) => {
    const quests = await question.getList();
    res.json(quests);
    /*try {
        // res.send(quests);
        res.render('quest/index', {
            title:'Опросы',
            quests:quests
        })
    } catch (error) {
        res.status(500).send(error);
    }*/
    // res.sendFile(__dirname + '/quests/index.html')
});
app.post('/question/create/', async (req, res) => {
    let data = await ({
        title:req.body.title,
        description:req.body.description,
        quest:req.body.quest,
        answers:req.body.answers.split(',')
    })

    const result = await question.addQuestion(data);
    try {
        res.json(result);
    } catch (error) {
        res.status(500).send(error);
    }
});
app.delete('/question/:id', async (req, res) => {
    let id = req.params.id;
    const result = await question.delete(id);
    try {
        res.json(result);
    } catch (error) {
        res.status(500).send(error);
    }
});
app.get('/question/:questId', async (req, res) => {
    let id = req.params.questId;
    let result = await question.getListByQuestId(id);
    res.json(result);
});


// Слушаем порт и при запуске сервера сообщаем
app.listen(process.env.PORT || setup.port, () => {
    console.log('Сервер: порт %s - старт!', setup.port);
});
