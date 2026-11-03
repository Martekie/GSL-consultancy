import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import {
  FiMapPin,
  FiPhone,
  FiCalendar,
  FiCheckCircle,
  FiSend,
  FiRefreshCw,
  FiAlertCircle,
} from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import useScrollAnimation from '../components/useScrollAnimation'
import './Contact.css'

// ─────────────────────────────────────────────
//  EMAILJS CREDENTIALS
//  1. Sign up at https://www.emailjs.com
//  2. Create a Gmail service  → paste Service ID  below
//  3. Create an email template → paste Template ID below
//  4. Go to Account → API Keys → paste Public Key below
// ─────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = 'service_gppkg6g'
const EMAILJS_TEMPLATE_ID = 'template_l14ifue'
const EMAILJS_PUBLIC_KEY  = 'MezI5SmkBAmPs0cyK'

const contactItems = [
  { Icon: FiMapPin,   label: 'Office Location',  value: 'Accra, Ghana',  href: null },
  { Icon: FiPhone,    label: 'Call Us Directly', value: '024 317 5277',  href: 'tel:+233243175277' },
  { Icon: FaWhatsapp, label: 'Chat on WhatsApp', value: '020 966 8822',  href: 'https://wa.me/233209668822' },
]

const serviceOptions = [
  { value: '',               label: 'Select a service area' },
  { value: 'internal-audit', label: 'Internal Audit & Risk Advisory' },
  { value: 'mis-it',         label: 'MIS & IT Audits' },
  { value: 'accounting',     label: 'Strategic Corporate Accounting' },
  { value: 'tax',            label: 'Tax Compliance & Advisory' },
  { value: 'other',          label: 'Other / Not sure yet' },
]

const systemOptions = [
  { value: '',           label: 'Choose a system' },
  { value: 'sage',       label: 'Sage' },
  { value: 'quickbooks', label: 'QuickBooks' },
  { value: 'sap',        label: 'SAP' },
  { value: 'oracle',     label: 'Oracle' },
  { value: 'excel',      label: 'Excel / Spreadsheets' },
  { value: 'ledgio',     label: 'Ledgio Business Accounting' },
  { value: 'other',      label: 'Other' },
]

function Field({ label, required, error, children }) {
  return (
    <div className={`cf-field${error ? ' has-error' : ''}`}>
      <label>{label} {required && <span className="cf-req">*</span>}</label>
      {children}
      {error && <span className="cf-error">{error}</span>}
    </div>
  )
}

const emptyForm = {
  fullName: '', company: '', phone: '', email: '',
  service: '', system: '', message: '',
}

