import express from 'express'
import Booking from '../models/Booking.js'
import Service from '../models/Service.js'
import { protect, adminOnly } from '../middleware/auth.js'

const router = express.Router()

// Create a booking (logged-in user)
router.post('/', protect, async (req, res) => {
  try {
    const { serviceId, date, time, address, notes } = req.body
    if (!serviceId || !date || !time || !address)
      return res.status(400).json({ message: 'Date, time and address are required' })

    const service = await Service.findById(serviceId)
    if (!service) return res.status(404).json({ message: 'Service not found' })

    const booking = await Booking.create({
      user: req.user.id,
      service: service._id,
      date,
      time,
      address,
      notes,
      amount: service.price,
    })
    res.status(201).json(booking)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// My bookings
router.get('/mine', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('service')
      .sort({ createdAt: -1 })
    res.json(bookings)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// All bookings (admin)
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('service')
      .populate('user', 'name phone email')
      .sort({ createdAt: -1 })
    res.json(bookings)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Update status (admin)
router.put('/:id/status', protect, adminOnly, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    )
    res.json(booking)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

export default router