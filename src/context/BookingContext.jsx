import React, { createContext, useContext, useState, useEffect } from 'react';
import { calculateNights } from '../utils/formatters';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  // Tomorrow and 3 days later as default dates
  const today = new Date();
  const defaultCheckIn = new Date(today);
  defaultCheckIn.setDate(today.getDate() + 1);
  const defaultCheckOut = new Date(today);
  defaultCheckOut.setDate(today.getDate() + 3);

  const formatDateInput = (date) => date.toISOString().split('T')[0];

  const [searchParams, setSearchParams] = useState({
    destination: 'Chennai',
    checkIn: formatDateInput(defaultCheckIn),
    checkOut: formatDateInput(defaultCheckOut),
    adults: 2,
    children: 0,
    rooms: 1,
    promoCode: ''
  });

  const [currentBooking, setCurrentBooking] = useState({
    hotel: null,
    room: null,
    mealPlan: { id: 'cp', name: 'Bed & Breakfast', priceAddition: 950 },
    extraBed: false,
    specialRequests: '',
    guestInfo: {
      title: 'Mr',
      firstName: 'Vallarasu',
      lastName: 'Kumar',
      email: 'vallarasu@example.com',
      phone: '+91 98765 43210',
      address: 'Anna Nagar, Chennai'
    },
    appliedCoupon: null,
    discountAmount: 0,
    paymentMethod: 'card'
  });

  // Simulated existing bookings list
  const [bookingsList, setBookingsList] = useState(() => {
    const saved = localStorage.getItem('mgm_bookings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [
      {
        id: 'MGM-BK-8921',
        hotelId: 'mgm-beach-resort',
        hotelName: 'MGM Beach Resorts, Chennai',
        roomName: 'Suite Carina Oceanfront',
        checkIn: '2026-04-10',
        checkOut: '2026-04-13',
        nights: 3,
        guests: '2 Adults, 0 Children',
        rooms: 1,
        totalAmount: 42000,
        status: 'Confirmed',
        createdAt: '2026-02-15',
        paymentStatus: 'Paid Online',
        image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'MGM-BK-7412',
        hotelId: 'mgm-grand-bangalore',
        hotelName: 'MGM Grand Palace, Bengaluru',
        roomName: 'Royal Executive Deluxe',
        checkIn: '2025-11-20',
        checkOut: '2025-11-22',
        nights: 2,
        guests: '1 Adult',
        rooms: 1,
        totalAmount: 21950,
        status: 'Completed',
        createdAt: '2025-11-05',
        paymentStatus: 'Paid Online',
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('mgm_bookings', JSON.stringify(bookingsList));
  }, [bookingsList]);

  // Pricing calculations
  const calculateBookingTotal = (room = currentBooking.room, options = {}) => {
    if (!room) return { base: 0, mealAddition: 0, extraBedAddition: 0, tax: 0, discount: 0, grandTotal: 0 };
    
    const nights = calculateNights(searchParams.checkIn, searchParams.checkOut);
    const roomsCount = searchParams.rooms || 1;
    const base = room.pricePerNight * nights * roomsCount;
    
    const mealPrice = options.mealPlan ? options.mealPlan.priceAddition : (currentBooking.mealPlan?.priceAddition || 0);
    const mealAddition = mealPrice * (searchParams.adults || 2) * nights;

    const extraBedPrice = (options.extraBed ?? currentBooking.extraBed) ? (room.extraBedPrice || 1500) * nights : 0;

    const subtotal = base + mealAddition + extraBedPrice;
    
    let discount = 0;
    const coupon = options.appliedCoupon || currentBooking.appliedCoupon;
    if (coupon) {
      if (coupon.code === 'MGMROYAL25') discount = subtotal * 0.25;
      else if (coupon.code === 'HONEYMOON30') discount = subtotal * 0.30;
      else if (coupon.code === 'EARLYBIRD20') discount = subtotal * 0.20;
      else discount = subtotal * 0.10;
    }

    const discountedSubtotal = Math.max(0, subtotal - discount);
    const tax = Math.round(discountedSubtotal * 0.12); // 12% GST
    const grandTotal = discountedSubtotal + tax;

    return {
      nights,
      roomsCount,
      base,
      mealAddition,
      extraBedPrice,
      subtotal,
      discount,
      tax,
      grandTotal
    };
  };

  const applyCouponCode = (code) => {
    const clean = code.trim().toUpperCase();
    const validCodes = {
      'MGMROYAL25': { code: 'MGMROYAL25', rate: 0.25, label: '25% Luxury Getaway Discount' },
      'HONEYMOON30': { code: 'HONEYMOON30', rate: 0.30, label: '30% Romantic Bliss Discount' },
      'EARLYBIRD20': { code: 'EARLYBIRD20', rate: 0.20, label: '20% Early Bird Discount' },
      'SUMMER15': { code: 'SUMMER15', rate: 0.15, label: '15% Summer Special' }
    };

    if (validCodes[clean]) {
      setCurrentBooking(prev => ({ ...prev, appliedCoupon: validCodes[clean] }));
      return { success: true, message: `Coupon ${clean} applied successfully!` };
    }
    return { success: false, message: 'Invalid or expired coupon code. Try MGMROYAL25 or EARLYBIRD20' };
  };

  const removeCouponCode = () => {
    setCurrentBooking(prev => ({ ...prev, appliedCoupon: null }));
  };

  const addConfirmedBooking = (bookingData) => {
    const newBooking = {
      ...bookingData,
      id: `MGM-BK-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'Confirmed'
    };
    setBookingsList(prev => [newBooking, ...prev]);
    return newBooking;
  };

  const cancelBooking = (id) => {
    setBookingsList(prev =>
      prev.map(b => (b.id === id ? { ...b, status: 'Cancelled' } : b))
    );
  };

  return (
    <BookingContext.Provider
      value={{
        searchParams,
        setSearchParams,
        currentBooking,
        setCurrentBooking,
        bookingsList,
        calculateBookingTotal,
        applyCouponCode,
        removeCouponCode,
        addConfirmedBooking,
        cancelBooking
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

