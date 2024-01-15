// PackagesContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config/asyncStorage';
// import { Alert } from 'react-native';

interface Package {
  id: number;
  name: string;
  description: any;
  category: any;
  package_type: string;
  icon: string;
  // Add other fields as needed
}

interface PackagesContextType {
  packages: Package[];
  loading: boolean;
  getPackages: (category?: any, package_type?: any) => Promise<void>;

  favouritePackage: any;
  loadingFavourite: boolean;
  markAsFavourite: (id?: number, is_favourite?: boolean) => Promise<void>;

  packageDetail: any;
  getPackageDetail: (id: number) => Promise<void>;
}

export const PackagesContext = createContext<PackagesContextType>({
  packages: [],
  loading: false,
  getPackages: async () => {}, // Initialize getPackages as an empty function

  favouritePackage: {},
  loadingFavourite: false,
  markAsFavourite: async () => {},

  packageDetail: {},
  getPackageDetail: async () => {}
});

interface PackagesProviderProps {
  children: ReactNode;
}

export const PackagesProvider: React.FC<PackagesProviderProps> = ({ children }) => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(false);

  const [favouritePackage, setPackage] = useState()
  const [loadingFavourite, setLoadingFavourite] = useState(false)

  const [packageDetail, setPackageDetail] = useState()

  const getPackages = async (category?: any, package_type?: any) => {
    try {
      setLoading(true);
      // Modify the URL construction as per your requirements
      const url = `${BASE_URL}/packages/?category=${category}&package_type=${package_type}`;
      const response = await axios.get<Package[]>(url);
      setPackages(response.data);
    } catch (error: any) {
      console.error('Error', error.response);
      // Handle error appropriately, e.g., show an error message
    } finally {
      setLoading(false);
    }
  };

  const getPackageDetail = async (id: number) => {
    try {
      setLoading(true);
      // Modify the URL construction as per your requirements
      const url = `${BASE_URL}/packages/${id}/`;
      const response = await axios.get(url);
      setPackageDetail(response.data);
      console.log("Deets", response.data)
    } catch (error: any) {
      console.error('Error', error.response);
      // Handle error appropriately, e.g., show an error message
    } finally {
      setLoading(false);
    }
  };

  const markAsFavourite = async (id?: number, is_favourite?: boolean) => {
    try {
      setLoadingFavourite(true);
      // Modify the URL construction as per your requirements
      const url = `${BASE_URL}/packages/${id}/`;
      const response = await axios.patch(url, {
        "is_favourite": is_favourite
      });
      setPackage(response.data);
    } catch (error: any) {
      console.error('Error', error.response);
      // Handle error appropriately, e.g., show an error message
    } finally {
      setLoadingFavourite(false);
    }
  }


  const contextValue: PackagesContextType = {
    packages,
    loading,
    getPackages,

    favouritePackage,
    loadingFavourite,
    markAsFavourite,

    packageDetail,
    getPackageDetail
  };

  return (
    <PackagesContext.Provider value={contextValue}>
      {children}
    </PackagesContext.Provider>
  );
};

export const usePackages = () => useContext(PackagesContext);
