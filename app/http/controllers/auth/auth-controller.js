const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../../models/user');
const { loginValidation } = require('../../../validations/user');

const errorMessage = 'User credentials is invalid. Please try again.';

exports.login = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const user = await User.findOne({ email: req.body.email }).select(
    '+password'
  );
  if (!user) return res.status(400).json({ message: errorMessage });

  const isValidPass = await bcrypt.compare(req.body.password, user.password);
  if (!isValidPass) return res.status(400).json({ message: errorMessage });

  const { password, ...parsedUser } = user._doc;
  const token = jwt.sign({ parsedUser }, process.env.JWT_SECRET);

  req.session.auth = 1;
  res.header('auth-token', token).json({ auth: true, token: token });
}

exports.logout = (req, res) => {
  req.session.auth = 0;
  res.status(200).send({ auth: false, token: null });
}
