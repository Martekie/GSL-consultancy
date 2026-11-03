import { Link } from 'react-router-dom'
import { FiMapPin, FiPhone, FiMessageSquare } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand column */}
          <div className="footer-brand">
            <strong>GSL Consultancy</strong>
            <p>
              Smarter Systems. Stronger Controls. Greater Value.<br />
              Accra, Ghana
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4>Get in Touch</h4>
            <ul className="footer-contact-list">
              <li><FiMapPin size={13} style={{ marginRight: 6, verticalAlign: 'middle' }} /> Accra, Ghana</li>
              <li>
                <FiPhone size={13} style={{ marginRight: 6, verticalAlign: 'middle' }} />
                <a href="tel:+233243175277">024 317 5277</a>
              </li>
              <li>
                <FaWhatsapp size={13} style={{ marginRight: 6, verticalAlign: 'middle' }} />
                <a href="https://wa.me/233209668822" target="_blank" rel="noopener noreferrer">
                  WhatsApp: 020 966 8822
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {year} GSL Consultancy. All rights reserved. Services are subject to agreed scope and applicable professional and regulatory requirements.</p>
          <div className="footer-social">
            <a href="https://wa.me/233209668822" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <FaWhatsapp size={18} />
            </a>
            <a href="tel:+233243175277" aria-label="Call us">
              <FiPhone size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
