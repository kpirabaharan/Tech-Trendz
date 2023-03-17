import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';

export const register = async (req, res) => {
  const { firstName, lastName, dateOfBirth, phoneNumber, email, password } =
    req.body;
  try {
    /* Encrypt Password */
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      dateOfBirth,
      phoneNumber,
      email,
      password: passwordHash,
    });

    const emailUserCheck = await User.findOne({ email });
    if (emailUserCheck) {
      return res
        .status(409)
        .json({ error: 'A user with that email address exists.' });
    }

    const phoneUserCheck = await User.findOne({ phoneNumber });
    if (phoneUserCheck) {
      return res
        .status(409)
        .json({ error: 'A user with that phone number exists.' });
    }

    const savedUser = await newUser.save();
    savedUser.password = undefined;
    console.log({ Registered: savedUser });
    res.status(201).json(savedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    /* Find User */
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ msg: 'User does not exist.' });
    }

    /* Check if Password Matches */
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials.' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    user.password = undefined;
    console.log({ 'Logged-In': user });
    res.status(200).json({ token, user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
