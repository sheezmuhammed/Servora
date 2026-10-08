import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { api } from '../api'
import { useAuth } from '../context/AuthContext'
import Reveal from '../components/Reveal'

const input =
    'w-full rounded-xl border border-blue-100 bg-white px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-blue-200'

export default function Login() {
    const [mode, setMode] = useState('login')
    const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const change = (e) => {
        let { name, value } = e.target
        if (name === 'phone') value = value.replace(/\D/g, '').slice(0, 10)
        setForm({ ...form, [name]: value })
    }

    const rules = [
        { label: 'At least 6 characters', ok: form.password.length >= 6 },
        { label: 'One uppercase letter', ok: /[A-Z]/.test(form.password) },
        { label: 'One number', ok: /\d/.test(form.password) },
        { label: 'One special character (@ # $ ! etc.)', ok: /[^A-Za-z0-9]/.test(form.password) },
    ]
    const strong = rules.every((r) => r.ok)

    const submit = async (e) => {
        e.preventDefault()
        setError('')
        if (mode === 'register' && !/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(form.email)) {
            setError('Please enter a valid email address (e.g. name@gmail.com)')
            return
        }
        if (mode === 'register' && !strong) {
            setError('Please meet all the password requirements')
            return
        }
        setLoading(true)
        try {
            const res = await api.post(`/auth/${mode}`, form)
            login(res.data)
            navigate(location.state?.from || '/')
        } catch (err) {
            setError(err.response?.data?.message || 'Could not connect to the server')
        } finally {
            setLoading(false)
        }
    }

    const tab = (active) =>
        `flex-1 py-2.5 rounded-full font-semibold transition ${active ? 'bg-primary text-white shadow-lg shadow-blue-500/40' : 'text-muted hover:text-primary'
        }`

    return (
        <main className="max-w-md mx-auto px-6 py-16">
            <Reveal>
                <div className="bg-white rounded-3xl shadow-xl border border-blue-50 p-8">
                    <h1 className="font-heading text-3xl font-bold text-center">
                        {mode === 'login' ? 'Welcome back' : 'Create account'}
                    </h1>
                    <p className="text-muted text-center mt-2">
                        {mode === 'login' ? 'Login to book trusted services.' : 'Join the Servora community.'}
                    </p>

                    <div className="mt-6 flex bg-soft rounded-full p-1">
                        <button type="button" onClick={() => setMode('login')} className={tab(mode === 'login')}>Login</button>
                        <button type="button" onClick={() => setMode('register')} className={tab(mode === 'register')}>Register</button>
                    </div>

                    <form onSubmit={submit} className="mt-6 space-y-4">
                        {mode === 'register' && (
                            <>
                                <input name="name" required placeholder="Full name" value={form.name} onChange={change} className={input} />
                                <input name="phone" type="tel" inputMode="numeric" maxLength={10} pattern="[0-9]{10}" title="Enter a 10-digit phone number" required placeholder="Phone number (10 digits)" value={form.phone} onChange={change} className={input} />
                            </>
                        )}
                        <input type="email" name="email" required placeholder="Email (e.g. name@gmail.com)" value={form.email} onChange={change} className={input} />
                        <input type="password" name="password" required placeholder="Password" value={form.password} onChange={change} className={input} />

                        {mode === 'register' && form.password && (
                            <ul className="text-sm space-y-1 px-1">
                                {rules.map((r) => (
                                    <li key={r.label} className={r.ok ? 'text-green-600' : 'text-muted'}>
                                        {r.ok ? '✓' : '○'} {r.label}
                                    </li>
                                ))}
                            </ul>
                        )}

                        {error && <p className="text-red-600 text-sm">{error}</p>}

                        <button
                            disabled={loading}
                            className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-full shadow-lg shadow-blue-500/40 transition hover:-translate-y-0.5 disabled:opacity-60"
                        >
                            {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Create account'}
                        </button>
                    </form>
                </div>
            </Reveal>
        </main>
    )
}