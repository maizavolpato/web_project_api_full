const mongoose = require('mongoose')
const  NotFoundError  = require("../errors/NotFoundError");
const  ServerError  = require("../errors/ServerError");
const users = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const login = (req, res) => {
  const { email, password } = req.body;

  users.findOne({ email }).select('+password')
  .then(user => {
    if (!user) {
      return res.status(401).send({ message: 'Email ou senha incorretos' })
    }
    return bcrypt.compare(password, user.password)
    .then(matched => {
      if (!matched) {
        return res.status(401).send({ message: 'Email ou senha incorretos'})
      }
      const token = jwt.sign(
        { _id: user._id },
        'sua-chave-secreta',
        { expiresIn: '7d' }
      )
      res.send({ token });
    })
  })
  .catch(err => res.status(500).send({ message: err.message }))
}

// async function getUsers(req, res, next) {
//   try {
//     const user = await users.find({});
//     res.status(200).json(user);
//   } catch (err) {
//     next(err);
//   }
// }

// async function getUserbyId(req, res, next) {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return next(new NotFoundError("User not found"));
//   }

//   try {
//     const user = await users.findById(id).orFail(() => {
//       throw new NotFoundError("User not found");
//     });

//     res.status(200).json(user);
//   } catch (err) {
//     next(err);
//   }
// }

const getCurrentUser = (req, res, next) => {
  const userId = req.user._id

  users.findById(userId)
  .then(user => {
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado '})
    }
    res.status(200).json(user)
  })
  .catch (next)
}

async function createUser(req, res, next) {
  const { name, about, avatar, email, password } = req.body;
  bcrypt.hash(password, 10)
  .then(hash => users.create({
      name,
      about,
      avatar,
      email,
      password: hash
    }))
    .then(user => res.status(201).send({
      _id: users._id,
      name: users.name,
      about: users.about,
      avatar: users.avatar,
      email: users.email
    }))
    .catch (next)
  }



async function updateProfile(req, res, next) {
  try {
    const userUpdate = await users
      .findByIdAndUpdate(req.user._id, req.body, {
        new: true,
      })
      .orFail(() => {
        throw new NotFoundError("User not found");
      });

    return res.status(200).json(userUpdate);
  } catch (err) {
    console.log("Erro update User:", err);
    return next(new ServerError("Internal Server Error"));
  }
}

async function updateAvatar(req, res, next) {
  try {
    const AvatarUpdate = await users
      .findByIdAndUpdate(req.user._id, { avatar: req.body.avatar }, {
        new: true,
      })
      .orFail(() => {
        throw new NotFoundError("User not found");
      });

    return res.status(200).json(AvatarUpdate);
  } catch (err) {
    console.log('Error update Avatar:', err)
    return next(new ServerError("Internal Server Error"));
  }
}

module.exports = {
  login,
  getCurrentUser,
  createUser,
  updateProfile,
  updateAvatar,
}
