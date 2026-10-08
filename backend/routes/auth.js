import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = express.Router()

const makeToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  })

const safeUser = (u) => ({
  id: u._id,
  name: u.name,
  email: u.email,
  phone: u.phone,
  role: u.role,
})

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body
    if (!name || !email || !password || !phone)
      return res.status(400).json({ message: 'All fields are required' })
    if (!/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(email))
  return res.status(400).json({ message: 'Please enter a valid email address (e.g. name@gmail.com)' })
    if (!/^\d{10}$/.test(phone))
  return res.status(400).json({ message: 'Phone number must be exactly 10 digits' })
    if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/.test(password))
  return res.status(400).json({
    message: 'Password must be at least 6 characters with one uppercase letter, one number and one special character',
  })
    if (await User.findOne({ email }))
      return res.status(400).json({ message: 'Email already registered' })

    const hashed = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, password: hashed, phone })
    res.status(201).json({ token: makeToken(user), user: safeUser(user) })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ message: 'Invalid email or password' })
    res.json({ token: makeToken(user), user: safeUser(user) })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router