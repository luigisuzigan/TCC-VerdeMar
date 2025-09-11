import { Outlet } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="pt-[76px] flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}