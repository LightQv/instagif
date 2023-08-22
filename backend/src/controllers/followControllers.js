const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Fetch amount of User's followers
const countFollowerByUser = async (req, res) => {
  try {
    const followersCount = await prisma.follow.count({
      where: {
        followingId: parseInt(req.params.id, 10),
      },
    });
    const followersList = await prisma.follow.findMany({
      where: {
        followingId: parseInt(req.params.id, 10),
      },
    });
    res.json({ count: followersCount, data: followersList });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

// Fetch amount of account User's following
const countFollowsByUser = async (req, res) => {
  try {
    const followsCount = await prisma.follow.count({
      where: {
        followerId: parseInt(req.params.id, 10),
      },
    });
    res.json({ count: followsCount });
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
  countFollowerByUser,
  countFollowsByUser,
  add,
  destroy,
};
