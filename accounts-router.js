const express = require('express');

// database access using knex
const db = require('./data/dbConfig'); // db is connection to database

const router = express.Router();


router.get('/', (req, res) => {
    db('accounts').then(accounts => {
        res.status(200).json(accounts)
    })
    .catch(err => res.status(500).json({error: err.message}))
})
router.get('/:id', (req,res) => {
    db('accounts').where({id: req.params.id})
    .then(account => {
        res.status(200).json(account)
    })
    .catch(err => {
        res.status(500).json({error: 'error finding the post with that id'})
    })
})
router.post('/', (req,res) => {
    const account = req.body
    db('accounts').insert(account, "id").then(ids => {
        res.status(201).json({inserted: ids})
    })
    .catch(err => res.status(500).json({error: err.message}))
})
router.put('/:id', (req,res) => {
    const changes = req.body
    const postId = req.params.id
    db('accounts').where({id: postId}).update(changes)
    .then(count => {
        if(count) {
            res.status(200).json({message: 'Updated Successfully'})
        } else {
            res.status(404).json({error: 'not found'})
        }
    })
})
router.delete('/:id', (req,res) => {
    const postId = req.params.id
    db('accounts').where({id: postId}).delete()
    .then(count => {
        if(count) {
            res.status(200).json({message: 'Removed Successfully'})
        } else {
            res.status(404).json({error: 'not found'})
        }
    })    
})

module.exports = router