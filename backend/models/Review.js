import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    role: { type: String, default: 'Customer' },
    text: { type: String, required: true, maxlength: 400 },
    rating: { type: Number, min: 1, max: 5, default: 5 },
  },
  { timestamps: true }
)

export default mongoose.model('Review', reviewSchema)