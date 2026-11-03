import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FiShield, FiMonitor, FiBarChart2, FiFileText,
  FiTarget, FiTool, FiUsers, FiTrendingUp,
  FiArrowRight, FiCalendar,
} from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import useScrollAnimation from '../components/useScrollAnimation'
import { useModal } from '../components/ModalContext'
import './Home.css'

/* ── Animated counter ── */
function Counter({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const startTime = performance.now()
        const tick = (now) => {
          const progress = Math.min((now - startTime) / duration, 1)
          setCount(Math.floor(progress * end))
          if (progress < 1) requestAnimationFrame(tick)
          else setCount(end)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [end, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

/* ── Service preview card ── */
function ServiceCard({ Icon, title, intro, items, delay = 0 }) {
  const ref = useScrollAnimation(0.1)
  return (
    <article
      ref={ref}
      className="fade-in home-service-card"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="hsc-icon"><Icon size={24} /></div>
      <h3>{title}</h3>
      <p className="hsc-intro">{intro}</p>
      <ul>
        {items.map((it, i) => <li key={i}>{it}</li>)}
      </ul>
      <Link to="/contact" className="hsc-link">
        Get support <FiArrowRight size={13} />
      </Link>
    </article>
  )
}

const services = [
  {
    Icon: FiShield,
    title: 'Internal Audit & Risk Advisory',
    intro: 'Safeguarding your business assets through sound controls and clear oversight.',
    items: ['Outsourced or fractional internal audit support', 'Internal control reviews and workflow improvement', 'Risk assessment and compliance process reviews'],
  },
  {
    Icon: FiMonitor,
    title: 'MIS & IT Audits',
    intro: 'Reviewing the software, access and data processes behind your financial information.',
    items: ['Accounting and ERP health checks (Sage, QuickBooks, SAP, Oracle)', 'User access, system logs and transaction-override controls', 'Automated management reports and KPI dashboards'],
  },
  {
    Icon: FiBarChart2,
    title: 'Strategic Corporate Accounting',
    intro: 'Turning financial numbers into useful information for business decisions.',
    items: ['Financial statements and management reporting', 'Budgeting, forecasting and cash-flow planning', 'Expense reviews and operational cost analysis'],
  },
  {
    Icon: FiFileText,
    title: 'Tax Compliance & Advisory',
    intro: 'Helping organisations manage tax responsibilities with care and confidence.',
    items: ['Corporate tax computations and filing support', 'VAT and withholding-tax reviews', 'GRA audit preparation and authorised representation'],
  },
]

const stats = [
  { end: 20,  suffix: '+', label: 'Years Experience' },
  { end: 100, suffix: '+', label: 'Clients Served' },
  { end: 4,   suffix: '',  label: 'Core Service Areas' },
  { end: 98,  suffix: '%', label: 'Client Satisfaction' },
]

const whyItems = [
  { Icon: FiTarget,     title: 'Deep Expertise',         desc: "Led by a principal consultant with 20 years of corporate finance leadership in Ghana, an ACCA and MIS Master's degree." },
  { Icon: FiTool,       title: 'Practical Solutions',    desc: 'We focus on actionable, proportionate recommendations — not theoretical frameworks.' },
  { Icon: FiUsers,      title: 'Client-Centred',         desc: 'Every engagement begins with understanding your specific needs and agreeing a clear scope.' },
  { Icon: FiTrendingUp, title: 'Useful Recommendations', desc: 'Our findings are always tied to decisions management can actually act on.' },
]

export default function Home() {
  const heroRef     = useScrollAnimation(0)
  const statsRef    = useScrollAnimation(0.1)
  const approachRef = useScrollAnimation(0.1)
  const ctaRef      = useScrollAnimation(0.1)
  const { openModal } = useModal()

  return (
    <>
      {/* ─── HERO (floating card) ─── */}
      <div className="home-hero-wrapper">
        <div className="container">
          <div className="hero-float-card">
            <section className="home-hero">
              <div className="hero-bg-shapes" aria-hidden="true">
                <div className="hero-shape hero-shape-1" />
                <div className="hero-shape hero-shape-2" />
                <div className="hero-shape hero-shape-3" />
              </div>
              <div className="container hero-grid">
                <div ref={heroRef} className="hero-copy fade-in-left">
                  <div className="eyebrow">Practical advice. Stronger business foundations.</div>
                  <h1>
                    Protecting Your Bottom Line,{' '}
                    <span className="hero-highlight">Securing Your Data</span>
                    {' '}and Streamlining Your Operations.
                  </h1>
                  <p>
                    We help organisations strengthen financial controls, secure their information
                    systems, meet tax obligations and turn financial data into practical business
                    decisions.
                  </p>
                  <div className="hero-actions">
                    <Link className="btn btn-primary" to="/services">
                      Explore Our Services <FiArrowRight size={16} />
                    </Link>
                    <button className="btn btn-secondary" onClick={openModal}>
                      <FiCalendar size={15} /> Book a Free 15-Min Review
                    </button>
                  </div>
                  <p className="hero-note">
                    <span className="hero-dot" /> Accounting, audit, systems and tax advisory for organisations in Ghana.
                  </p>
                </div>

                {/* Dashboard visual card */}
                <div className="hero-visual fade-in-right">
                  <div className="dashboard-card">
                    <div className="dc-header">
                      <span className="dc-logo">GSL <span className="dc-arrow">↗</span></span>
                      <span className="dc-label">Business overview</span>
                    </div>
                    <p className="dc-sub">Financial performance snapshot</p>
                    <div className="dc-bars" aria-hidden="true">
                      {[36, 54, 43, 72, 62, 92].map((h, i) => (
                        <i key={i} className="dc-bar" style={{ '--h': `${h}%`, animationDelay: `${i * 0.1}s` }} />
                      ))}
                    </div>
                    <div className="dc-metrics">
                      {[['01', 'Controls'], ['02', 'Systems'], ['03', 'Insights']].map(([n, l]) => (
                        <div key={n} className="dc-metric">
                          <strong>{n}</strong>
                          <small>{l}</small>
                        </div>
                      ))}
                    </div>
                    <div className="dc-services-grid">
                      {['Audit', 'Tax', 'MIS', 'Accounting'].map(s => (
                        <span key={s} className="dc-tag">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* ─── STATS ─── */}
      <section className="home-stats">
        <div className="container">
          <div ref={statsRef} className="stats-grid fade-in">
            {stats.map((s, i) => (
              <div key={i} className="stat-item">
                <div className="stat-number"><Counter end={s.end} suffix={s.suffix} /></div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES PREVIEW ─── */}
      <section className="home-services">
        <div className="container">
          <div className="section-head fade-in" ref={useScrollAnimation(0.1)}>
            <div className="eyebrow">What we do</div>
            <h2>Clear advice for the issues that matter to your business</h2>
            <p>
              From strengthening day-to-day controls to improving financial reporting and
              systems, we focus on practical work that helps management see what is happening
              and decide what to do next.
            </p>
          </div>
          <div className="home-services-grid">
            {services.map((s, i) => (
              <ServiceCard key={i} {...s} delay={i * 80} />
            ))}
          </div>
          <div className="services-cta">
            <Link to="/services" className="btn btn-outline">
              See All Services in Detail <FiArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── WHY GSL ─── */}
      <section className="home-why">
        <div className="container why-grid">
          <div ref={useScrollAnimation(0.1)} className="why-panel fade-in-left">
            <div className="why-years">
              <Counter end={20} suffix="+" />
              <span>years</span>
            </div>
            <h3>Finance experience, with a systems perspective</h3>
            <p>
              GSL Consultancy brings together corporate finance knowledge and Management
              Information Systems expertise to help organisations look at both their financial
              results and the processes behind them.
            </p>
            <Link to="/about" className="btn btn-primary" style={{ marginTop: '24px' }}>
              Learn More About Us <FiArrowRight size={15} />
            </Link>
          </div>
          <div ref={useScrollAnimation(0.1)} className="why-benefits fade-in-right">
            {whyItems.map(({ Icon, title, desc }, i) => (
              <div key={i} className="why-benefit" style={{ animationDelay: `${i * 100}ms` }}>
                <span className="wb-icon"><Icon size={22} /></span>
                <div>
                  <strong>{title}</strong>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── APPROACH ─── */}
      <section className="home-approach">
        <div className="container">
          <div ref={approachRef} className="section-head fade-in">
            <div className="eyebrow">How we work</div>
            <h2>Professional support, without unnecessary complexity</h2>
            <p>We aim to make each engagement clear, useful and proportionate to the organisation's needs.</p>
          </div>
          <div className="approach-steps">
            {[
              { n: '01', title: 'Understand the issue', desc: 'We listen to management, review the context and agree what needs attention before recommending a solution.' },
              { n: '02', title: 'Agree the scope',      desc: 'We set out the work, deliverables, timing, responsibilities and fees in writing before starting an assignment.' },
              { n: '03', title: 'Make it actionable',   desc: 'We present clear findings and practical next steps that management can assess and implement.' },
            ].map((step, i) => {
              const ref = useScrollAnimation(0.1)
              return (
                <div key={i} ref={ref} className="approach-step fade-in" style={{ transitionDelay: `${i * 120}ms` }}>
                  <div className="step-number">{step.n}</div>
                  <div className="step-line" aria-hidden="true" />
                  <div className="step-content">
                    <strong>{step.title}</strong>
                    <p>{step.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="home-cta">
        <div className="container">
          <div ref={ctaRef} className="cta-box fade-in">
            <div className="cta-content">
              <h2>Ready to strengthen your financial controls?</h2>
              <p>Book a free 15-minute introductory call. No obligation, just a conversation about your needs.</p>
            </div>
            <div className="cta-actions">
              <button className="btn btn-primary" onClick={openModal}>
                <FiCalendar size={15} /> Book a Free Review
              </button>
              <a href="https://wa.me/233209668822" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                <FaWhatsapp size={17} /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
