import { useEffect, useState } from 'react'
import { api } from '../api'
import ServiceCard from './ServiceCard'
import Reveal from './Reveal'
import Spinner from './Spinner'

export default function FeaturedServices() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api
      .get('/services?featured=true')
      .then((res) => setServices(res.data))
      .catch(() => setError('Could not load services. Is the backend running?'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <Reveal className="text-center">
        <h2 className="font-heading text-4xl font-bold">Featured Services</h2>
        <p className="mt-3 text-muted max-w-xl mx-auto">
          Hand-picked top-rated services from verified professionals in your area.
        </p>
      </Reveal>

      {loading && <Spinner />}
      {error && <p className="text-center mt-10 text-red-600">{error}</p>}

      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s._id} delay={i * 120}>
            <ServiceCard service={s} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}