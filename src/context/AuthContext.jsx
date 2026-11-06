import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('mgm_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(user));

  useEffect(() => {
    if (user) {
      localStorage.setItem('mgm_user', JSON.stringify(user));
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('mgm_user');
      setIsAuthenticated(false);
    }
  }, [user]);

  const login = (email = 'vallarasu@example.com') => {
    const loggedUser = {
      id: 'usr_78901',
      name: email === 'vallarasu@example.com' ? 'Vallarasu Kumar' : (email.split('@')[0] || 'Valued Guest'),
      firstName: email === 'vallarasu@example.com' ? 'Vallarasu' : (email.split('@')[0] || 'Valued'),
      lastName: email === 'vallarasu@example.com' ? 'Kumar' : 'Member',
      email: email,
      phone: '+91 98765 43210',
      tier: 'MGM Privilege Gold',
      points: 14850,
      memberSince: '2023',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      preferences: {
        roomType: 'Sea Facing Cottage',
        smoking: 'Non-Smoking',
        newspaper: 'The Hindu',
        pillowType: 'Goose Down Feather'
      }
    };
    setUser(loggedUser);
    setIsAuthenticated(true);
    return true;
  };

  const signup = (userData) => {
    const newUser = {
      id: `usr_${Date.now()}`,
      name: `${userData.firstName} ${userData.lastName}`,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone || '+91 90000 00000',
      tier: 'MGM Privilege Silver',
      points: 1000,
      memberSince: '2026',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      preferences: {
        roomType: 'Deluxe',
        smoking: 'Non-Smoking',
        newspaper: 'Times of India',
        pillowType: 'Standard'
      }
    };
    setUser(newUser);
    setIsAuthenticated(true);
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('mgm_user');
    localStorage.removeItem('mgm_wishlist');
  };

  const updateProfile = (updatedFields) => {
    setUser(prev => ({ ...prev, ...updatedFields }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        signup,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
