"use client"; // Ensure this file is treated as a client component

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getAllPosts } from '@/lib/api';

const BooksContext = createContext<any | null>(null);

interface MyProviderProps {
    children: ReactNode; 
}

export const BooksContextProvider: React.FC<MyProviderProps> = ({ children }) => {
    const [contextValue, setContextValue] = useState<any | null>(null); 

    useEffect(() => {
        const fetchData = async () => {
            const allPosts = await getAllPosts(true, 'book');
            console.log("Fetched allPosts:", allPosts); 
            setContextValue(allPosts); 
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