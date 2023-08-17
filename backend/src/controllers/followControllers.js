const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Fetch amount of account User's following
const countFollowingByUser = async (req, res) => {
  try {
    const followingCount = await prisma.follow.count({
      where: {
        followerId: parseInt(req.params.id, 10),
      },
    });
    res.json({ count: followingCount });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

// Fetch amount of account User's followed by
const countFollowerByUser = async (req, res) => {
  try {
    const followedCount = await prisma.follow.count({
      where: {
        followingId: parseInt(req.params.id, 10),
      },
    });
    const followedList = await prisma.follow.findMany({
      where: {
        followingId: parseInt(req.params.id, 10),
      },
    });
    res.json({ count: followedCount, data: followedList });
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
  countFollowingByUser,
  countFollowerByUser,
  add,
  destroy,
};
