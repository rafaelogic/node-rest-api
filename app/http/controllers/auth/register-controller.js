const bcrypt = require('bcryptjs');
const User = require('../../../models/user');
const { registerValidation } = require('../../../validations/user');

exports.index = async (req, res) => {
  const validation = registerValidation(req.body);
  if (validation.error) {
    return res.status(400).json({
      success: false,
      message: validation.error.details[0].message,
    });
  }

  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) {
    return res.status(400).json({
      success: false,
      message: 'Email already exists. Please change it to a new one.',
    });
  }

  const salt = await bcrypt.genSalt(16);
  const password = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: password,
  });

  try {
    const savedUser = await user.save();
    res.json({
      success: true,
      message: 'Successfully registered user',
      user_id: savedUser._id,
    });
  } catch (error) {
    res.status(400).json(err);
  }
}
