import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import { AuthProvider } from './admin/context/AuthContext';
import { CartProvider } from './context/CartContext';

// Public Pages
import Home from './pages/Home';
import MenServices from './pages/MenServices';
import WomenServices from './pages/WomenServices';
import Gallery from './pages/Gallery';
import Offers from './pages/Offers';
import About from './pages/About';
import Contact from './pages/Contact';
import CartPage from './pages/CartPage';

// Admin Pages
import AdminLayout from './admin/components/Layout';
import AdminLogin from './admin/pages/Login';
import Dashboard from './admin/pages/Dashboard';
import HomeEditor from './admin/pages/HomeEditor';
import AdminMenServices from './admin/pages/MenServices';
import AdminWomenServices from './admin/pages/WomenServices';
import GalleryManager from './admin/pages/GalleryManager';
import ContactEditor from './admin/pages/ContactEditor';
import OffersManager from './admin/pages/OffersManager';
import SlotManager from './admin/pages/SlotManager';
import Settings from './admin/pages/Settings';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingContact from './components/FloatingContact';
import ScrollToTop from './components/ScrollToTop';

const PublicLayout = () => {
  useEffect(() => {
    const trackVisit = async () => {
      // Simple session-based tracking to avoid spamming the database
      if (!sessionStorage.getItem('starzone_visited')) {
        try {
          const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

          // 1. Track general visit
          await fetch(`${API_URL}/analytics/track/visit`, { method: 'POST' });

          // 2. Track Location (City) via IP
          try {
            const geoRes = await fetch('https://ipapi.co/json/');
            const geoData = await geoRes.json();
            if (geoData.city) {
              await fetch(`${API_URL}/analytics/track/city_${geoData.city}`, { method: 'POST' });
            }
          } catch (geoErr) {
            console.warn('Location tracking failed:', geoErr);
          }

          sessionStorage.setItem('starzone_visited', 'true');
        } catch (err) {
          console.error('Visit tracking failed:', err);
        }
      }
    };
    trackVisit();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

function App() {
  return (
    <DataProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <ScrollToTop />
            <Routes>
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="home-editor" element={<HomeEditor />} />
                <Route path="men-services" element={<AdminMenServices />} />
                <Route path="women-services" element={<AdminWomenServices />} />
                <Route path="gallery" element={<GalleryManager />} />
                <Route path="slots" element={<SlotManager />} />
                <Route path="contact" element={<ContactEditor />} />
                <Route path="offers" element={<OffersManager />} />
                <Route path="settings" element={<Settings />} />
              </Route>

              {/* Public Routes */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/men-services" element={<MenServices />} />
                <Route path="/women-services" element={<WomenServices />} />
                <Route path="/offers" element={<Offers />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/cart" element={<CartPage />} />
              </Route>
            </Routes>
          </Router>
        </CartProvider>
      </AuthProvider>
    </DataProvider>
  );
}

export default App;
