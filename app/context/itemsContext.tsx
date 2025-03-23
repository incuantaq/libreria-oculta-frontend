"use client"; // Ensure this file is treated as a client component

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

const BooksContext = createContext<any | null>(null);

interface MyProviderProps {
    children: ReactNode; 
}

export const BooksContextProvider: React.FC<MyProviderProps> = ({ children }) => {
    const [contextValue, setContextValue] = useState<any | null>(null); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/books');
                const data = await response.json();
                console.log("Fetched books:", data);
                setContextValue(data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchData();
    }, []); 

    return (
        <BooksContext.Provider value={contextValue}>
            {children}
        </BooksContext.Provider>
    );
};

export const useBooksContext = (): any | null => {
    return useContext(BooksContext); 
};