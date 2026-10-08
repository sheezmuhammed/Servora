import { useState } from 'react'
import { MdLocationOn, MdEmail, MdPhone } from 'react-icons/md'
import { FaChevronDown } from 'react-icons/fa'
import Reveal from '../components/Reveal'

const info = [
  { icon: MdLocationOn, label: 'Address', value: 'Calicut, Kerala, India' },
  { icon: MdPhone, label: 'Phone', value: '+91 98765 43210' },
  { icon: MdEmail, label: 'Email', value: 'hello@servora.com' },
]

const faqs = [
  { q: 'How do I book a service?', a: 'Open the Services page, choose a service, click Book Now, pick a date and time, and pay securely online.' },
  { q: 'Are the professionals verified?', a: 'Yes. Every professional goes through a background check and skill verification before joining Servora.' },
  { q: 'What payment methods are accepted?', a: 'We accept UPI, debit and credit cards, and net banking through Razorpay.' },
  { q: 'Can I cancel or reschedule a booking?', a: 'Yes. Contact us with your booking details and we will help you reschedule or cancel.' },
  { q: 'Which areas do you serve?', a: 'We currently serve Calicut and nearby areas in Kerala, and we are expanding soon.' },
  { q: 'What if I am not happy with the work?', a: 'Tell us within 48 hours and we will work with the professional to make it right.' },
]

export default function Contact() {
  const [open, setOpen] = useState(0)

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <Reveal className="text-center">
        <h1 className="font-heading text-5xl font-bold">Contact Us</h1>
        <p className="mt-4 text-muted">We would love to hear from you.</p>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {info.map((c, i) => (
          <Reveal key={c.label} delay={i * 100}>
            <div className="text-center bg-white rounded-3xl p-8 shadow-md border border-blue-50 transition hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-200">
              <span className="mx-auto w-14 h-14 rounded-2xl bg-primary text-white text-2xl flex items-center justify-center shadow-lg shadow-blue-400/40">
                <c.icon />
              </span>
              <h3 className="mt-4 font-heading font-semibold">{c.label}</h3>
              <p className="mt-1 text-muted">{c.value}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-20 text-center">
        <h2 className="font-heading text-3xl font-bold">Frequently Asked Questions</h2>
      </Reveal>

      <div className="mt-8 space-y-4">
        {faqs.map((f, i) => {
          const isOpen = open === i
          return (
            <Reveal key={f.q} delay={i * 60}>
              <div className="bg-white rounded-2xl border border-blue-100 shadow-sm overflow-hidden">
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between text-left px-6 py-4 font-heading font-semibold hover:text-primary transition"
                >
                  {f.q}
                  <FaChevronDown className={`text-primary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-muted">{f.a}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </main>
  )
}