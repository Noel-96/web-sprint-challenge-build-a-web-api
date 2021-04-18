// Write your "projects" router here!
const express = require('express');
const projectsModel = require("./projects-model")
const middleware = require("./projectsMw.js");


const router = express.Router();


router.get('/', (req, res, next) => {
    // RETURN AN ARRAY WITH ALL THE USERS
    projectsModel.get()
    .then((projects) => {
      res.status(200).json(projects)//users)
    })
    .catch((error) => {
      next(error)
    })
  });


  router.get("/:id", mw.validateProjectID(), (req, res)=>{
    res.status(200).json(req.project);
})


router.post("/", mw.validateProjectBody(), (req,res, next)=>{
    projects.insert(req.body)
    .then(project=>{
        res.status(201).json(project);
    })
    .catch(error=>{
        next(err)
    })
})

router.put("/:id", mw.validateProjectID(), mw.validateProjectBody(), (req,res, next)=>{
    projects.update(req.params.id, req.body)
    .then(project=>{
        res.status(200).json(project);
    })
    .catch(error=>{
        next(err)
    })
})


router.delete("/:id", mw.validateProjectID(), (req,res, next)=>{
    projects.remove(req.params.id)
    .then(project=>{
        res.status(200).json(project);
    })
    .catch(error=>{
        next(err)
    })
})


router.get('/:id/actions', mw.validateProjectID(), (req,res, next)=>{
    projects.getProjectActions(req.params.id)
    .then(actions=>{
        res.status(200).json(actions);
    })
    .catch(error=>{
        next(err)
    })
})


// do not forget to export the router
module.exports = router