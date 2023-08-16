const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Fetch Like amount for a User
const countByUser = async (req, res) => {
  try {
    const followCount = await prisma.follow.count({
      where: {
        followerId: parseInt(req.params.id, 10),
      },
    });
    res.json({ count: followCount });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const add = async (req, res) => {
  try {
    const follow = await prisma.follow.create({
      data: {
        followerId: req.body.followerId,
        followingId: req.body.followingId,
      },
    });
    if (follow) {
      res.sendStatus(204);
    } else throw new Error();
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const destroy = async (req, res) => {
  try {
    const unfollow = await prisma.follow.delete({
      where: {
        followerId_followingId: {
          followerId: parseInt(req.params.followerId, 10),
          followingId: parseInt(req.params.followingId, 10),
        },
      },
    });
    if (unfollow) {
      res.sendStatus(204);
    } else {
      res.status(404).send("Follow not found");
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

module.exports = {
  countByUser,
  add,
  destroy,
};
