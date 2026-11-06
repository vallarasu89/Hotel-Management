import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import SmoothScroll from '../components/layout/SmoothScroll';

export const MainLayout = () => {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <SmoothScroll>
      <div className="flex flex-col min-h-screen bg-[#F2F5F9] text-[#20262D] overflow-x-hidden w-full">
        <Header />
        <main className="flex-1 w-full overflow-x-hidden">
          <Outlet />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
};

export default MainLayout;

