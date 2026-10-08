import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { HiBars3, HiXMark } from 'react-icons/hi2'
import { useAuth } from '../context/AuthContext'

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  // Close the menu whenever the page changes
  useEffect(() => setOpen(false), [pathname])

  const linkClass = ({ isActive }) =>
    `font-medium transition hover:text-primary ${isActive ? 'text-primary' : 'text-ink'}`

  const mobileLink = ({ isActive }) =>
    `block py-3 px-4 rounded-xl font-medium transition ${
      isActive ? 'bg-soft text-primary' : 'text-ink hover:bg-soft'
    }`

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-blue-100">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="font-heading text-3xl font-bold text-primary">
          Servora
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-10">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} end={l.to === '/'} className={linkClass}>
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop right side */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <NavLink to="/my-bookings" className={linkClass}>My Bookings</NavLink>
              {user.role === 'admin' && (
                <NavLink to="/admin" className={linkClass}>Admin</NavLink>
              )}
              <span className="text-muted text-sm">Hi, {user.name.split(' ')[0]}</span>
              <button
                onClick={logout}
                className="border-2 border-primary text-primary font-semibold px-5 py-2 rounded-full transition hover:bg-primary hover:text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-2.5 rounded-full shadow-lg shadow-blue-500/40 transition hover:-translate-y-0.5"
            >
              Login
            </Link>
          )}
        </div>

        {/* Hamburger button (phones only) */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="md:hidden text-3xl text-primary"
        >
          {open ? <HiXMark /> : <HiBars3 />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden grid transition-all duration-300 ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-5 space-y-1 border-t border-blue-50">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === '/'} className={mobileLink}>
                {l.label}
              </NavLink>
            ))}

            {user ? (
              <>
                <NavLink to="/my-bookings" className={mobileLink}>My Bookings</NavLink>
                {user.role === 'admin' && (
                  <NavLink to="/admin" className={mobileLink}>Admin</NavLink>
                )}
                <p className="px-4 pt-3 text-sm text-muted">Signed in as {user.name}</p>
                <button
                  onClick={logout}
                  className="mt-2 w-full border-2 border-primary text-primary font-semibold py-2.5 rounded-full transition hover:bg-primary hover:text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="mt-3 block text-center bg-primary text-white font-semibold py-2.5 rounded-full shadow-lg shadow-blue-500/40"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}