const express = require('express')
const author = require('../models/author')
const router = express.Router()
const Author = require('../models/author')
// All authors route
router.get('/',async (req,res) => {
    let searchOptions = {}
    if(req.query.name != null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name,'i')
    }
    try{
    const authors = await Author.find(searchOptions)
    console.log(searchOptions.name)
    res.render('authors/index',{authors : authors,searchOptions})

    }catch{
       res.redirect('/')
    }
})
//  New Author Route
router.get('/new',(req,res) => {
         res.render('authors/new', {author : new Author()})
})
//  Create author route
router.post('/',async (req,res) => {
    // res.send(req.body.name)
    const author = new Author({
        name : req.body.name
    })
    try {
         const newAuthor = await author.save()
         res.redirect(`authors`)
    }
    catch {
         res.render("authors/new" , {
                author : author,
                errorMessage : 'Error Creating Author!!'
            })
    }
})
module.exports = router
