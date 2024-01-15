// CategoriesContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config/asyncStorage';

interface Category {
  id: number;
  name: string;
  icon: any
  // Add other fields as needed
}

interface CategoriesContextProps {
  categories: Category[];
  loading: boolean;
}

const CategoriesContext = createContext<CategoriesContextProps | undefined>(undefined);

interface CategoriesProviderProps {
  children: ReactNode;
}

export const CategoriesProvider: React.FC<CategoriesProviderProps> = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCategories = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${BASE_URL}/categories/`);
            console.log('Response:', response.data);
            setCategories(response.data);
            setLoading(false)
        } catch (error: any) {
            setLoading(false);
            console.error('Error', error.response);
        // Handle error appropriately, e.g., show an error message
        } 
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories, loading }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = (): CategoriesContextProps => {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error('useCategories must be used within a CategoriesProvider');
  }
  return context;
};
