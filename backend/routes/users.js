const { Router } = require("express");
const celebrate = require('celebrate');
const {
  getCurrentUser,
  updateProfile,
  updateAvatar,
} = require("../controllers/users");
const auth = require("../../middlewares/auth");
const { validateUserBody, validateUserAvatar } = require("../middlewares/validation");

const usersRouter = Router();

usersRouter.get('/me', auth, getCurrentUser)

usersRouter.patch("/me", auth, celebrate({
  body: validateUserBody
}), updateProfile);

usersRouter.patch("/me/avatar", auth, celebrate({
  body: validateUserAvatar
}), updateAvatar);

module.exports = { usersRouter };
