import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/layout/Header/Header";

export default function MainLayout() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!isAuthPage && (
        <>
          <Header transparentOnTop={isHome} />
          {/* Evita empurrar o hero para baixo quando estamos na home com header transparente */}
          {!isHome && <div className="h-[84px]" aria-hidden="true" />}
        </>
      )}
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
