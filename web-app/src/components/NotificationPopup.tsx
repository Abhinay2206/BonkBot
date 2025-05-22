import { useEffect, useRef } from 'react';

interface NotificationPopupProps {
  width?: number;
  height?: number;
  colorTheme?: 'light' | 'dark';
}

const NotificationPopup = ({
  width = 400,
  height = 550,
  colorTheme = 'dark'
}: NotificationPopupProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-timeline.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      feedMode: "market",
      market: "crypto",
      isTransparent: true,
      displayMode: "adaptive",
      width,
      height,
      colorTheme : document.documentElement.classList.contains('dark') ? "dark" : "light",
      locale: "en"
    });

    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }

    return () => {
      if (containerRef.current) {
        const scriptElement = containerRef.current.querySelector('script');
        if (scriptElement) {
          scriptElement.remove();
        }
      }
    };
  }, [width, height, colorTheme]);

  return (
    <div className={`notification-popup rounded-lg overflow-hidden shadow-lg ${colorTheme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
      <div ref={containerRef} className="tradingview-widget-container">
        <div className="tradingview-widget-container__widget"></div>
      </div>
    </div>
  );
};

export default NotificationPopup;
