// src/theme.ts
import { hs, vs, ms } from './utils/responsive';

// Defina os tipos para melhor autocompletar
type ColorPalette = {
  background: string;
  modalBackground: string;
  selectorBackground: string;
  primary: string;
  secondary: string;
  text: string;
  inputBackground: string;
  border: string;
  danger: string;
  completedText: string;
  urgent: string;
  important: string;
  remember: string;
  'no-urgency': string;
};

type ThemeType = {
  colors: ColorPalette;
  spacing: {
    s: number;
    m: number;
    l: number;
  };
  radii: {
    s: number;
    m: number;
    l: number;
  };
  fontSize: {
    small: number;
    medium: number;
    large: number;
  };
};

// Tema escuro (seu tema atual)
const darkColors: ColorPalette = {
  background: '#0A0A0A',
  modalBackground: '#1F1F1F',
  selectorBackground: '#333333',
  primary: '#00FF88',
  secondary: '#7C3AED',
  text: '#FFFFFF',
  inputBackground: '#1A1A1A',
  border: '#2D2D2D',
  danger: '#FF4654',
  completedText: '#808080',
  urgent: '#FF0000',
  important: '#FFA500',
  remember: '#FFFF00',
  'no-urgency': '#00FF88',
};

// Novo tema claro
const lightColors: ColorPalette = {
  background: '#FFFFFF',
  modalBackground: '#F5F5F5',
  selectorBackground: '#E0E0E0',
  primary: '#007A5A',
  secondary: '#5B21B6',
  text: '#333333',
  inputBackground: '#F0F0F0',
  border: '#CCCCCC',
  danger: '#D32F2F',
  completedText: '#757575',
  urgent: '#D50000',
  important: '#FF6D00',
  remember: '#FFD600',
  'no-urgency': '#00C853',
};

const commonTheme = {
  spacing: {
    s: vs(8),
    m: vs(16),
    l: vs(24),
  },
  radii: {
    s: hs(4),
    m: hs(8),
    l: hs(16),
  },
  fontSize: {
    small: ms(12),
    medium: ms(16),
    large: ms(24),
  },
};

export const darkTheme: ThemeType = {
  colors: darkColors,
  ...commonTheme,
};

export const lightTheme: ThemeType = {
  colors: lightColors,
  ...commonTheme,
};

// Exporte o tema atual e o tipo
export type Theme = ThemeType;
export const theme = darkTheme; // Tema padrão
