
import { AIModel } from './types';

export const ACCESS_CODE = 'BBB666';

export const AVAILABLE_MODELS: AIModel[] = [
  {
    id: 'gemini-3-flash-preview',
    name: 'GPT-OSS 120B',
    description: 'Best for general reasoning & chat'
  },
  {
    id: 'gemini-3-pro-preview',
    name: 'Groq Compound',
    description: 'Advanced reasoning & tools'
  },
  {
    id: 'gemini-2.5-flash-lite-latest',
    name: 'Llama 3.3 70B',
    description: 'Fast & Versatile'
  }
];

export const APP_CONFIG = {
  accentColor: '#007AFF',
  secondaryBg: '#F5F5F7',
  sidebarBg: '#F9F9F9',
  textColor: '#1D1D1F',
};
