import { Link } from 'react-router-dom'
import {
  FiTarget,
  FiTool,
  FiUsers,
  FiTrendingUp,
  FiArrowRight,
  FiAward,
  FiBookOpen,
  FiBriefcase,
  FiStar,
  FiPhone,
} from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import useScrollAnimation from '../components/useScrollAnimation'
import './About.css'

const values = [
  { Icon: FiTarget,     title: 'Deep Expertise',         desc: "Led by a principal consultant with 20 years of corporate finance leadership in Ghana and a Master's in MIS." },
  { Icon: FiTool,       title: 'Practical Solutions',    desc: 'We focus on actionable, proportionate recommendations — not theoretical frameworks.' },
  { Icon: FiUsers,      title: 'Client-Centred',         desc: 'Every engagement begins with understanding your specific needs and agreeing a clear scope in writing.' },
  { Icon: FiTrendingUp, title: 'Useful Recommendations', desc: 'Our findings are always tied to decisions management can actually act on.' },
]

const credentials = [
  { Icon: FiBookOpen,  label: 'Education',    value: 'BSc in Accounting' },
  { Icon: FiAward,     label: 'Professional', value: 'ACCA Part 3 Training' },
  { Icon: FiStar,      label: 'Postgraduate', value: "Master's in Management Information Systems (MIS)" },
  { Icon: FiBriefcase, label: 'Experience',   value: '20+ years corporate finance leadership in Ghana' },
]

const expertise = ['Internal Audit', 'Risk Advisory', 'ERP Health Checks', 'Tax Compliance', 'Financial Reporting', 'Systems Audit']

