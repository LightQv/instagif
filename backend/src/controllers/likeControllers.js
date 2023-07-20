const models = require("../models");

// Fetch all like for a User
const browseByUser = (req, res) => {
  models.like
    .findAllByUser(req.params.id)
    .then(([result]) => {
      res.send(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
    });
};

const add = (req, res) => {
  const newLike = req.body;

  models.like
    .insert(newLike)
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

  models.like
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
  browseByUser,
  add,
  destroy,
};
