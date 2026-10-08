import { Link } from 'react-router-dom'
import { FaBolt, FaTint, FaBookOpen, FaWind, FaTools } from 'react-icons/fa'
import { HiSparkles } from 'react-icons/hi2'
import Reveal from './Reveal'

const categories = [
  { name: 'Electrician', icon: FaBolt },
  { name: 'Plumber', icon: FaTint },
  { name: 'Tutor', icon: FaBookOpen },
  { name: 'Cleaner', icon: HiSparkles },
  { name: 'AC Repair', icon: FaWind },
  { name: 'Carpenter', icon: FaTools },
]

export default function Categories() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <Reveal className="text-center">
        <h2 className="font-heading text-4xl font-bold">Browse Categories</h2>
        <p className="mt-3 text-muted max-w-xl mx-auto">
          Discover local professionals across a wide range of home and personal services.
        </p>
      </Reveal>

      <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.map((c, i) => (
          <Reveal key={c.name} delay={i * 80}>
            <Link
              to={`/services?category=${encodeURIComponent(c.name)}`}
              className="group flex flex-col items-center gap-4 bg-white/70 rounded-3xl p-6 shadow-sm border border-blue-100 transition hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-200"
            >
              <span className="w-16 h-16 rounded-2xl bg-soft text-primary text-3xl flex items-center justify-center transition group-hover:bg-primary group-hover:text-white group-hover:scale-110">
                <c.icon />
              </span>
              <span className="font-heading font-medium">{c.name}</span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}