export default function About() {
  const storyRef  = useScrollAnimation(0.1)
  const valuesRef = useScrollAnimation(0.1)
  const credsRef  = useScrollAnimation(0.1)
  const teamRef   = useScrollAnimation(0.1)

  return (
    <>
      {/* Page Hero */}
      <div className="page-hero">
        <div className="container">
          <div className="eyebrow">About GSL Consultancy</div>
          <h1>The Dual-Expertise Advantage</h1>
          <p>
            Finance knowledge and systems thinking, combined to give your organisation a
            clearer picture of both your numbers and the processes behind them.
          </p>
        </div>
      </div>

      {/* ─── Story ─── */}
      <section className="about-story">
        <div className="container about-story-grid">
          <div ref={storyRef} className="fade-in-left about-story-copy">
            <div className="eyebrow">Our Story</div>
            <h2>Built on 20 years of financial leadership</h2>
            <p>
              Many organisations need more than numbers on a report. They need confidence in
              how those numbers are produced, how transactions are controlled, and how
              information reaches the people making decisions.
            </p>
            <p>
              GSL Consultancy was founded to fill exactly that gap — combining corporate
              finance expertise with a deep understanding of the systems that support finance
              teams. We work with organisations across Ghana to improve controls, reporting,
              systems and tax compliance.
            </p>
            <p>
              Led by a principal consultant with 20 years of corporate finance leadership
              experience, a BSc in Accounting, ACCA Part 3 training and a Master's degree in
              Management Information Systems, GSL Consultancy brings a perspective that
              bridges accounting and technology.
            </p>
          </div>

          <div className="about-story-visual fade-in-right" ref={useScrollAnimation(0.1)}>
            {/* Replace this placeholder with <img src="/images/team.jpg" alt="GSL Team" /> */}
            <div className="about-photo-placeholder">
              <span className="app-initials">GSL</span>
              <span className="app-text">
                Team photo goes here<br />
                <small>Recommended: 480 × 560px</small>
              </span>
            </div>
            <div className="about-badge">
              <span className="ab-number">20+</span>
              <span className="ab-label">Years of<br />Experience</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Values ─── */}
      <section className="about-values">
        <div className="container">
          <div ref={valuesRef} className="section-head fade-in">
            <div className="eyebrow">What drives us</div>
            <h2>Our Approach to Every Engagement</h2>
            <p>Four commitments that shape how we work with every client.</p>
          </div>
          <div className="values-grid">
            {values.map(({ Icon, title, desc }, i) => {
              const ref = useScrollAnimation(0.1)
              return (
                <div key={i} ref={ref} className="value-card fade-in" style={{ transitionDelay: `${i * 90}ms` }}>
                  <div className="vc-icon"><Icon size={26} /></div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── Credentials ─── */}
      <section className="about-credentials">
        <div className="container about-creds-grid">
          <div ref={credsRef} className="fade-in-left">
            <div className="eyebrow">Qualifications</div>
            <h2>Professional Background</h2>
            <p>
              Our principal consultant combines formal accounting qualifications with
              postgraduate systems expertise — a combination that directly supports the work
              we do across audit, reporting, systems and tax.
            </p>
            <div className="creds-list">
              {credentials.map(({ Icon, label, value }, i) => (
                <div key={i} className="cred-item" style={{ animationDelay: `${i * 80}ms` }}>
                  <Icon size={18} className="cred-icon" />
                  <div>
                    <span className="cred-label">{label}</span>
                    <strong className="cred-value">{value}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="creds-highlight fade-in-right" ref={useScrollAnimation(0.1)}>
            <div className="ch-box">
              <div className="ch-top">
                <FiAward size={28} className="ch-icon" />
                <span className="ch-title">MIS + Accounting</span>
              </div>
              <p className="ch-desc">
                The intersection of financial accounting and management information systems
                gives GSL a perspective most consultancies don't have — the ability to review
                both the numbers and the systems producing them.
              </p>
              <div className="ch-tags">
                {expertise.map(t => <span key={t} className="ch-tag">{t}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Team ─── */}
      <section className="about-team">
        <div className="container">
          <div ref={teamRef} className="section-head fade-in">
            <div className="eyebrow">The Team</div>
            <h2>Who You'll Be Working With</h2>
          </div>
          <div className="team-grid">
            {[{
              initials: 'GL',
              name: 'Principal Consultant',
              role: 'Finance & Systems Lead',
              bio: 'With 20 years of corporate finance experience in Ghana and a dual background in accounting and management information systems, our principal consultant brings both financial rigour and systems thinking to every engagement.',
              // photo: '/images/team-principal.jpg'
            }].map((member, i) => {
              const ref = useScrollAnimation(0.1)
              return (
                <div key={i} ref={ref} className="team-card fade-in">
                  {/* Replace div below with <img src={member.photo} alt={member.name} /> */}
                  <div className="team-photo-placeholder">
                    <span>{member.initials}</span>
                  </div>
                  <div className="team-info">
                    <h3>{member.name}</h3>
                    <span className="team-role">{member.role}</span>
                    <p>{member.bio}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="about-cta">
        <div className="container">
          <div ref={useScrollAnimation(0.1)} className="fade-in about-cta-inner">
            <div className="acta-pulse-ring" aria-hidden="true" />
            <div className="acta-icon"><FiArrowRight size={28} /></div>
            <h2>Ready to work with us?</h2>
            <p>Start with a free 15-minute conversation about your organisation's needs.</p>
            <div className="acta-actions">
              <Link to="/contact" className="btn btn-primary acta-btn-main">
                Get in Touch <FiArrowRight size={15} />
              </Link>
              <a
                href="https://wa.me/233209668822"
                target="_blank"
                rel="noopener noreferrer"
                className="btn acta-btn-wa"
              >
                <FaWhatsapp size={18} /> WhatsApp Us
              </a>
              <a href="tel:+233243175277" className="btn acta-btn-call">
                <FiPhone size={15} /> Call 024 317 5277
              </a>
            </div>
            <p className="acta-note">No obligation · Free 15-min intro call · Fees agreed in writing</p>
          </div>
        </div>
      </section>
    </>
  )
}
