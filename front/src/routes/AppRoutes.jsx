import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Home from '../pages/Home';
import Explorar from '../pages/Explorar';
import Blog from '../pages/Blog';
import Sobre from '../pages/Sobre';
import Novidades from '../pages/Novidades';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="explorar" element={<Explorar />} />
          <Route path="blog" element={<Blog />} />
          <Route path="sobre" element={<Sobre />} />
          <Route path="novidades" element={<Novidades />} />
        </Route>
      </Routes>
    </Router>
  );
}
