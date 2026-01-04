
import React from 'react';
import ReactMarkdown from 'react-markdown';
import WeatherWidget from './WeatherWidget';
import { WeatherData } from '../types';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  // Regex for finding :::weather {JSON} :::
  const weatherRegex = /:::weather\s*({.*?})\s*:::/gs;
  
  const parts = content.split(weatherRegex);
  const matches = content.match(weatherRegex);

  if (!matches) {
    return (
      <div className="prose prose-slate max-w-none text-[16px] leading-relaxed">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {parts.map((part, index) => {
        // Try to parse part as JSON if it looks like it was captured
        try {
          const data: WeatherData = JSON.parse(part);
          if (data && data.city) {
            return <WeatherWidget key={index} data={data} />;
          }
        } catch (e) {
          // Not JSON, render as Markdown
        }
        
        return part.trim() ? (
          <div key={index} className="prose prose-slate max-w-none text-[16px] leading-relaxed">
            <ReactMarkdown>{part}</ReactMarkdown>
          </div>
        ) : null;
      })}
    </div>
  );
};

export default MarkdownRenderer;
