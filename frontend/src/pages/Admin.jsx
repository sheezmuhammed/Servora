import { useEffect, useState } from 'react'
import { api } from '../api'

const statuses = ['pending', 'confirmed', 'completed', 'cancelled']
const cats = ['Electrician', 'Plumber', 'Tutor', 'Cleaner', 'AC Repair', 'Carpenter']
const input =
  'rounded-xl border border-blue-100 bg-white px-4 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-blue-200'
const empty = { category: 'Electrician', name: '', description: '', price: '', unit: 'hr', featured: false }

export default function Admin() {
  const [tab, setTab] = useState('bookings')
  const [bookings, setBookings] = useState([])
  const [services, setServices] = useState([])
  const [form, setForm] = useState(empty)
  const [msg, setMsg] = useState('')

  const loadBookings = () =>
    api.get('/bookings').then((r) => setBookings(r.data)).catch(() => setMsg('Could not load bookings'))
  const loadServices = () => api.get('/services').then((r) => setServices(r.data))

  useEffect(() => {
    loadBookings()
    loadServices()
  }, [])

  const setStatus = async (id, status) => {
    await api.put(`/bookings/${id}/status`, { status })
    loadBookings()
  }

  const addService = async (e) => {
    e.preventDefault()
    try {
      await api.post('/services', { ...form, price: Number(form.price) })
      setForm(empty)
      setMsg('Service added')
      loadServices()
    } catch (err) {
      setMsg(err.response?.data?.message || 'Could not add service')
    }
  }

  const removeService = async (id) => {
    if (!confirm('Delete this service?')) return
    await api.delete(`/services/${id}`)
    loadServices()
  }

  const change = (e) =>
    setForm({ ...form, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })

  const tabClass = (t) =>
    `px-6 py-2.5 rounded-full font-semibold transition ${
      tab === t ? 'bg-primary text-white shadow-lg shadow-blue-500/40' : 'bg-white text-ink border border-blue-100'
    }`

  return (
    <main className="max-w-6xl mx-auto px-6 py-14">
      <h1 className="font-heading text-4xl font-bold text-center">Admin Dashboard</h1>

      <div className="mt-8 flex justify-center gap-3">
        <button onClick={() => setTab('bookings')} className={tabClass('bookings')}>Bookings</button>
        <button onClick={() => setTab('services')} className={tabClass('services')}>Services</button>
      </div>

      {msg && <p className="text-center mt-6 text-primary font-semibold">{msg}</p>}

      {tab === 'bookings' && (
        <div className="mt-10 overflow-x-auto bg-white rounded-3xl shadow-md border border-blue-50">
          <table className="w-full text-left text-sm">
            <thead className="bg-soft text-primary">
              <tr>
                {['Customer', 'Service', 'Date', 'Amount', 'Payment', 'Status'].map((h) => (
                  <th key={h} className="px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id} className="border-t border-blue-50">
                  <td className="px-4 py-3">{b.user?.name}<br /><span className="text-muted">{b.user?.phone}</span></td>
                  <td className="px-4 py-3">{b.service?.name}</td>
                  <td className="px-4 py-3">{b.date}<br /><span className="text-muted">{b.time}</span></td>
                  <td className="px-4 py-3">₹{b.amount}</td>
                  <td className={`px-4 py-3 font-semibold ${b.paymentStatus === 'paid' ? 'text-green-600' : 'text-red-500'}`}>
                    {b.paymentStatus}
                  </td>
                  <td className="px-4 py-3">
                    <select value={b.status} onChange={(e) => setStatus(b._id, e.target.value)} className={input}>
                      {statuses.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-muted">No bookings yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'services' && (
        <div className="mt-10 grid gap-10 lg:grid-cols-3">
          <form onSubmit={addService} className="bg-white rounded-3xl p-6 shadow-md border border-blue-50 space-y-3 h-fit">
            <h3 className="font-heading text-xl font-semibold">Add service</h3>
            <select name="category" value={form.category} onChange={change} className={`${input} w-full`}>
              {cats.map((c) => <option key={c}>{c}</option>)}
            </select>
            <input name="name" required placeholder="Service name" value={form.name} onChange={change} className={`${input} w-full`} />
            <textarea name="description" required rows={3} placeholder="Description" value={form.description} onChange={change} className={`${input} w-full`} />
            <div className="flex gap-3">
              <input name="price" type="number" required placeholder="Price" value={form.price} onChange={change} className={`${input} w-full`} />
              <input name="unit" placeholder="hr / visit" value={form.unit} onChange={change} className={`${input} w-full`} />
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="featured" checked={form.featured} onChange={change} /> Show in Featured
            </label>
            <button className="w-full bg-primary text-white font-semibold py-2.5 rounded-full hover:bg-primary-dark transition">
              Add service
            </button>
          </form>

          <div className="lg:col-span-2 space-y-3">
            {services.map((s) => (
              <div key={s._id} className="bg-white rounded-2xl p-4 shadow-sm border border-blue-50 flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold">{s.name}</p>
                  <p className="text-sm text-muted">{s.category} · ₹{s.price}/{s.unit}{s.featured && ' · Featured'}</p>
                </div>
                <button onClick={() => removeService(s._id)} className="text-red-600 font-semibold hover:underline">
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  )
}