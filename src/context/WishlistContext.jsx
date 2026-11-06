import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('mgm_wishlist');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  // Keep wishlist in sync with authentication state
  useEffect(() => {
    if (!isAuthenticated) {
      setWishlist([]);
    } else {
      const saved = localStorage.getItem('mgm_wishlist');
      if (saved) {
        try {
          setWishlist(JSON.parse(saved));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('mgm_wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist, isAuthenticated]);

  const toggleWishlist = (item) => {
    if (!isAuthenticated) return;
    setWishlist(prev => {
      const exists = prev.some(w => w.id === item.id);
      if (exists) {
        return prev.filter(w => w.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  const clearWishlist = () => {
    setWishlist([]);
    localStorage.removeItem('mgm_wishlist');
  };

  const isInWishlist = (id) => wishlist.some(item => item.id === id);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
