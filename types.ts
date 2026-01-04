
export type MessageRole = 'user' | 'assistant';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  modelId: string;
  createdAt: number;
}

export interface WeatherData {
  city: string;
  temp: number;
  condition: 'Sunny' | 'Cloudy' | 'Rainy' | 'Snowy' | 'Stormy';
  humidity?: number;
  windSpeed?: number;
}

export interface AIModel {
  id: string;
  name: string;
  description: string;
}
