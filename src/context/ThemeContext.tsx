import React from 'react';
import type { ThemeContextProps } from '../types';

const ThemeContext = React.createContext<ThemeContextProps>({
  theme: 'light',
  toggleTheme: () => {},
});

export default ThemeContext;