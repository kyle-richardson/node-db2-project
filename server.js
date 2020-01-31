const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/', (req, res)=> {
    res.json({message: 'API Working.  use /api/cars to find list of cars'})
})
server.get('/api', (req, res)=> {
    res.json({message: 'API Working.  use /api/cars to find list of cars'})
})

server.get('/api/cars/', (req, res)=> {
    db('cars')
        .then(cars => {
            res.status(200).json(cars)
        })
        .catch(err=> {
            res.status(500).json({message: 'could not retrieve list of cars'})
        })
})

server.post('/api/cars/', (req, res)=> {
    const body = req.body
    db('cars').insert(body)
        .then(promise=> {
            res.status(200).json(promise)
        })
        .catch(err=> {
            res.status(500).json({message: 'could not add car data to database'})
        })
})



module.exports = server;