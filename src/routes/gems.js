const express = require('express')
const router = express.Router()
const GemModel = require('../models/Gem')

router.get('/gems/add', (req, res)=>{
    res.render('gems/new-gem')
})

router.get('/about', (req, res)=>{
    res.render('/gems/about')
})

router.get('/gems', async(req, res)=>{ 
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
        
        res.render('gems/all-gems', {gems: ctx.gems})
    })
})


router.post('/gems/new-gem', async(req,res)=>{
  

            const gema = {
                name: req.body.name,
                description: req.body.description,
                price: parseInt(req.body.price),
                canPurchase: req.body.canPurchase = "on" ? true : false,
                specs: {
                    faces: parseInt(req.body.faces),
                    color:  req.body.color,
                    rarity: parseInt(req.body.rarity),
                    shine: parseInt(req.body.shine),
                } , 
                images: {
                        url: req.body.url,
                        number: parseInt(req.body.number),
                    },
                reviews:{
                    stars: parseInt(req.body.star),
                    body: req.body.body,
                    author: req.body.author,
                }
            }

        const newGem = new GemModel(gema)

        await newGem.save()
        res.redirect('/gems')
    
})

router.get('/gems/edit/:id', async(req, res)=>{
    const gemDB = await GemModel.findById(req.params.id)
    const Gem = {
        _id: gemDB._id,
        name: gemDB.name,
        description: gemDB.description,
        price: gemDB.price,
        canPurchase: gemDB.canPurchase, 
        faces: gemDB.specs.faces, 
        color: gemDB.specs.color, 
        rarity: gemDB.specs.rarity, 
        shine: gemDB.specs.shine,
        url: gemDB.images[0].url, 
        number: gemDB.images[0].number, 
        stars: gemDB.reviews[0].stars, 
        body: gemDB.reviews[0].body, 
        author: gemDB.reviews[0].author,
        creationDate: gemDB.creationDate
    }
    res.render('gems/edit-gem', {Gem})
})

router.put('/gems/edit-gem/:id',async(req, res)=>{
     const gemas = req.body 
     
     const newGem2 = {
        name: gemas.name,
        description: gemas.description,
        price:  gemas.price,
        canPurchase: gemas.canPurchase,
        specs: {
            faces: gemas.faces,
            color: gemas.color,
            rarity: gemas.rarity,
            shine: gemas.shine,
        } , 
        images: {
                url: gemas.url,
                number: gemas.number
            },
        reviews:{
            stars: gemas.star,
            body: gemas.body,
            author: gemas.author
        }
    }
    console.log("newGem2", newGem2)
    await GemModel.findByIdAndUpdate(req.params.id, newGem2)
    res.redirect('/gems')
})

router.delete('/gems/delete/:id', async(req, res)=>{
    await GemModel.findByIdAndDelete(req.params.id)
    res.redirect('/gems')
})

module.exports = router