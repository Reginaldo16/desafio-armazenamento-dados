const asyncHandler = require("express-async-handler");
const User = require("../models/user-model");
const { default: mongoose } = require("mongoose");

const getAllUser = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

const getUserById = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ msg: "ID Obrigatorio" });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: "Usuario nao encontrado" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: "Erro do servidor", error: error.msg });
  }
});

const SignUp = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json("Todos os campos sao obrigatorios");
  }
  let existUser = await User.findOne({ email });
  if (existUser) {
    return res.status(409).json("email cadastrado");
  }
  const user = new User({ name, email, password });
  await user.save();
  res.status(201).json(user);
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Email e senha sao obrigatorios" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "E-mail ou Senha invalidos" });
    }
    if (user.password !== password) {
      return res.status(400).json({ msg: "E-mail ou Senha invalidos" });
    }
    res.status(200).json({
      msg: "O usuario ",
      user: {
        name: user.name,
      },
      text: "Logado",
    });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor", error: error.message });
  }
});

module.exports = { getAllUser, SignUp, login, getUserById };
