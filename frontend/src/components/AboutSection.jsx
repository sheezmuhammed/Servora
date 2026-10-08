import { Link } from 'react-router-dom'
import { MdVerified } from 'react-icons/md'
import Reveal from './Reveal'

export default function AboutSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="grid gap-12 md:grid-cols-2 items-center">
        <Reveal>
          <h2 className="font-heading text-4xl font-bold">About Servora</h2>

          <p className="mt-6 border-l-4 border-primary pl-5 font-heading text-xl font-medium text-primary">
            Connecting local communities with trusted service professionals since 2023.
          </p>

          <p className="mt-6 text-muted leading-relaxed">
            Servora is a hyperlocal service marketplace built to make everyday life
            easier. Whether you need an electrician for a quick fix, a tutor for your
            child, or a reliable cleaner for your home, we connect you with trusted
            professionals who live and work in your neighborhood.
          </p>
          <p className="mt-4 text-muted leading-relaxed">
            Every service provider on our platform is background-verified, rated by
            real customers, and committed to delivering high-quality work. We believe
            in building trust, one service at a time.
          </p>

          <Link
            to="/login"
            className="inline-block mt-8 border-2 border-primary text-primary font-semibold px-8 py-3 rounded-full transition hover:bg-primary hover:text-white hover:-translate-y-1"
          >
            Join the Community
          </Link>
        </Reveal>

        <Reveal delay={200}>
          <div className="bg-white/70 border border-blue-100 rounded-3xl p-10 text-center shadow-lg">
            <span className="mx-auto w-24 h-24 rounded-3xl bg-primary text-white text-5xl flex items-center justify-center shadow-xl shadow-blue-400/40">
              <MdVerified />
            </span>
            <h3 className="mt-6 font-heading text-2xl font-bold">Trusted by 10,000+</h3>
            <p className="mt-3 text-muted">
              Homeowners and professionals across Kerala trust Servora for their
              service needs, every single day.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}