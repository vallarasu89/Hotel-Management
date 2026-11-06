import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { HeroSkeleton } from '../components/skeletons';
import Home from '../pages/Home/Home';

// Lazy Loaded Pages for Code Splitting & Performance
const About = lazy(() => import('../pages/About/About'));
const Hotels = lazy(() => import('../pages/Hotels/Hotels'));
const HotelDetails = lazy(() => import('../pages/HotelDetails/HotelDetails'));
const Rooms = lazy(() => import('../pages/Rooms/Rooms'));
const RoomDetails = lazy(() => import('../pages/Rooms/RoomDetails'));
const Booking = lazy(() => import('../pages/Booking/Booking'));
const Checkout = lazy(() => import('../pages/Checkout/Checkout'));
const Confirmation = lazy(() => import('../pages/Checkout/Confirmation'));
const Offers = lazy(() => import('../pages/Offers/Offers'));
const Experiences = lazy(() => import('../pages/Experiences/Experiences'));
const Gallery = lazy(() => import('../pages/Gallery/Gallery'));
const Blog = lazy(() => import('../pages/Blog/Blog'));
const BlogDetails = lazy(() => import('../pages/Blog/BlogDetails'));
const Contact = lazy(() => import('../pages/Contact/Contact'));
const Login = lazy(() => import('../pages/Auth/Login'));
const Signup = lazy(() => import('../pages/Auth/Signup'));
const Account = lazy(() => import('../pages/Account/Account'));
const MyBookings = lazy(() => import('../pages/Account/MyBookings'));
const Wishlist = lazy(() => import('../pages/Account/Wishlist'));
const FAQ = lazy(() => import('../pages/FAQ/FAQ'));
const Privacy = lazy(() => import('../pages/Legal/Privacy'));
const Terms = lazy(() => import('../pages/Legal/Terms'));

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route
          path="about"
          element={
            <Suspense fallback={<HeroSkeleton />}>
              <About />
            </Suspense>
          }
        />
        <Route
          path="hotels"
          element={
            <Suspense fallback={<HeroSkeleton />}>
              <Hotels />
            </Suspense>
          }
        />
        <Route
          path="hotels/:id"
          element={
            <Suspense fallback={<HeroSkeleton />}>
              <HotelDetails />
            </Suspense>
          }
        />
        <Route
          path="rooms"
          element={
            <Suspense fallback={<HeroSkeleton />}>
              <Rooms />
            </Suspense>
          }
        />
        <Route
          path="rooms/:id"
          element={
            <Suspense fallback={<HeroSkeleton />}>
              <RoomDetails />
            </Suspense>
          }
        />
        <Route
          path="booking"
          element={
            <Suspense fallback={<HeroSkeleton />}>
              <Booking />
            </Suspense>
          }
        />
        <Route
          path="checkout"
          element={
            <Suspense fallback={<HeroSkeleton />}>
              <Checkout />
            </Suspense>
          }
        />
        <Route
          path="confirmation"
          element={
            <Suspense fallback={<HeroSkeleton />}>
              <Confirmation />
            </Suspense>
          }
        />
        <Route
          path="offers"
          element={
            <Suspense fallback={<HeroSkeleton />}>
              <Offers />
            </Suspense>
          }
        />
        <Route
          path="experiences"
          element={
            <Suspense fallback={<HeroSkeleton />}>
              <Experiences />
            </Suspense>
          }
        />
        <Route
          path="gallery"
          element={
            <Suspense fallback={<HeroSkeleton />}>
              <Gallery />
            </Suspense>
          }
        />
        <Route
          path="blog"
          element={
            <Suspense fallback={<HeroSkeleton />}>
              <Blog />
            </Suspense>
          }
        />
        <Route
          path="blog/:id"
          element={
            <Suspense fallback={<HeroSkeleton />}>
              <BlogDetails />
            </Suspense>
          }
        />
        <Route
          path="contact"
          element={
            <Suspense fallback={<HeroSkeleton />}>
              <Contact />
            </Suspense>
          }
        />
        <Route
          path="login"
          element={
            <Suspense fallback={<HeroSkeleton />}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="signup"
          element={
            <Suspense fallback={<HeroSkeleton />}>
              <Signup />
            </Suspense>
          }
        />
        <Route
          path="account"
          element={
            <Suspense fallback={<HeroSkeleton />}>
              <Account />
            </Suspense>
          }
        />
        <Route
          path="account/bookings"
          element={
            <Suspense fallback={<HeroSkeleton />}>
              <MyBookings />
            </Suspense>
          }
        />
        <Route
          path="account/wishlist"
          element={
            <Suspense fallback={<HeroSkeleton />}>
              <Wishlist />
            </Suspense>
          }
        />
        <Route
          path="faq"
          element={
            <Suspense fallback={<HeroSkeleton />}>
              <FAQ />
            </Suspense>
          }
        />
        <Route
          path="privacy"
          element={
            <Suspense fallback={<HeroSkeleton />}>
              <Privacy />
            </Suspense>
          }
        />
        <Route
          path="terms"
          element={
            <Suspense fallback={<HeroSkeleton />}>
              <Terms />
            </Suspense>
          }
        />
        {/* Fallback */}
        <Route
          path="*"
          element={
            <Suspense fallback={<HeroSkeleton />}>
              <Home />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
