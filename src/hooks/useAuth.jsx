
import { useState, createContext, useContext } from 'react';
import { useToast } from '@/hooks/use-toast';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { toast } = useToast();

  const login = async (email, password, role) => {
    // Mock login - replace with actual API call
    if (email === 'patient@demo.com' && password === 'password123') {
      setUser({ id: '1', name: 'John Doe', email, role: 'patient' });
    } else if (email === 'caretaker@demo.com' && password === 'password123') {
      setUser({ id: '2', name: 'Jane Smith', email, role: 'caretaker' });
    } else {
      toast({
        title: "Login failed",
        description: "Invalid credentials",
        variant: "destructive"
      });
      throw new Error('Invalid credentials');
    }
  };

  const signup = async (name, email, password, role) => {
    // Mock signup - replace with actual API call
    const id = Math.random().toString();
    setUser({ id, name, email, role });
    toast({
      title: "Account created",
      description: "Welcome to DoseBuddy!",
    });
  };

  const logout = () => {
    setUser(null);
    toast({
      title: "Logged out",
      description: "See you next time!",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
