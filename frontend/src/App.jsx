import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import { AuthProvider } from './admin/context/AuthContext';

// Public Pages
import Home from './pages/Home';
import MenServices from './pages/MenServices';
import WomenServices from './pages/WomenServices';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Contact from './pages/Contact';

// Admin Pages
import AdminLayout from './admin/components/Layout';
import AdminLogin from './admin/pages/Login';
import Dashboard from './admin/pages/Dashboard';
import HomeEditor from './admin/pages/HomeEditor';
import AdminMenServices from './admin/pages/MenServices';
import AdminWomenServices from './admin/pages/WomenServices';
import GalleryManager from './admin/pages/GalleryManager';
import ContactEditor from './admin/pages/ContactEditor';
import Settings from './admin/pages/Settings';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';

const PublicLayout = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
    <WhatsAppButton />
  </div>
);

function App() {
  return (
    <DataProvider>
      <AuthProvider>
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
              <Route path="contact" element={<ContactEditor />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/men-services" element={<MenServices />} />
              <Route path="/women-services" element={<WomenServices />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </DataProvider>
  );
}

export default App;
