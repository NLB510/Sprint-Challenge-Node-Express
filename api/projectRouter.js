const express = require("express");

const db = require("../data/helpers/projectModel");
//Install/use cors for react

const router = express.Router();

// GET

// GET ALL
router.get("/", (req, res) => {
  console.log(res.data);
  db.get()
    .then(projects => {
      console.log(projects);
      res.status(200).json({
        success: true,
        projects
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: "The projects could not be retrieved"
      });
    });
});

// GET PROJECT BY ID

router.get("/:id", (req, res) => {
  const id = req.params.id;

  db.get(id)
    .then(projects => {
      if (!projects) {
        return res.status(404).json({
          error: "The project with the specified ID does not exist"
        });
      } else {
        console.log(projects.actions);
        res.status(200).json({
          success: true,
          projects
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        success: false,
        error: "The projects could not be retrieved"
      });
    });
});

// POST

router.post("/", (req, res) => {
  const { name, description } = req.body;
  const newProject = req.body;

  if (!name || !description) {
    return res.status(400).json({
      errorMessage: "Please provide a name and description for the project"
    });
  }

  db.insert(newProject)
    .then(project => {
      res.status(201).json({
        success: true,
        project
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: "There was an error while saving the project to the database"
      })
    });
});

// PUT

router.put('/:id', (req, res) => {
  const id = req.params.id
  const changes = req.body

  if (!changes.name || !changes.description) {
    return res.status(400).json({
      errorMessage: "Please provide a name and description for the project"
    });
  }

  db.update(id, changes)
  .then(updatedProject => {
    if (!updatedProject) {
      return res.status(404).json({
        success: false,
        message: "The project with the specified Id does not exist."
      })
    } else {
      res.status(201).json({
        success: true,
        updatedProject
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
  .then(project => {
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "The project with the specified Id does not exist."
      })
    } else {
      res.status(204).end();
    }
  })
  .catch(err => {
    res.status(500).json({
      success: false, 
      error: "The project could not be removed"
    })
  })

})



module.exports = router;
