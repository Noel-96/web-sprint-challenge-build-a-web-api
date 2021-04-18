const projects = require("./projects-model.js")

// function validateProjectID(req, res, next){
//     projects.get(req.params.id)
//     .then(project=>{
//         if (!project || Object.keys(project).length === 0){
//             return res.status(404).json("Project with specified ID not found.");
//         }
//         req.project = project;
//         next();
//     })
//     .catch(error=>{
//         console.log(error);
//         res.status(500).json({
//             message: "Error retrieving the user",
//         });
//     })
// }
function validateProjectID() {
    return (req, res, next) => {
        projects.getById(req.params.id)
              .then((project) => {
                  if (project) {
                    req.project = project;
                    next();
                  } else {
                    return res.status(404).json("Project with specified ID not found.");
                  }
              })
              .catch((error) => {
                  console.log(error)
                  res.status(500).json({
                      message: "Error retrieving the project",
                  })
              })
      }
  }

function validateProjectBody() {
    return (req, res, next) => {
        if (!req.body.name || !req.body.description) {
            return res.status(400).json("Required fields missing");
          }
          next()
      }
  }

module.exports = {validateProjectID, validateProjectBody}