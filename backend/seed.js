import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import Service from './models/Service.js'
import User from './models/User.js'

dotenv.config()

const services = [
  // Electrician
  { category: 'Electrician', name: 'Home Wiring & Installation', description: 'Professional electrical wiring, installation and safety inspections for your home.', price: 499, featured: true },
  { category: 'Electrician', name: 'Circuit Breaker & Fuse Repair', description: 'Fast diagnosis and repair of tripping breakers, blown fuses and faulty switches.', price: 349 },
  { category: 'Electrician', name: 'Electrical Safety Audit', description: 'Complete check of your home wiring to spot hazards before they become problems.', price: 599 },

  // Plumber
  { category: 'Plumber', name: 'Pipe Repair & Maintenance', description: 'Quick and reliable pipe repair, leak fixing, and full plumbing system maintenance.', price: 399, featured: true },
  { category: 'Plumber', name: 'Bathroom Fittings Installation', description: 'Installation of taps, showers, basins and other bathroom fittings.', price: 449 },
  { category: 'Plumber', name: 'Drain Cleaning & Unblocking', description: 'Clear blocked drains and sinks with proper tools and no mess.', price: 349 },

  // Tutor
  { category: 'Tutor', name: 'Private Home Tutoring', description: 'Experienced tutors for all subjects from primary to undergraduate level.', price: 299, featured: true },
  { category: 'Tutor', name: 'Exam Preparation Coaching', description: 'Focused coaching for board exams and entrance tests with practice papers.', price: 399 },
  { category: 'Tutor', name: 'Spoken English Classes', description: 'Build confidence in speaking English with one-to-one sessions.', price: 249 },

  // Cleaner
  { category: 'Cleaner', name: 'Full Home Deep Cleaning', description: 'Top-to-bottom deep cleaning of rooms, kitchen and bathrooms.', price: 699 },
  { category: 'Cleaner', name: 'Kitchen & Bathroom Cleaning', description: 'Grease, stains and scale removed for a spotless kitchen and bathroom.', price: 449 },
  { category: 'Cleaner', name: 'Sofa & Carpet Shampooing', description: 'Deep shampoo cleaning to remove dirt, stains and odours.', price: 499 },

  // AC Repair
  { category: 'AC Repair', name: 'AC Service & Cleaning', description: 'Complete AC servicing with filter cleaning for better cooling.', price: 499 },
  { category: 'AC Repair', name: 'AC Gas Refill', description: 'Gas leak check and refill to bring back full cooling power.', price: 899 },
  { category: 'AC Repair', name: 'AC Installation & Uninstallation', description: 'Safe and neat installation or removal of split and window AC units.', price: 799 },

  // Carpenter
  { category: 'Carpenter', name: 'Furniture Repair', description: 'Repair of chairs, tables, beds and wardrobes.', price: 349 },
  { category: 'Carpenter', name: 'Door & Window Fitting', description: 'Fitting, alignment and repair of doors, windows and locks.', price: 399 },
  { category: 'Carpenter', name: 'Custom Shelves & Cabinets', description: 'Made-to-measure shelves, cabinets and storage for your space.', price: 599 },
]

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)

    await Service.deleteMany({})
    await Service.insertMany(services)
    console.log(`Added ${services.length} services`)

    const adminEmail = 'admin@servora.com'
    if (!(await User.findOne({ email: adminEmail }))) {
      await User.create({
        name: 'Servora Admin',
        email: adminEmail,
        password: await bcrypt.hash('admin123', 10),
        phone: '9876543210',
        role: 'admin',
      })
      console.log('Admin created: admin@servora.com / admin123')
    }

    process.exit()
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }
}

run()