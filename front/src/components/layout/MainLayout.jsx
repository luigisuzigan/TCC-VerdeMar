import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-[76px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;