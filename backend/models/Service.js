import mongoose from 'mongoose'

const serviceSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      enum: ['Electrician', 'Plumber', 'Tutor', 'Cleaner', 'AC Repair', 'Carpenter'],
    },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    unit: { type: String, default: 'hr' },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export default mongoose.model('Service', serviceSchema)