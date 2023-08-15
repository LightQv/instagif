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
    for (let i = 0; i < users.length; i += 1) {
      delete users[i].hashedPassword;
    }
    // users.forEach(({ user }) => delete user.hashedPassword);
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
        likes: true,
        followedBy: true,
        following: true,
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
  try {
    const updatePw = await prisma.user.update({
      where: {
        id: parseInt(req.params.id, 10),
      },
      data: {
        hashedPassword: req.body.hashedPassword,
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
  readByUsername,
  editUsername,
  editMail,
  editPw,
  add,
  destroy,
};
