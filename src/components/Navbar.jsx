import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { HiMenu, HiX } from 'react-icons/hi'
import { FiCalendar } from 'react-icons/fi'
import { useModal } from './ModalContext'

export default function Navbar() {
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { openModal }         = useModal()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setOpen(false)

  const handleBook = () => { close(); openModal() }

  return (
    <>
      <div className="topbar">
        <div className="container topbar-inner">
          <span>Accounting · Audit · Systems · Tax Advisory</span>
          <span>Accra, Ghana &nbsp;|&nbsp; <a href="tel:+233243175277">Call 024 317 5277</a></span>
        </div>
      </div>

      <header className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="container nav-inner">
          <Link className="brand" to="/" onClick={close}>
            <span className="brand-mark">GSL</span>
            <span className="brand-text">
              <strong>GSL Consultancy</strong>
              <small>Finance · Controls · Systems</small>
            </span>
          </Link>

          <button className="nav-toggle" aria-label="Toggle navigation" aria-expanded={open}
            onClick={() => setOpen(o => !o)}>
            {open ? <HiX size={20} /> : <HiMenu size={20} />}
          </button>

          <nav>
            <ul className={`nav-links${open ? ' open' : ''}`}>
              <li><NavLink to="/"        end onClick={close}>Home</NavLink></li>
              <li><NavLink to="/services"    onClick={close}>Services</NavLink></li>
              <li><NavLink to="/about"       onClick={close}>About Us</NavLink></li>
              <li><NavLink to="/contact"     onClick={close}>Contact</NavLink></li>
              <li className="nav-cta">
                <button className="btn btn-primary" onClick={handleBook}>
                  <FiCalendar size={15} /> Book a Review
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  )
}
