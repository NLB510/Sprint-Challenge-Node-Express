const express = require('express')

const db = require('../data/helpers/actionModel')
//Install/use cors for react

const router = express.Router();


// GET
// GET ALL
router.get('/', (req, res) => {
  db.get()
    .then(actions => {
      res.status(200).json({
        success: true,
        actions
      })
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: "The actions could not be retrieved"
      })
    })
})


// GET ACTION BY ID

router.get('/:id', (req, res) => {
  const id = req.params.id

  db.get(id)
    .then(actions => {
      if (!actions) {
        return res.status(404).json({
          error: "The action with the specified ID does not exist"
        })
      } else {
        res.status(200).json({
          success: true,
          actions
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: "The projects could not be retrieved"
      })
    })
})

// POST

router.post("/", (req, res) => {
  const { project_id, notes, description  } = req.body;
  const newAction = req.body;

  if (!project_id || !description || !notes) {
    return res.status(400).json({
      errorMessage: "Please provide a project id, notes, and description for the action"
    });
  }

  db.insert(newAction)
    .then(action => {
      res.status(201).json({
        success: true,
        action
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: "There was an error while saving the action to the database"
      })
    });
});

// PUT

router.put('/:id', (req, res) => {
  const id = req.params.id
  const { project_id, notes, description } = req.body;
  const changes = req.body

  if (!project_id || !description || !notes) {
    return res.status(400).json({
      errorMessage: "Please provide a project id, notes, and description for the action"
    });
  }

  db.update(id, changes)
    .then(updatedAction => {
      if (!updatedAction) {
        return res.status(404).json({
          success: false,
          message: "The post with the specified Id does not exist."
        })
      } else {
        console.log(updatedAction)
        res.status(201).json({
          success: true,
          updatedAction
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        errorMessage: "The project could not be updated."
      })
    })



})


// DELETE

router.delete("/:id", (req, res) => {
  const id = req.params.id

  db.remove(id)
    .then(action => {
      if (!action) {
        return res.status(404).json({
          success: false,
          message: "The action with the specified Id does not exits."
        })
      } else {
        res.status(204).end();
      }
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: "The action could not be removed"
      })
    })

})




module.exports = router;