import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

export default function MainLayout() {
  // O Header é fixo (fixed top-0) e tem 68px de altura + ondinha.
  // O spacer abaixo garante que o conteúdo não fique escondido sob o header.
  return (
    <>
      <Header />
      <div className="h-[84px]" aria-hidden="true" />
      <Outlet />
    </>
  );
}


// import { Outlet, useLocation } from 'react-router-dom';
// import Header from '../components/layout/Header';

// export default function MainLayout() {
//   const location = useLocation();
//   const isHome = location.pathname === '/';

//   return (
//     <>
//       <Header transparentOnTop={isHome} />
//       <Outlet />
//     </>
//   );
// }