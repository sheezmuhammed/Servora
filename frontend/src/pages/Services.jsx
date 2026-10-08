import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { api } from '../api'
import { categoryIcons } from '../categoryIcons'
import ServiceCard from '../components/ServiceCard'
import Reveal from '../components/Reveal'
import Spinner from '../components/Spinner'

const categories = ['Electrician', 'Plumber', 'Tutor', 'Cleaner', 'AC Repair', 'Carpenter']

export default function Services() {
  const [params, setParams] = useSearchParams()
  const active = params.get('category') || 'All'

  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [mapQuery, setMapQuery] = useState('Calicut, Kerala')
  const [locMsg, setLocMsg] = useState('')

  useEffect(() => {
    api
      .get('/services')
      .then((res) => setServices(res.data))
      .catch(() => setError('Could not load services. Is the backend running?'))
      .finally(() => setLoading(false))
  }, [])

  const shown =
    active === 'All' ? services : services.filter((s) => s.category === active)

  const pick = (name) => {
    if (name === 'All') setParams({})
    else setParams({ category: name })
  }

  const useMyLocation = () => {
    if (!navigator.geolocation) {
      setLocMsg('Location is not supported in this browser.')
      return
    }
    setLocMsg('Finding your location...')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setMapQuery(`${pos.coords.latitude},${pos.coords.longitude}`)
        setLocMsg('Showing your current area.')
      },
      () => setLocMsg('Could not get your location. Please allow location access.')
    )
  }

  const pillClass = (isActive) =>
    `flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold border transition hover:-translate-y-0.5 ${
      isActive
        ? 'bg-primary text-white border-primary shadow-lg shadow-blue-500/40'
        : 'bg-white/70 text-ink border-blue-100 hover:border-primary hover:text-primary'
    }`

  return (
    <main className="max-w-6xl mx-auto px-6 py-14">
      <Reveal className="text-center">
        <h1 className="font-heading text-4xl font-bold">Our Services</h1>
        <p className="mt-3 text-muted">Pick a category and book a trusted professional.</p>
      </Reveal>

      {/* Filter pills */}
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <button onClick={() => pick('All')} className={pillClass(active === 'All')}>
          All Services
        </button>
        {categories.map((c) => {
          const Icon = categoryIcons[c]
          return (
            <button key={c} onClick={() => pick(c)} className={pillClass(active === c)}>
              <Icon /> {c}
            </button>
          )
        })}
      </div>

      {loading && <Spinner />}
      {error && <p className="text-center mt-12 text-red-600">{error}</p>}

      {/* Cards */}
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((s, i) => (
          <Reveal key={s._id} delay={(i % 3) * 100}>
            <ServiceCard service={s} />
          </Reveal>
        ))}
      </div>

      {/* Map */}
      <section className="mt-24">
        <Reveal className="text-center">
          <h2 className="font-heading text-3xl font-bold">Services Near You</h2>
          <p className="mt-3 text-muted">See the area we cover and find help close to home.</p>
          <button
            onClick={useMyLocation}
            className="mt-6 bg-primary hover:bg-primary-dark text-white font-semibold px-7 py-2.5 rounded-full shadow-lg shadow-blue-500/40 transition hover:-translate-y-0.5"
          >
            Use my location
          </button>
          {locMsg && <p className="mt-3 text-sm text-muted">{locMsg}</p>}
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-8 rounded-3xl overflow-hidden shadow-xl border border-blue-100">
            <iframe
              title="Services near you"
              src={`https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=13&output=embed`}
              className="w-full h-96"
              loading="lazy"
            />
          </div>
        </Reveal>
      </section>
    </main>
  )
}