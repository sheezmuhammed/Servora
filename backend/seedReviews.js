import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Review from './models/Review.js'

dotenv.config()

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI)

  if ((await Review.countDocuments()) === 0) {
    await Review.insertMany([
      {
        name: 'Sarah Johnson',
        role: 'Homeowner, Kozhikode',
        rating: 5,
        text: 'Finding an electrician was so easy with Servora. Within an hour of booking, a certified professional was at my door. The work was clean, fast, and affordable. I use Servora for everything now!',
      },
      {
        name: 'David Miller',
        role: 'Academic Tutor, Calicut University',
        rating: 5,
        text: 'As a professional tutor, this platform has allowed me to grow my client base and earn more, all while working close to home. The verification process built real trust with parents.',
      },
    ])
    console.log('Added 2 starter reviews')
  } else {
    console.log('Reviews already exist, nothing added')
  }
  process.exit()
}

run()