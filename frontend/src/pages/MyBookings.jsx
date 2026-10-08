import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api'
import { useAuth } from '../context/AuthContext'
import { payForBooking } from '../payment'
import Spinner from '../components/Spinner'

const badge = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-blue-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
}

export default function MyBookings() {
  const { user } = useAuth()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = () =>
    api
      .get('/bookings/mine')
      .then((r) => setBookings(r.data))
      .catch(() => setError('Could not load your bookings.'))
      .finally(() => setLoading(false))

  useEffect(() => {
    load()
  }, [])

  const pay = async (b) => {
    try {
      await payForBooking(b, user)
      load()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-14">
      <h1 className="font-heading text-4xl font-bold text-center">My Bookings</h1>

      {loading && <Spinner />}
      {error && <p className="text-center mt-6 text-red-600">{error}</p>}

      {!loading && bookings.length === 0 && (
        <p className="text-center mt-10 text-muted">
          No bookings yet.{' '}
          <Link to="/services" className="text-primary font-semibold">Browse services</Link>
        </p>
      )}

      <div className="mt-10 space-y-5">
        {bookings.map((b) => (
          <div key={b._id} className="bg-white rounded-3xl p-6 shadow-md border border-blue-50 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="font-heading text-lg font-semibold">{b.service?.name}</h3>
              <p className="text-muted text-sm">{b.date} at {b.time}</p>
              <p className="text-muted text-sm">{b.address}</p>
            </div>
            <div className="text-right space-y-2">
              <p className="font-heading font-semibold text-primary">₹{b.amount}</p>
              <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full capitalize ${badge[b.status]}`}>
                {b.status}
              </span>
              <p className={`text-xs font-semibold ${b.paymentStatus === 'paid' ? 'text-green-600' : 'text-red-500'}`}>
                {b.paymentStatus === 'paid' ? 'Paid' : 'Payment pending'}
              </p>
              {b.paymentStatus !== 'paid' && b.status !== 'cancelled' && (
                <button
                  onClick={() => pay(b)}
                  className="bg-primary text-white text-sm font-semibold px-5 py-1.5 rounded-full hover:bg-primary-dark transition"
                >
                  Pay now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}