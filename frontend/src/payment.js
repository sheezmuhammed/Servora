import { api } from './api'

// Opens Razorpay checkout. Resolves true if paid, false if the window was closed.
export async function payForBooking(booking, user) {
  const { data: order } = await api.post('/payment/order', { bookingId: booking._id })

  return new Promise((resolve, reject) => {
    if (!window.Razorpay) return reject(new Error('Payment script not loaded'))

    const rzp = new window.Razorpay({
      key: order.key,
      amount: order.amount,
      currency: order.currency,
      order_id: order.orderId,
      name: 'Servora',
      description: 'Service booking',
      prefill: { name: user.name, email: user.email, contact: user.phone },
      theme: { color: '#1d4ed8' },
      handler: async (resp) => {
        try {
          await api.post('/payment/verify', { bookingId: booking._id, ...resp })
          resolve(true)
        } catch (err) {
          reject(err)
        }
      },
      modal: { ondismiss: () => resolve(false) },
    })
    rzp.open()
  })
}