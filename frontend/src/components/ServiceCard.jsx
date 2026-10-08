import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { categoryIcons } from '../categoryIcons'
import { useAuth } from '../context/AuthContext'
import BookingModal from './BookingModal'

export default function ServiceCard({ service }) {
  const Icon = categoryIcons[service.category]
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = useState(false)

  const book = () => {
    if (!user) {
      navigate('/login', { state: { from: location.pathname + location.search } })
    } else {
      setOpen(true)
    }
  }

  return (
    <div className="h-full flex flex-col bg-white rounded-3xl overflow-hidden shadow-md border border-blue-50 transition hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-200">
      <div className="h-44 bg-gradient-to-br from-soft to-blue-100 flex items-center justify-center text-primary text-6xl border-b-4 border-accent">
        {Icon && <Icon />}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <span className="text-xs font-semibold text-accent bg-soft rounded-full px-3 py-1 self-start">
          {service.category}
        </span>
        <h3 className="mt-3 font-heading text-xl font-semibold">{service.name}</h3>
        <p className="mt-2 text-muted flex-1">{service.description}</p>

        <div className="mt-6 flex items-center justify-between">
          <span className="font-heading text-xl font-semibold text-primary">
            ₹{service.price}/{service.unit}
          </span>
          <button
            onClick={book}
            className="border-2 border-primary text-primary font-semibold px-6 py-2 rounded-full transition hover:bg-primary hover:text-white"
          >
            Book Now
          </button>
        </div>
      </div>

      {open && <BookingModal service={service} onClose={() => setOpen(false)} />}
    </div>
  )
}