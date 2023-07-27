const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Fetch all like for a User
const browseByUser = async (req, res) => {
  try {
    const likes = await prisma.like.findMany({
      where: { user: { id: parseInt(req.params.id, 10) } },
    });
    res.send(likes);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

// Fetch Like amount for a User
const countByUser = async (req, res) => {
  try {
    const likeCount = await prisma.like.count({
      where: { user: { id: parseInt(req.params.id, 10) } },
    });
    res.json({ count: likeCount });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const add = async (req, res) => {
  try {
    const newLike = await prisma.like.create({
      data: {
        post_id: req.body.post_id,
        user_id: req.body.user_id,
      },
    });
    if (newLike) {
      res.sendStatus(204);
    } else throw new Error();
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const destroy = async (req, res) => {
  try {
    const deleteLike = await prisma.like.delete({
      where: {
        id: parseInt(req.params.id, 10),
      },
    });
    if (deleteLike) {
      res.sendStatus(204);
    } else {
      res.status(404).send("Like not found");
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

module.exports = {
  browseByUser,
  countByUser,
  add,
  destroy,
};
