import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaQuoteRight, FaStar } from 'react-icons/fa'
import { api } from '../api'
import { useAuth } from '../context/AuthContext'
import Reveal from './Reveal'

const input =
  'w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-blue-200/60 outline-none focus:border-blue-400'

export default function Testimonials() {
  const { user } = useAuth()
  const [reviews, setReviews] = useState([])
  const [form, setForm] = useState({ role: '', text: '', rating: 5 })
  const [msg, setMsg] = useState('')
  const [sending, setSending] = useState(false)

  useEffect(() => {
    api.get('/reviews').then((r) => setReviews(r.data)).catch(() => {})
  }, [])

  const submit = async (e) => {
    e.preventDefault()
    setMsg('')
    setSending(true)
    try {
      const { data } = await api.post('/reviews', form)
      setReviews([data, ...reviews].slice(0, 6))
      setForm({ role: '', text: '', rating: 5 })
      setMsg('Thank you for your review!')
    } catch (err) {
      setMsg(err.response?.data?.message || 'Could not send your review')
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="bg-gradient-to-b from-slate-900 to-blue-950 text-white py-20 mt-10">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-center">
          <h2 className="font-heading text-4xl font-bold">What Our Users Say</h2>
          <p className="mt-3 text-blue-100/80 max-w-xl mx-auto">
            Thousands of happy homeowners and service providers trust Servora every day.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {reviews.map((r, i) => (
            <Reveal key={r._id} delay={(i % 2) * 150}>
              <div className="h-full flex flex-col bg-white/5 border border-white/15 rounded-3xl p-8 backdrop-blur transition hover:-translate-y-2 hover:bg-white/10 hover:border-blue-400">
                <div className="flex items-center justify-between">
                  <FaQuoteRight className="text-blue-400 text-3xl" />
                  <div className="flex gap-1 text-yellow-400">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <FaStar key={n} className={n <= r.rating ? '' : 'opacity-20'} />
                    ))}
                  </div>
                </div>
                <p className="mt-6 italic text-lg leading-relaxed flex-1">{r.text}</p>
                <div className="mt-8 pt-6 border-t border-white/15">
                  <p className="font-heading font-semibold">{r.name}</p>
                  <p className="text-sm text-blue-200/80">{r.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Write a review */}
        <Reveal className="mt-14 max-w-xl mx-auto">
          {user ? (
            <form onSubmit={submit} className="bg-white/5 border border-white/15 rounded-3xl p-8 space-y-4">
              <h3 className="font-heading text-xl font-semibold text-center">Write a review</h3>

              <div className="flex justify-center gap-2 text-2xl">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    type="button"
                    key={n}
                    onClick={() => setForm({ ...form, rating: n })}
                    className={`transition hover:scale-125 ${n <= form.rating ? 'text-yellow-400' : 'text-white/25'}`}
                  >
                    <FaStar />
                  </button>
                ))}
              </div>

              <input
                placeholder="Your role or area (e.g. Homeowner, Calicut)"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className={input}
              />
              <textarea
                required
                rows={3}
                maxLength={400}
                placeholder="Share your experience..."
                value={form.text}
                onChange={(e) => setForm({ ...form, text: e.target.value })}
                className={input}
              />

              {msg && <p className="text-center text-blue-200 text-sm">{msg}</p>}

              <button
                disabled={sending}
                className="w-full bg-primary hover:bg-blue-600 text-white font-semibold py-3 rounded-full shadow-lg shadow-blue-500/40 transition disabled:opacity-60"
              >
                {sending ? 'Sending...' : 'Submit review'}
              </button>
            </form>
          ) : (
            <p className="text-center text-blue-100/80">
              <Link to="/login" className="text-blue-300 font-semibold hover:underline">
                Login
              </Link>{' '}
              to write a review.
            </p>
          )}
        </Reveal>
      </div>
    </section>
  )
}