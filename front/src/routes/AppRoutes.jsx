import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Explorar from '../pages/Explorar';
import Blog from '../pages/Blog';
import Sobre from '../pages/Sobre';
import Novidades from '../pages/Novidades';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Account from '../pages/Account';
import { useAuth } from '../context/AuthContext.jsx';
import PropertyDetails from '../pages/PropertyDetails';

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

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/explorar" element={<Explorar />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/novidades" element={<Novidades />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          {/* NOVO: Painel do usuário */}
          <Route path="/account" element={<RequireAuth><Account /></RequireAuth>} />

          {/* Admin */}
          <Route path="/admin" element={<RequireAdmin><div className="p-6">Selecione uma seção do Admin.</div></RequireAdmin>} />
          <Route path="/admin/properties" element={<RequireAdmin><AdminPropertiesList /></RequireAdmin>} />
          <Route path="/admin/properties/new" element={<RequireAdmin><AdminPropertyForm /></RequireAdmin>} />
          <Route path="/admin/properties/:id" element={<RequireAdmin><AdminPropertyForm /></RequireAdmin>} />
        </Route>
      </Routes>
    </Router>
  );
}

// Lazy-ish local imports to avoid circular issues
import AdminPropertiesList from '../pages/Admin/Properties/List.jsx';
import AdminPropertyForm from '../pages/Admin/Properties/Form.jsx';