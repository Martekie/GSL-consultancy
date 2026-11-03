import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Services from './pages/Services'
import About from './pages/About'
import Contact from './pages/Contact'
import ScrollToTop from './components/ScrollToTop'
import BookingModal from './components/BookingModal'
import { ModalProvider, useModal } from './components/ModalContext'
import './App.css'
import './components/BookingModal.css'

function AppInner() {
  const { open, closeModal } = useModal()
  return (
    <div className="app-root">
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/"         element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about"    element={<About />} />
          <Route path="/contact"  element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      <BookingModal open={open} onClose={closeModal} />
    </div>
  )
}

export default function App() {
  return (
    <ModalProvider>
      <AppInner />
    </ModalProvider>
  )
}
