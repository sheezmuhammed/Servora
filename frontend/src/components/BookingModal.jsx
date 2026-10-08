import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'
import { useAuth } from '../context/AuthContext'
import { payForBooking } from '../payment'

const input =
  'w-full rounded-xl border border-blue-100 bg-white px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-blue-200'

export default function BookingModal({ service, onClose }) {
  const { user } = useAuth()
  const navigate = useNavigate()
  const today = new Date().toISOString().split('T')[0]

  const [form, setForm] = useState({ date: '', time: '', address: '', notes: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { data: booking } = await api.post('/bookings', {
        serviceId: service._id,
        ...form,
      })
      await payForBooking(booking, user)
      navigate('/my-bookings')
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Something went wrong')
      setLoading(false)
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-heading text-2xl font-bold">Book Service</h3>
            <p className="text-muted mt-1">{service.name}</p>
          </div>
          <button onClick={onClose} className="text-2xl text-muted hover:text-ink">×</button>
        </div>

        <p className="mt-4 font-heading text-xl font-semibold text-primary">
          ₹{service.price}/{service.unit}
        </p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input type="date" name="date" min={today} required value={form.date} onChange={change} className={input} />
            <input type="time" name="time" required value={form.time} onChange={change} className={input} />
          </div>
          <textarea name="address" required rows={2} placeholder="Service address" value={form.address} onChange={change} className={input} />
          <textarea name="notes" rows={2} placeholder="Notes (optional)" value={form.notes} onChange={change} className={input} />

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-full shadow-lg shadow-blue-500/40 transition disabled:opacity-60"
          >
            {loading ? 'Please wait...' : 'Confirm & Pay'}
          </button>
        </form>
      </div>
    </div>,
    document.body
  )
}