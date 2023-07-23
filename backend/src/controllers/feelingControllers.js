const models = require("../models");

// Fetch all feelings for a Post
const browseByPost = (req, res) => {
  models.feeling
    .findAllByPost(req.params.id)
    .then(([result]) => {
      res.send(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
    });
};

// Fetch Like amount for a User
const countByUser = (req, res) => {
  models.feeling
    .countFeelingByUser(req.params.id)
    .then(([[result]]) => {
      res.send(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
    });
};

const add = (req, res) => {
  const newFeeling = req.body;

  models.feeling
    .insert(newFeeling)
    .then(([result]) => {
      res.location(`/likes/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  const id = parseInt(req.params.id, 10);

  models.feeling
    .delete(id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browseByPost,
  countByUser,
  add,
  destroy,
};
