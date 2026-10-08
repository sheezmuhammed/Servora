import { FaHandshake, FaAward, FaUsers, FaEye } from 'react-icons/fa'
import Reveal from '../components/Reveal'
import Counter from '../components/Counter'

const stats = [
  { end: 10000, suffix: '+', label: 'Happy customers' },
  { end: 500, suffix: '+', label: 'Verified professionals' },
  { end: 6, suffix: '', label: 'Service categories' },
  { end: 98, suffix: '%', label: 'Satisfaction rate' },
]

const values = [
  { icon: FaHandshake, title: 'Trust', text: 'Every professional is background-verified before joining.' },
  { icon: FaAward, title: 'Quality', text: 'We stand behind every job with ratings and reviews.' },
  { icon: FaUsers, title: 'Community', text: 'We grow by supporting local people and local work.' },
  { icon: FaEye, title: 'Transparency', text: 'Clear prices and honest reviews, with no hidden charges.' },
]

const team = [
  { name: 'Team Member 1', role: 'Founder & CEO' },
  { name: 'Team Member 2', role: 'Head of Operations' },
  { name: 'Team Member 3', role: 'Lead Developer' },
  { name: 'Team Member 4', role: 'Customer Success' },
]

export default function About() {
  return (
    <main>
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-10 text-center">
        <Reveal>
          <h1 className="font-heading text-5xl font-bold">About Servora</h1>
          <p className="mt-6 text-xl text-primary font-heading font-medium">
            Connecting local communities with trusted service professionals.
          </p>
        </Reveal>
      </section>

      {/* Story */}
      <section className="max-w-4xl mx-auto px-6 py-10">
        <Reveal>
          <h2 className="font-heading text-3xl font-bold">Our Story</h2>
          <p className="mt-4 text-muted leading-relaxed">
            Servora started in 2023 with a simple problem: finding a reliable electrician,
            plumber or tutor nearby meant asking around and hoping for the best. We built
            a hyperlocal marketplace where verified professionals in your neighborhood are
            just a few taps away.
          </p>
          <p className="mt-4 text-muted leading-relaxed">
            Today, homeowners and professionals across Kerala use Servora every day to get
            work done faster, fairer and with more trust.
          </p>
        </Reveal>
      </section>

      {/* In numbers */}
      <section className="bg-gradient-to-b from-slate-900 to-blue-950 text-white py-16 mt-10">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center">
            <h2 className="font-heading text-3xl font-bold">Servora in Numbers</h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 100}>
                <p className="font-heading text-4xl md:text-5xl font-bold text-blue-400">
                  <Counter end={s.end} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-blue-100/80">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <Reveal className="text-center">
          <h2 className="font-heading text-3xl font-bold">Our Values</h2>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 100}>
              <div className="h-full text-center bg-white/70 rounded-3xl p-8 border border-blue-50 transition hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-200">
                <span className="mx-auto w-16 h-16 rounded-2xl bg-primary text-white text-2xl flex items-center justify-center shadow-lg shadow-blue-400/40">
                  <v.icon />
                </span>
                <h3 className="mt-5 font-heading text-xl font-semibold">{v.title}</h3>
                <p className="mt-2 text-muted">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="max-w-6xl mx-auto px-6 pb-10">
        <Reveal className="text-center">
          <h2 className="font-heading text-3xl font-bold">Meet the Team</h2>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <div className="text-center bg-white rounded-3xl p-8 shadow-md border border-blue-50 transition hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-200">
                <span className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-accent to-primary text-white font-heading text-3xl font-bold flex items-center justify-center">
                  {t.name.charAt(0)}
                </span>
                <h3 className="mt-4 font-heading font-semibold">{t.name}</h3>
                <p className="text-muted text-sm">{t.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  )
}