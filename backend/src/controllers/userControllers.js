const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const browse = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        username: "asc",
      },
      select: {
        id: true,
        username: true,
        avatar: true,
        followedBy: true,
        _count: {
          select: {
            followedBy: true,
            following: true,
          },
        },
      },
      where: {
        username: {
          startsWith: req.query.username,
        },
      },
    });
    res.send(users);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const browseUnfollowedUser = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        username: "asc",
      },
      select: {
        id: true,
        username: true,
        avatar: true,
        followedBy: true,
        _count: {
          select: {
            followedBy: true,
            following: true,
          },
        },
      },
      where: {
        AND: [
          { id: { not: parseInt(req.params.id, 10) } },
          {
            followedBy: {
              every: { followerId: { not: parseInt(req.params.id, 10) } },
            },
          },
        ],
      },
    });
    res.send(users);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const browseFollowersByUser = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        username: "asc",
      },
      select: {
        id: true,
        username: true,
        avatar: true,
        followedBy: true,
      },
      where: {
        following: {
          some: {
            followingId: parseInt(req.params.id, 10),
          },
        },
      },
    });
    res.send(users);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const browseFollowsByUser = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        username: "asc",
      },
      select: {
        id: true,
        username: true,
        avatar: true,
        followedBy: true,
      },
      where: {
        followedBy: {
          some: {
            followerId: parseInt(req.params.id, 10),
          },
        },
      },
    });
    res.send(users);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const readByUsername = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: req.params.username,
      },
      include: {
        followedBy: true,
        following: true,
        posts: {
          orderBy: {
            created_at: "desc",
          },
        },
      },
    });
    if (user) {
      delete user.hashedPassword;
      res.send(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const editUsername = async (req, res) => {
  try {
    const updateUsername = await prisma.user.update({
      where: {
        id: parseInt(req.params.id, 10),
      },
      data: {
        username: req.body.username,
      },
    });
    if (updateUsername) {
      res.sendStatus(204);
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    // Code for Duplicate data
    if (err.code === "P2002") {
      res.sendStatus(401);
    } else res.sendStatus(500);
  }
};

const editAvatar = async (req, res) => {
  try {
    const updateAvatar = await prisma.user.update({
      where: {
        id: parseInt(req.params.id, 10),
      },
      data: {
        avatar: req.body.avatarLink,
      },
    });
    if (updateAvatar) {
      res.sendStatus(204);
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const editMail = async (req, res) => {
  try {
    const updateEmail = await prisma.user.update({
      where: {
        id: parseInt(req.params.id, 10),
      },
      data: {
        email: req.body.email,
      },
    });
    if (updateEmail) {
      res.sendStatus(204);
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    console.error(err);
    // Code for Duplicate data
    if (err.code === "P2002") {
      res.sendStatus(400);
    } else res.sendStatus(500);
  }
};

const editPw = async (req, res) => {
  req.body.passwordToken = null;

  try {
    const updatePw = await prisma.user.update({
      where: {
        id: parseInt(req.params.id, 10) || parseInt(req.user.id, 10),
      },
      data: {
        hashedPassword: req.body.hashedPassword,
        passwordToken: req.body.passwordToken,
      },
    });
    if (updatePw) {
      res.sendStatus(204);
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const add = async (req, res) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        username: req.body.username,
        email: req.body.email,
        hashedPassword: req.body.hashedPassword,
      },
    });
    if (newUser) {
      res.sendStatus(204);
    } else throw new Error();
  } catch (err) {
    console.error(err);
    // Code for Duplicate data
    if (err.code === "P2002") {
      res.sendStatus(400);
    } else res.sendStatus(500);
  }
};

const destroy = async (req, res) => {
  try {
    const deleteUser = await prisma.user.delete({
      where: {
        id: parseInt(req.params.id, 10),
      },
    });
    if (deleteUser) {
      res.sendStatus(204);
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

module.exports = {
  browse,
  browseUnfollowedUser,
  browseFollowersByUser,
  browseFollowsByUser,
  readByUsername,
  editUsername,
  editAvatar,
  editMail,
  editPw,
  add,
  destroy,
};
