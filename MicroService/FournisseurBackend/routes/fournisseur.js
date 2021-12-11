var express = require("express");
var router = express.Router();
var fournisseur = require("../model/Fournisseur");

router.get("/", function (req, res, next) {
  fournisseur.find(function (err, fournisseurs) {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(fournisseurs));
  });
});

router.post("/", function (req, res, next) {
  new fournisseur({
    name: req.body.name,
    email: req.body.email,
    localisation: req.body.localisation,
    imageUrl: req.body.imageUrl,
  }).save((err, newfournisseur) => {
    if (err) console.log("error message : " + err);
    else {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(newfournisseur));
    }
  });
});

router.post("/:id", function (req, res) {
  var id = req.params.id;
  fournisseur.findById(id, function (err, fournisseur) {
    if (err) {
      console.log("error message : " + err);
    } else {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(fournisseur));
    }
  });
});

router.put("/", function (req, res) {
  fournisseur.findByIdAndUpdate(
    req.body.id,
    {
      name: req.body.name,
      email: req.body.email,
      localisation: req.body.localisation,
      imageUrl: req.body.imageUrl,
    },
    function (err, fourni) {
      if (err) {
        console.log("error message : " + err);
      } else {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(fourni));
      }
    }
  );
});

router.delete("/:id", function (req, res) {
  fournisseur.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      console.log("error message : " + err);
    } else {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify("deleted"));
    }
  });
});

module.exports = router;
