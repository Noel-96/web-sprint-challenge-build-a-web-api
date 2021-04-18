// Write your "actions" router here!
const actions = require('./actions-model.js');
const express = require("express");
const router = express.Router();
const mw = require("./actionsMw.js")

router.get("/", (req, res, next)=>{
    actions.get()
    .then(actions=>{
        res.status(200).json(actions);
    })
    .catch(error=>{
        next(error)
    })
})
router.get("/:id", mw.validateActionID, (req, res)=>{
    res.status(200).json(req.action);
})


router.post("/", mw.validateActionBody, (req,res, next)=>{
    actions.insert(req.body)
    .then(action=>{
        res.status(201).json(action);
    })
    .catch(error=>{
        next(error)
    })
})

router.put("/:id", mw.validateActionID, mw.validateActionBody, (req,res, next)=>{
    actions.update(req.params.id, req.body)
    .then(action=>{
        res.status(200).json(action);
    })
    .catch(error=>{
        next(error)
    })
})

router.delete("/:id", mw.validateActionID, (req,res,next)=>{
    actions.remove(req.params.id)
    .then(action=>{
        res.status(200).json(action);
    })
    .catch(error=>{
        next(error)
    })
})

module.exports = router;