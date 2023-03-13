import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';

export const register = async (req, res) => {
  try {
    const { firstName, lastName, dateOfBirth, phoneNumber, email, password } =
      req.body;

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

    const savedUser = await newUser.save();
    savedUser.password = undefined;
    res.status(201).json(savedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
