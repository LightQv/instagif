const { PrismaClient } = require("@prisma/client");

const { v4: uuidv4 } = require("uuid");

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

const generatePasswordToken = async (req, res, next) => {
  // Add temporary token for new password request
  req.user.passwordToken = uuidv4();

  try {
    const updatePasswordToken = await prisma.user.update({
      where: {
        id: parseInt(req.user.id, 10),
      },
      data: {
        passwordToken: req.user.passwordToken,
      },
    });
    if (updatePasswordToken) {
      next();
    } else throw new Error();
  } catch (error) {
    if (error) res.sendStatus(500);
  }
};

const verifyPasswordToken = async (req, res, next) => {
  try {
    const verifiedToken = await prisma.user.findFirst({
      where: {
        passwordToken: req.body.passwordToken.toString(),
      },
    });
    if (verifiedToken) {
      req.user = verifiedToken;
      next();
    } else res.sendStatus(200);
  } catch (error) {
    if (error) res.sendStatus(500);
  }
};

module.exports = {
  getUserByEmailMiddleware,
  generatePasswordToken,
  verifyPasswordToken,
};
