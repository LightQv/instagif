const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Fetch all feelings for a Post
const browseByPost = async (req, res) => {
  try {
    const aggregate = await prisma.feeling.groupBy({
      by: ["emoji", "name"],
      _count: true,
      where: {
        post_id: parseInt(req.params.id, 10),
      },
    });
    const feelings = await prisma.feeling.findMany({
      where: {
        post_id: parseInt(req.params.id, 10),
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
    res.json({ count: aggregate, data: feelings });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

// Fetch Like amount for a User
const countByUser = async (req, res) => {
  try {
    const feelingCount = await prisma.feeling.count({
      where: { user: { id: parseInt(req.params.id, 10) } },
    });
    res.json({ count: feelingCount });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const add = async (req, res) => {
  try {
    const newFeeling = await prisma.feeling.create({
      data: {
        name: req.body.name,
        emoji: req.body.emoji,
        post_id: req.body.post_id,
        user_id: req.body.user_id,
      },
    });
    if (newFeeling) {
      res.sendStatus(204);
    } else throw new Error();
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const destroy = async (req, res) => {
  try {
    const deleteFeeling = await prisma.feeling.delete({
      where: {
        id: parseInt(req.params.id, 10),
      },
    });
    if (deleteFeeling) {
      res.sendStatus(204);
    } else {
      res.status(404).send("Feeling not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500);
  }
};

module.exports = {
  browseByPost,
  countByUser,
  add,
  destroy,
};