export default function Contact() {
  const formRef    = useScrollAnimation(0.1)
  const infoRef    = useScrollAnimation(0.1)
  const ejsFormRef = useRef(null)

  const [values, setValues] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null) // null | 'sending' | 'sent' | 'error'

  const set = (field) => (e) => {
    setValues(v => ({ ...v, [field]: e.target.value }))
    if (errors[field]) setErrors(er => ({ ...er, [field]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!values.fullName.trim()) e.fullName = 'Please enter your full name.'
    if (!values.company.trim())  e.company  = 'Please enter your company name.'
    if (!values.phone.trim())    e.phone    = 'Please enter a phone number.'
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      e.email = 'Please enter a valid email address.'
    if (!values.service) e.service = 'Please select a service area.'
    if (!values.message.trim()) e.message = 'Please describe how we can help.'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setStatus('sending')

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        ejsFormRef.current,
        EMAILJS_PUBLIC_KEY
      )
      setStatus('sent')
      setValues(emptyForm)
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
    }
  }

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="eyebrow">Start a conversation</div>
          <h1>Let's Secure Your Business Future</h1>
          <p>
            Tell us about your organisation and what you'd like to improve. We'll use that to
            decide whether an introductory discussion would be useful.
          </p>
        </div>
      </div>

      <section className="contact-page">
        <div className="container contact-grid">

          {/* ── Info column ── */}
          <div ref={infoRef} className="contact-info fade-in-left">
            <h2>Speak with GSL Consultancy</h2>
            <p>
              Whether you need better reporting, stronger controls, support with tax
              compliance or a review of your accounting systems, the first step is a
              conversation about your needs.
            </p>

            <div className="contact-items">
              {contactItems.map(({ Icon, label, value, href }, i) => (
                <div key={i} className="ci-item">
                  <div className="ci-icon"><Icon size={18} /></div>
                  <div>
                    <strong>{label}</strong>
                    {href
                      ? <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{value}</a>
                      : <span>{value}</span>
                    }
                  </div>
                </div>
              ))}
            </div>

            <div className="contact-quick-actions">
              <a href="tel:+233243175277" className="btn btn-primary">
                <FiPhone size={15} /> Call Us Now
              </a>
              <a href="https://wa.me/233209668822" target="_blank" rel="noopener noreferrer" className="btn btn-secondary cqa-wa">
                <FaWhatsapp size={17} /> WhatsApp
              </a>
            </div>

            <div ref={useScrollAnimation(0.1)} className="contact-why-card fade-in">
              <h4>What to expect</h4>
              <ul>
                {[
                  'Free 15-minute introductory call',
                  'No obligation, no sales pressure',
                  'We agree scope before any work begins',
                  'Clear fees in writing from the start',
                ].map((item, i) => (
                  <li key={i}>
                    <FiCheckCircle size={14} style={{ marginRight: 8, color: 'var(--gold)', flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Form column ── */}
          <div ref={formRef} className="contact-form-wrap fade-in-right">

            {status === 'sent' ? (
              <div className="cf-success">
                <FiCheckCircle size={52} className="cf-success-icon" />
                <h3>Message received!</h3>
                <p>
                  Thank you for reaching out. We'll review your enquiry and be in touch
                  shortly to arrange a convenient time to talk.
                </p>
                <button className="btn btn-outline" onClick={() => setStatus(null)}>
                  <FiRefreshCw size={14} /> Send another message
                </button>
              </div>
            ) : (
              <form
                className="contact-form"
                onSubmit={handleSubmit}
                ref={ejsFormRef}
                noValidate
              >
                <h3>Book a Free 15-Minute Review</h3>
                <p className="cf-sub">Fill in the form and we'll confirm a time with you.</p>

                {status === 'error' && (
                  <div className="cf-error-banner">
                    <FiAlertCircle size={16} />
                    Something went wrong sending your message. Please try WhatsApp or call us directly.
                  </div>
                )}

                <div className="cf-grid">
                  <Field label="Full Name" required error={errors.fullName}>
                    <input name="fullName" type="text" value={values.fullName} onChange={set('fullName')} placeholder="Your full name" autoComplete="name" />
                  </Field>
                  <Field label="Company Name" required error={errors.company}>
                    <input name="company" type="text" value={values.company} onChange={set('company')} placeholder="Your organisation" autoComplete="organization" />
                  </Field>
                  <Field label="Phone Number" required error={errors.phone}>
                    <input name="phone" type="tel" value={values.phone} onChange={set('phone')} placeholder="e.g. 024 317 5277" autoComplete="tel" />
                  </Field>
                  <Field label="Email Address" error={errors.email}>
                    <input name="email" type="email" value={values.email} onChange={set('email')} placeholder="optional" autoComplete="email" />
                  </Field>
                  <Field label="Service Area" required error={errors.service}>
                    <select name="service" value={values.service} onChange={set('service')}>
                      {serviceOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </Field>
                  <Field label="Primary System Used">
                    <select name="system" value={values.system} onChange={set('system')}>
                      {systemOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </Field>
                  <Field label="How can we help?" required error={errors.message}>
                    <textarea name="message" value={values.message} onChange={set('message')} placeholder="Briefly describe the support you're looking for..." rows={5} className="cf-full" />
                  </Field>
                </div>

                <button
                  type="submit"
                  className={`btn btn-primary cf-submit${status === 'sending' ? ' sending' : ''}`}
                  disabled={status === 'sending'}
                >
                  {status === 'sending'
                    ? <><FiSend size={15} style={{ animation: 'spin 1s linear infinite' }} /> Sending…</>
                    : <><FiCalendar size={15} /> Book Free 15-Minute Review</>
                  }
                </button>

                <p className="cf-note">
                  Please do not include passwords, bank account details or other sensitive information in this form.
                </p>
              </form>
            )}
          </div>

        </div>
      </section>
    </>
  )
}
