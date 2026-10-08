import { FaShieldAlt, FaMapMarkerAlt, FaStar } from 'react-icons/fa'
import Reveal from './Reveal'

const reasons = [
  {
    icon: FaShieldAlt,
    title: 'Verified Experts',
    text: 'Every service provider goes through a rigorous background check and skill verification before joining our platform.',
  },
  {
    icon: FaMapMarkerAlt,
    title: 'Hyperlocal Reach',
    text: 'We connect you only with professionals in your neighborhood for faster response times and genuine community trust.',
  },
  {
    icon: FaStar,
    title: 'Rated & Reviewed',
    text: 'Real ratings from real customers help you make informed decisions. Transparency is at the heart of everything we do.',
  },
]

export default function WhyChoose() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <Reveal className="text-center">
        <h2 className="font-heading text-4xl font-bold">Why Choose Servora?</h2>
        <p className="mt-3 text-muted">
          We take the guesswork out of finding reliable help at home.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {reasons.map((r, i) => (
          <Reveal key={r.title} delay={i * 120}>
            <div className="h-full text-center bg-white/60 rounded-3xl p-8 border border-blue-50 transition hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-200">
              <span className="mx-auto w-20 h-20 rounded-2xl bg-primary text-white text-3xl flex items-center justify-center shadow-lg shadow-blue-400/40">
                <r.icon />
              </span>
              <h3 className="mt-6 font-heading text-xl font-semibold">{r.title}</h3>
              <p className="mt-3 text-muted leading-relaxed">{r.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}