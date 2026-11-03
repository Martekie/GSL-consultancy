import { useState, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser'
import {
  FiX, FiCalendar, FiCheckCircle, FiSend,
  FiRefreshCw, FiAlertCircle, FiUser,
  FiBriefcase, FiPhone, FiMail, FiMessageSquare,
} from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

const EMAILJS_SERVICE_ID  = 'service_gppkg6g'
const EMAILJS_TEMPLATE_ID = 'template_l14ifue'
const EMAILJS_PUBLIC_KEY  = 'MezI5SmkBAmPs0cyK'

const serviceOptions = [
  { value: '',               label: 'Select a service area' },
  { value: 'internal-audit', label: 'Internal Audit & Risk Advisory' },
  { value: 'mis-it',         label: 'MIS & IT Audits' },
  { value: 'accounting',     label: 'Strategic Corporate Accounting' },
  { value: 'tax',            label: 'Tax Compliance & Advisory' },
  { value: 'other',          label: 'Other / Not sure yet' },
]

const emptyForm = {
  fullName: '', company: '', phone: '', email: '', service: '', message: '',
}

function Field({ icon: Icon, label, required, error, children }) {
  return (
    <div className={`bm-field${error ? ' has-error' : ''}`}>
      <label>{Icon && <Icon size={13} />} {label} {required && <span className="bm-req">*</span>}</label>
      {children}
      {error && <span className="bm-error">{error}</span>}
    </div>
  )
}

export default function BookingModal({ open, onClose }) {
  const formRef = useRef(null)
  const [values, setValues]   = useState(emptyForm)
  const [errors, setErrors]   = useState({})
  const [status, setStatus]   = useState(null) // null | 'sending' | 'sent' | 'error'

  /* Lock body scroll when open */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  /* Close on Escape */
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  /* Reset when reopened */
  useEffect(() => {
    if (open) { setValues(emptyForm); setErrors({}); setStatus(null) }
  }, [open])

  const set = (field) => (e) => {
    setValues(v => ({ ...v, [field]: e.target.value }))
    if (errors[field]) setErrors(er => ({ ...er, [field]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!values.fullName.trim()) e.fullName = 'Full name is required.'
    if (!values.company.trim())  e.company  = 'Company name is required.'
    if (!values.phone.trim())    e.phone    = 'Phone number is required.'
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      e.email = 'Enter a valid email.'
    if (!values.service)         e.service  = 'Please select a service.'
    if (!values.message.trim())  e.message  = 'Please describe how we can help.'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setStatus('sending')
    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY)
      setStatus('sent')
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  if (!open) return null

  return (
    <div className="bm-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bm-panel" role="dialog" aria-modal="true" aria-label="Book a free review">

        {/* Header */}
        <div className="bm-header">
          <div className="bm-header-left">
            <div className="bm-header-icon"><FiCalendar size={20} /></div>
            <div>
              <h2>Book a Free 15-Min Review</h2>
              <p>We'll be in touch to confirm a convenient time.</p>
            </div>
          </div>
          <button className="bm-close" onClick={onClose} aria-label="Close">
            <FiX size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="bm-body">
          {status === 'sent' ? (
            <div className="bm-success">
              <div className="bm-success-ring">
                <FiCheckCircle size={44} />
              </div>
              <h3>Booking received!</h3>
              <p>Thank you. We'll review your details and reach out shortly to arrange a time.</p>
              <div className="bm-success-actions">
                <button className="btn btn-primary" onClick={onClose}>Close</button>
                <a href="https://wa.me/233209668822" target="_blank" rel="noopener noreferrer" className="btn bm-wa-btn">
                  <FaWhatsapp size={16} /> Chat on WhatsApp
                </a>
              </div>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} noValidate>
              {status === 'error' && (
                <div className="bm-error-banner">
                  <FiAlertCircle size={15} />
                  Something went wrong. Please try WhatsApp or call us directly on 024 317 5277.
                </div>
              )}

              <div className="bm-grid">
                <Field icon={FiUser} label="Full Name" required error={errors.fullName}>
                  <input name="fullName" type="text" value={values.fullName} onChange={set('fullName')} placeholder="Your full name" autoComplete="name" />
                </Field>
                <Field icon={FiBriefcase} label="Company" required error={errors.company}>
                  <input name="company" type="text" value={values.company} onChange={set('company')} placeholder="Your organisation" autoComplete="organization" />
                </Field>
                <Field icon={FiPhone} label="Phone" required error={errors.phone}>
                  <input name="phone" type="tel" value={values.phone} onChange={set('phone')} placeholder="e.g. 024 317 5277" autoComplete="tel" />
                </Field>
                <Field icon={FiMail} label="Email" error={errors.email}>
                  <input name="email" type="email" value={values.email} onChange={set('email')} placeholder="optional" autoComplete="email" />
                </Field>
                <Field icon={FiMessageSquare} label="Service Area" required error={errors.service}>
                  <select name="service" value={values.service} onChange={set('service')}>
                    {serviceOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </Field>
                <Field icon={FiMessageSquare} label="How can we help?" required error={errors.message}>
                  <textarea name="message" value={values.message} onChange={set('message')}
                    placeholder="Briefly describe what you need..." rows={3} />
                </Field>
              </div>

              <button
                type="submit"
                className={`btn btn-primary bm-submit${status === 'sending' ? ' sending' : ''}`}
                disabled={status === 'sending'}
              >
                {status === 'sending'
                  ? <><FiSend size={14} className="bm-spin" /> Sending…</>
                  : <><FiCalendar size={14} /> Confirm My Free Review</>
                }
              </button>

              <p className="bm-note">No obligation. We agree scope and fees before any work begins.</p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
