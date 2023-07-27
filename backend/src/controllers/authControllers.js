const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getUserByEmailMiddleware = async (req, res, next) => {
  try {
    const userByEmail = await prisma.user.findUnique({
      where: { email: req.body.email },
    });
    if (userByEmail) {
      req.user = userByEmail;
      next();
    } else res.sendStatus(401);
  } catch (error) {
    if (error) res.sendStatus(500);
  }
};

module.exports = {
  getUserByEmailMiddleware,
};
