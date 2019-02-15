const express = require('express')

const db = require('../data/helpers/projectModel')
//Install/use cors for react

const router = express.Router();


// GET

// GET ALL
router.get('/', (req, res) => {
  console.log(res.data)
  db.get()
  .then(projects => {
    console.log(projects)
    res.status(200).json({
      success: true,
      projects
    })
  })
  .catch(err => {
    res.status(500).json({
      success: false,
      error: "The projects could not be retrieved"
    })
  })
})


// GET PROJECT BY ID

router.get('/:id', (req, res) => {
const id = req.params.id
  
  db.get(id)
    .then(projects => {
      
      if (!projects) {
        return res.status(404).json({
          error: "The project with the specified ID does not exist"
        })
      } else {
        console.log(projects.actions)
        res.status(200).json({
          success: true,
          projects
        })
      }    
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        success: false,
        error: "The projects could not be retrieved"
      })
    })
})



// POST

// PUT

// DELETE






module.exports = router;