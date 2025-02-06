// src/context/ThemeContext.js
import React, { createContext, useState, useContext } from 'react';

// สร้าง context สำหรับธีม
const ThemeContext = createContext();

// สร้าง provider สำหรับ ThemeContext
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // กำหนดค่าเริ่มต้นเป็น light

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// ฟังก์ชัน hook สำหรับดึงค่าธีม
export const useTheme = () => useContext(ThemeContext);
