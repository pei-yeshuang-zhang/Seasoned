const express = require('express')

const db = require('../db/produce')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const result = await db.readProduce()
    res.json(result)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

// Get a single produce item by id
router.get('/:id', async (req, res) => {
  try {
    const result = await db.readOneProduce(req.params.id)
    res.json(result)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.post('/', async (req, res) => {
  try {
    const response = await db.createProduce(req.body)
    const newProduce = await db.readOneProduce(response)
    res.json(newProduce)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const response = await db.updateProduce(req.body, req.params.id)
    const updatedResp = await db.readOneProduce(req.params.id)
    res.json(updatedResp)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const produceDeletedResp = await db.deleteProduce(req.params.id)
    res.json(produceDeletedResp)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

module.exports = router
