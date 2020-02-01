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

server.post('/api/cars/', validateNewCar,(req, res)=> {
    const body = req.body
    db('cars').insert(body)
        .then(promise=> {
            res.status(200).json(promise)
        })
        .catch(err=> {
            res.status(500).json({message: 'could not add car data to database'})
        })
})

server.put('/api/cars/:id', validateCarId, (req, res)=> {
    const {id} = req.params
    const changes = req.body
    db('cars').where({id: id}).update(changes)
        .then(promise => {
            res.status(200).json(promise)
        })
        .catch(err=> {
            res.status(500).json({message: 'could not update car information'})
        })
})

server.delete('/api/cars/:id', validateCarId, (req, res) => {
    const {id} = req.params
    db('cars').where({id: id}).del()
        .then(promise=> {
            if(promise >0)
                res.status(200).json({message: 'Success.  Car entry deleted'})
            else
                res.status(400).json({message: 'Error occured.  No car entry found to delete'})
        })
        .catch(err=> {
            res.status(500).json({message: 'Server error; could not delete car entry'})
        })
})

function validateChanges(req,res,next){
    const changes = req.body
    next()
    //currently no unique fields, no need for this function
}

function  validateNewCar(req, res, next){
    const body = req.body
    if(body.make && body.model && body.year && body.color && body.price) 
        next()
    else
        res.status(400).json({error: 'Make, model, year, color, and price fields required.'})
}

function validateCarId(req, res, next) {
    const {id} = req.params
    db('car').where({id: id})
        .then(car=> {
            if(car.length > 0)
                next()
            else
                res.status(400).json({error: 'Invalid car id'})
        })
        .catch(err=> {
            res.status(500).json({error: 'server error'})
        })
}

module.exports = server;