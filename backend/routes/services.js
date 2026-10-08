import express from 'express'
import Service from '../models/Service.js'
import { protect, adminOnly } from '../middleware/auth.js'

const router = express.Router()

// Anyone can view services (optional filters: ?category=Plumber&featured=true)
router.get('/', async (req, res) => {
  try {
    const filter = {}
    if (req.query.category) filter.category = req.query.category
    if (req.query.featured) filter.featured = req.query.featured === 'true'
    res.json(await Service.find(filter))
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)
    if (!service) return res.status(404).json({ message: 'Service not found' })
    res.json(service)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Admin only
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    res.status(201).json(await Service.create(req.body))
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    res.json(await Service.findByIdAndUpdate(req.params.id, req.body, { new: true }))
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id)
    res.json({ message: 'Service deleted' })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

export default router