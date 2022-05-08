var express = require("express");
var router = express.Router();

router.get("/", function(req, res) {
    res.send(`logando...`);
});

router.post("/login", function(req, res) {
    res.send(`logando...`);
});

// router.put("/tutors/:id", function(req, res) {
//     res.send(`Enviando.... ${req.params.id}`);
// });

module.exports = router;