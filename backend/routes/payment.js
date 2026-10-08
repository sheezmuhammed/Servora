import express from 'express'
import crypto from 'crypto'
import Razorpay from 'razorpay'
import Booking from '../models/Booking.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

// Step 1: create a Razorpay order for a booking
router.post('/order', protect, async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.body.bookingId, user: req.user.id })
    if (!booking) return res.status(404).json({ message: 'Booking not found' })
    if (booking.paymentStatus === 'paid')
      return res.status(400).json({ message: 'Already paid' })

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })

    const order = await razorpay.orders.create({
      amount: booking.amount * 100, // rupees to paise
      currency: 'INR',
      receipt: `bk_${booking._id}`,
    })

    booking.razorpayOrderId = order.id
    await booking.save()

    res.json({
      key: process.env.RAZORPAY_KEY_ID,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    })
  } catch (err) {
    res.status(500).json({ message: err.error?.description || err.message })
  }
})

// Step 2: verify the payment signature
router.post('/verify', protect, async (req, res) => {
  try {
    const { bookingId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body

    const expected = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex')

    if (expected !== razorpay_signature)
      return res.status(400).json({ message: 'Payment verification failed' })

    const booking = await Booking.findOneAndUpdate(
      { _id: bookingId, user: req.user.id },
      { paymentStatus: 'paid', status: 'confirmed', razorpayPaymentId: razorpay_payment_id },
      { new: true }
    )
    res.json(booking)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router