import { Link } from 'react-router-dom'
import {
  FiShield,
  FiMonitor,
  FiBarChart2,
  FiFileText,
  FiCheckCircle,
  FiArrowRight,
  FiCalendar,
} from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import useScrollAnimation from '../components/useScrollAnimation'
import './Services.css'

const services = [
  {
    id: 'audit',
    Icon: FiShield,
    tag: 'Risk Management',
    title: 'Internal Audit & Risk Advisory',
    intro: 'Safeguarding your business assets through sound controls and clear oversight.',
    description:
      "A well-run internal audit function helps organisations identify risks before they become problems, and gives management confidence in the information they rely on. We provide practical audit support that fits your organisation's size and needs.",
    items: [
      'Outsourced or fractional internal audit support, where appropriate',
      'Internal control reviews and workflow improvement',
      'Standard operating procedures and financial policy manuals',
      'Risk assessment and reviews of compliance processes',
    ],
    image: 'https://i.pinimg.com/736x/cf/b0/9a/cfb09a0b91b994480fb2f99c39a9a783.jpg',
  },
  {
    id: 'mis',
    Icon: FiMonitor,
    tag: 'Technology',
    title: 'MIS & Information Technology Audits',
    intro: 'Reviewing the software, access and data processes behind your financial information.',
    description:
      'The reliability of financial reports depends heavily on the systems that produce them. We review the controls around accounting software and business systems — user access, system logs, data flows and override risks — so management can trust what they see.',
    items: [
      'Accounting and ERP health checks for Sage, QuickBooks, SAP and Oracle',
      'User access, system logs and transaction-override controls',
      'System implementation and data migration reviews',
      'Automated management reports and financial KPI dashboards',
    ],
    image: 'https://img.magnific.com/free-photo/remote-worker-home-watching-business-conference-pc-monitor_482257-125192.jpg?semt=ais_hybrid&w=740&q=80',
  },
  {
    id: 'accounting',
    Icon: FiBarChart2,
    tag: 'Financial Management',
    title: 'Strategic Corporate Accounting',
    intro: 'Turning financial numbers into useful information for business decisions.',
    description:
      'Good accounting is more than compliance — it gives management a clear view of how the organisation is performing and where attention is needed. We support financial reporting, budgeting, and the processes that keep numbers accurate and timely.',
    items: [
      'Financial statements and management reporting',
      'Budgeting, forecasting and cash-flow planning',
      'Expense reviews and operational cost analysis',
      'Financial performance monitoring and reporting processes',
    ],
    image: 'https://static.vecteezy.com/system/resources/thumbnails/019/859/968/small_2x/image-of-audit-team-working-together-and-looking-about-transaction-for-corruption-of-company-finance-budget-concept-photo.jpg',
  },
  {
    id: 'tax',
    Icon: FiFileText,
    tag: 'Compliance',
    title: 'Tax Compliance & Advisory',
    intro: 'Helping organisations manage tax responsibilities with care and confidence.',
    description:
      'Tax obligations in Ghana involve multiple statutory requirements — corporate tax, VAT, withholding taxes, PAYE and more. We help organisations stay up to date, avoid penalties and manage GRA interactions with accurate records and clear communication.',
    items: [
      'Corporate tax computations and filing support',
      'VAT and withholding-tax reviews and applicable levy compliance',
      'GRA audit preparation, reconciliations and authorised representation',
      'PAYE, SSNIT and payroll statutory-deduction reviews',
    ],
    image: 'https://betaxefficient.com/wp-content/uploads/2026/02/Vendor-Tax-Compliance_-Ensuring-Partners-Meet-Your-Tax-Standards_1770967350.jpeg',
  },
]

function ServiceDetail({ service, reverse, index }) {
  const ref = useScrollAnimation(0.08)
  return (
    <article
      ref={ref}
      id={service.id}
      className={`service-detail fade-in${reverse ? ' reverse' : ''}`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <div className="sd-image-col">
        <div className="sd-image-placeholder">
          {service.image ? (
            <img src={service.image} alt={service.title} loading="lazy" />
          ) : (
            <>
              <service.Icon size={52} className="sd-placeholder-icon" />
              <span className="sd-placeholder-text">
                Drop a service photo here<br />
                <small>Recommended: 600 × 400px</small>
              </span>
            </>
          )}
        </div>
        <div className="sd-tag">{service.tag}</div>
      </div>

      <div className="sd-copy-col">
        <div className="sd-icon-wrap"><service.Icon size={28} /></div>
        <h2>{service.title}</h2>
        <p className="sd-intro">{service.intro}</p>
        <p className="sd-desc">{service.description}</p>
        <ul className="sd-list">
          {service.items.map((item, i) => (
            <li key={i}>
              <FiCheckCircle size={16} className="sd-check" /> {item}
            </li>
          ))}
        </ul>
        <Link to="/contact" className="btn btn-primary sd-cta">
          Discuss this service <FiArrowRight size={15} />
        </Link>
      </div>
    </article>
  )
}

export default function Services() {
  return (
    <>
      {/* Page hero */}
      <div className="page-hero">
        <div className="container">
          <div className="eyebrow">What we do</div>
          <h1>Our Services</h1>
          <p>
            Practical finance, audit, systems and tax support for organisations in Ghana —
            focused on the work that actually makes a difference.
          </p>
        </div>
      </div>

      {/* Quick nav */}
      <div className="services-quicknav">
        <div className="container">
          <div className="sqn-inner">
            {services.map(s => (
              <a key={s.id} href={`#${s.id}`} className="sqn-link">
                <s.Icon size={15} /> {s.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Service detail sections */}
      <div className="services-page">
        <div className="container">
          {services.map((s, i) => (
            <ServiceDetail key={s.id} service={s} reverse={i % 2 !== 0} index={i} />
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <section className="services-bottom-cta">
        <div className="container">
          <div ref={useScrollAnimation(0.1)} className="fade-in sbc-inner">
            <h2>Not sure which service fits your needs?</h2>
            <p>
              Book a free 15-minute call and we'll help you identify the right starting point
              for your organisation.
            </p>
            <div className="sbc-actions">
              <Link to="/contact" className="btn btn-primary">
                <FiCalendar size={15} /> Book a Free Review
              </Link>
              <a href="https://wa.me/233209668822" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                <FaWhatsapp size={16} /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
