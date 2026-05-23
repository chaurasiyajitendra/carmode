import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router";
import PremiumLoader from "../components/loaders/PremiumLoader";
import ProtectedRoute from "../components/auth/ProtectedRoute";

// Lazy-loaded pages
const Landing = lazy(() => import("../pages/Landing"));
const Vehicles = lazy(() => import("../pages/Vehicles"));
const VehicleDetails = lazy(() => import("../pages/VehicleDetails"));
const CustomizationStudio = lazy(() => import("../pages/CustomizationStudio"));
const Garage = lazy(() => import("../pages/Garage"));
const Compare = lazy(() => import("../pages/Compare"));
const Favorites = lazy(() => import("../pages/Favorites"));
const SearchResults = lazy(() => import("../pages/SearchResults"));
const About = lazy(() => import("../pages/About"));
const Contact = lazy(() => import("../pages/Contact"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Login = lazy(() => import("../pages/Login/Login"));
const Register = lazy(() => import("../pages/Register/Register"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<PremiumLoader />}>
      <Routes>
        <Route path="/" element={<Landing />} />
        
        {/* Support lower/uppercase variations and redirect routes gracefully */}
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/Vehicles" element={<Navigate to="/vehicles" replace />} />
        
        <Route path="/single/:id" element={<VehicleDetails />} />
        
        {/* Customization Cockpit Studio */}
        <Route path="/customize" element={<CustomizationStudio />} />
        <Route path="/customize/:id" element={<CustomizationStudio />} />
        <Route path="/CUSTOMIZE/:id" element={<Navigate to="/customize/:id" replace />} />
        
        {/* User virtual garage fleet */}
        <Route path="/garage" element={<ProtectedRoute><Garage /></ProtectedRoute>} />
        <Route path="/GARAGE" element={<Navigate to="/garage" replace />} />
        
        {/* Specs comparative board */}
        <Route path="/compare" element={<ProtectedRoute><Compare /></ProtectedRoute>} />
        <Route path="/COMPARE" element={<Navigate to="/compare" replace />} />

        {/* Auth portals */}
        <Route path="/login" element={<Login />} />
        <Route path="/LOGIN" element={<Navigate to="/login" replace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/REGISTER" element={<Navigate to="/register" replace />} />

        {/* Favorites and Search standalone pages */}
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/FAVORITES" element={<Navigate to="/favorites" replace />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/SEARCH" element={<Navigate to="/search" replace />} />
        
        {/* Brand & Storytelling */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Support uppercase navigation drawer redirects */}
        <Route path="/HOME" element={<Navigate to="/" replace />} />
        <Route path="/ABOUT" element={<Navigate to="/about" replace />} />
        <Route path="/CONTACT" element={<Navigate to="/contact" replace />} />
        
        {/* Catch-all warnings */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;


