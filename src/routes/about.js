const express = require('express')
const router = express.Router()


router.get('/About', (req, res)=>{
    res.render('/gems/about')
})


module.exports = router