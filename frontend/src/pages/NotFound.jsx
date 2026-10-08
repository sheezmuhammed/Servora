import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'

export default function NotFound() {
  return (
    <main className="max-w-xl mx-auto px-6 py-24 text-center">
      <Reveal>
        <p className="font-heading text-8xl font-bold text-primary">404</p>
        <h1 className="mt-4 font-heading text-3xl font-bold">Page not found</h1>
        <p className="mt-3 text-muted">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/"
            className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-full shadow-lg shadow-blue-500/40 transition hover:-translate-y-0.5"
          >
            Go Home
          </Link>
          <Link
            to="/services"
            className="border-2 border-primary text-primary font-semibold px-8 py-3 rounded-full transition hover:bg-primary hover:text-white"
          >
            Browse Services
          </Link>
        </div>
      </Reveal>
    </main>
  )
}