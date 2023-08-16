const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const browse = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        likes: true,
        feelings: true,
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });
    res.send(posts);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const browseByFollow = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        likes: true,
        feelings: true,
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
      where: {
        OR: [
          {
            user: {
              followedBy: {
                some: {
                  followerId: parseInt(req.params.id, 10),
                },
              },
            },
          },
          {
            user_id: parseInt(req.params.id, 10),
          },
        ],
      },
    });
    res.send(posts);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

// Fetch All Posts for a User
const browseByUser = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        user: { id: parseInt(req.params.id, 10) },
      },
      include: {
        likes: true,
        feelings: true,
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });
    res.send(posts);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

// Fetch All Liked Posts for a User
const browseLikedByUser = async (req, res) => {
  try {
    const userLikes = await prisma.post.findMany({
      where: {
        likes: {
          some: {
            user_id: parseInt(req.params.id, 10),
          },
        },
      },
      include: {
        likes: true,
        feelings: true,
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
      orderBy: {
        created_at: req.query.sort,
      },
    });
    res.send(userLikes);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

// Fetch a specific Posts with User Data
const readWithUser = async (req, res) => {
  try {
    const posts = await prisma.post.findUnique({
      where: {
        id: parseInt(req.params.id, 10),
        user: {
          username: req.params.username,
        },
      },
      include: {
        likes: true,
        feelings: true,
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
    res.send(posts);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const edit = async (req, res) => {
  try {
    const updateTitle = await prisma.post.update({
      where: {
        id: parseInt(req.params.id, 10),
      },
      data: {
        title: req.body.title,
      },
    });
    if (updateTitle) {
      res.sendStatus(204);
    } else {
      res.status(404).send("Post not found");
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const add = async (req, res) => {
  try {
    const newPost = await prisma.post.create({
      data: {
        title: req.body.title,
        gif_url: req.body.gif_url,
        user_id: req.body.user_id,
      },
    });
    if (newPost) {
      res.sendStatus(204);
    } else throw new Error();
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const destroy = async (req, res) => {
  try {
    const deletePost = await prisma.post.delete({
      where: {
        id: parseInt(req.params.id, 10),
      },
    });
    if (deletePost) {
      res.sendStatus(204);
    } else {
      res.status(404).send("Post not found");
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

module.exports = {
  browse,
  browseByFollow,
  browseByUser,
  browseLikedByUser,
  readWithUser,
  edit,
  add,
  destroy,
};
