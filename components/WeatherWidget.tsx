
import React from 'react';
import { Sun, Cloud, CloudRain, Snowflake, CloudLightning } from 'lucide-react';
import { WeatherData } from '../types';

interface WeatherWidgetProps {
  data: WeatherData;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ data }) => {
  const getStyles = () => {
    switch (data.condition) {
      case 'Sunny':
        return {
          bg: 'bg-gradient-to-br from-[#4facfe] to-[#00f2fe]',
          icon: <Sun size={32} className="text-white fill-current" />,
          particles: 'sunny'
        };
      case 'Snowy':
        return {
          bg: 'bg-gradient-to-br from-[#83a4d4] to-[#b6fbff]',
          icon: <Snowflake size={32} className="text-white" />,
          particles: 'snowy'
        };
      case 'Rainy':
        return {
          bg: 'bg-gradient-to-br from-[#485563] to-[#29323c]',
          icon: <CloudRain size={32} className="text-white" />,
          particles: 'rainy'
        };
      case 'Stormy':
        return {
          bg: 'bg-gradient-to-br from-[#1e3c72] to-[#2a5298]',
          icon: <CloudLightning size={32} className="text-white" />,
          particles: 'stormy'
        };
      default:
        return {
          bg: 'bg-gradient-to-br from-[#bdc3c7] to-[#2c3e50]',
          icon: <Cloud size={32} className="text-white" />,
          particles: ''
        };
    }
  };

  const styles = getStyles();

  return (
    <div className={`my-4 p-6 rounded-[24px] text-white shadow-xl ${styles.bg} overflow-hidden relative group transition-transform hover:scale-[1.02]`}>
      {/* Background Particles Decoration */}
      <div className="absolute top-0 right-0 p-4 opacity-20 transform translate-x-4 -translate-y-4">
        {styles.icon}
      </div>
      
      <div className="relative z-10 flex justify-between items-end">
        <div className="space-y-1">
          <p className="text-sm font-medium opacity-80 uppercase tracking-wider">{data.condition}</p>
          <h3 className="text-3xl font-bold tracking-tight">{data.city}</h3>
          <div className="flex space-x-4 pt-2">
            {data.humidity !== undefined && (
              <div className="text-xs">
                <span className="opacity-60 block">Humidity</span>
                <span className="font-semibold">{data.humidity}%</span>
              </div>
            )}
            {data.windSpeed !== undefined && (
              <div className="text-xs">
                <span className="opacity-60 block">Wind</span>
                <span className="font-semibold">{data.windSpeed} km/h</span>
              </div>
            )}
          </div>
        </div>
        <div className="text-right">
          <div className="text-6xl font-thin tracking-tighter">{data.temp}°</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
