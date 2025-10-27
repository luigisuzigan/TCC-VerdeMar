import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';
import ScrollToTop from '../components/ScrollToTop';
import Home from '../pages/Home';
import Explorar from '../pages/Explorar';
import Sobre from '../pages/Sobre';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Account from '../pages/Account';
import Settings from '../pages/Settings';
import Favorites from '../pages/Favorites';
import { useAuth } from '../context/AuthContext.jsx';
import PropertyDetails from '../pages/PropertyDetails';
import SellerDashboard from '../pages/Seller/Dashboard.jsx';
import SellerPropertiesList from '../pages/Seller/Properties/List.jsx';
import SellerPropertyForm from '../pages/Seller/Properties/Form.jsx';
import AdminDashboard from '../pages/Admin/Dashboard.jsx';
import AdminPropertiesList from '../pages/Admin/Properties/List.jsx';
import AdminPropertyForm from '../pages/Admin/Properties/Form.jsx';
import AdminUsersList from '../pages/Admin/Users/List.jsx';
import AdminSettings from '../pages/Admin/Settings/index.jsx';

// Guards
function RequireAuth({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function RequireAdmin({ children }) {
  const { user, isAdmin } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;
  return children;
}

function RequireSeller({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (!(user.role === 'SELLER' || user.role === 'ADMIN')) return <Navigate to="/" replace />;
  return children;
}

export default function AppRoutes() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/explorar" element={<Explorar />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/account" element={<RequireAuth><Account /></RequireAuth>} />
          <Route path="/settings" element={<RequireAuth><Settings /></RequireAuth>} />
          <Route path="/favorites" element={<RequireAuth><Favorites /></RequireAuth>} />
          <Route path="/seller" element={<RequireSeller><SellerDashboard /></RequireSeller>} />
          <Route path="/seller/properties" element={<RequireSeller><SellerPropertiesList /></RequireSeller>} />
          <Route path="/seller/properties/new" element={<RequireSeller><SellerPropertyForm /></RequireSeller>} />
          <Route path="/seller/properties/:id" element={<RequireSeller><SellerPropertyForm /></RequireSeller>} />
        </Route>

        <Route element={<RequireAdmin><AdminLayout /></RequireAdmin>}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/properties" element={<AdminPropertiesList />} />
          <Route path="/admin/properties/new" element={<AdminPropertyForm />} />
          <Route path="/admin/properties/:id" element={<AdminPropertyForm />} />
          <Route path="/admin/users" element={<AdminUsersList />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </Router>
  );
}
