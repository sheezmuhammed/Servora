import express from 'express'
import Review from '../models/Review.js'
import User from '../models/User.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

// Anyone can read reviews (latest 6)
router.get('/', async (req, res) => {
  try {
    res.json(await Review.find().sort({ createdAt: -1 }).limit(6))
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Logged-in users can write a review
router.post('/', protect, async (req, res) => {
  try {
    const { text, role, rating } = req.body
    if (!text?.trim()) return res.status(400).json({ message: 'Please write your review' })

    const user = await User.findById(req.user.id)
    const review = await Review.create({
      user: user._id,
      name: user.name,
      role: role?.trim() || 'Customer',
      text: text.trim(),
      rating: Number(rating) || 5,
    })
    res.status(201).json(review)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

export default router