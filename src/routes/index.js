const express = require('express')
const router = express.Router()
const GemModel = require('../models/Gem')


router.get('/', async(req, res)=>{ 
    await GemModel.find({}).sort({creationDate: 'desc'}).then(concepts =>{
        const ctx = {
            gems: concepts.map(concept=>{
                return {
                    _id: concept._id,
                    name: concept.name,
                    description: concept.description,
                    price: concept.price,
                    canPurchase: concept.canPurchase,
                    faces: concept.specs.faces,
                    color: concept.specs.color,
                    rarity: concept.specs.rarity,
                    shine: concept.specs.shine,
                    url: concept.images[0].url,
                    number: concept.images[0].number,
                    stars: concept.reviews[0].stars,
                    body: concept.reviews[0].body,
                    author: concept.reviews[0].author
                } 
            })
        }
        
        res.render('index', {gems: ctx.gems})
    })
}) 
 


router.get('/About', async(req, res)=>{ 
    await GemModel.find({}).sort({creationDate: 'desc'}).then(concepts =>{
        const ctx = {
            gems: concepts.map(concept=>{
                return {
                    _id: concept._id,
                    name: concept.name,
                    description: concept.description,
                    price: concept.price,
                    canPurchase: concept.canPurchase,
                    faces: concept.specs.faces,
                    color: concept.specs.color,
                    rarity: concept.specs.rarity,
                    shine: concept.specs.shine,
                    url: concept.images[0].url,
                    number: concept.images[0].number,
                    stars: concept.reviews[0].stars,
                    body: concept.reviews[0].body,
                    author: concept.reviews[0].author
                } 
            })
        }
        
        res.render('about', {gems: ctx.gems})
    })
}) 



module.exports = router