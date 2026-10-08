import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { MdLocationOn, MdEmail, MdPhone } from 'react-icons/md'

const socials = [FaFacebookF, FaXTwitter, FaInstagram, FaLinkedinIn]

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

const accountLinks = [
  { to: '/login', label: 'Sign In' },
  { to: '/login', label: 'Register' },
  { to: '/my-bookings', label: 'My Bookings' },
]

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-blue-900 text-white ">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <h3 className="font-heading text-3xl font-bold text-blue-400">Servora</h3>
            <p className="mt-4 text-blue-100/80 leading-relaxed">
              Your trusted hyperlocal marketplace connecting communities with
              reliable home service professionals.
            </p>
            <div className="flex gap-3 mt-6">
              {socials.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-blue-500 hover:border-blue-500 transition hover:-translate-y-1"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold tracking-wide text-sm uppercase mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3 text-blue-100/80">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="hover:text-white transition">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold tracking-wide text-sm uppercase mb-4">
              Account
            </h4>
            <ul className="space-y-3 text-blue-100/80">
              {accountLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="hover:text-white transition">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold tracking-wide text-sm uppercase mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3 text-blue-100/80">
              <li className="flex items-center gap-2">
                <MdLocationOn className="text-blue-400 text-xl" /> Calicut, Kerala, India
              </li>
              <li className="flex items-center gap-2">
                <MdEmail className="text-blue-400 text-xl" /> hello@servora.com
              </li>
              <li className="flex items-center gap-2">
                <MdPhone className="text-blue-400 text-xl" /> +91 1231231233
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 text-center text-sm text-blue-100/60">
          © 2026 Servora. All rights reserved.
        </div>
      </div>
    </footer>
  )
}