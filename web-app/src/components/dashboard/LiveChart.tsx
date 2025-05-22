import React, { useEffect, useRef, useState } from 'react';
import { BarChart2 } from 'lucide-react';

const LiveChart: React.FC = () => {
  const symbolInfoContainer = useRef<HTMLDivElement>(null);
  const technicalAnalysisContainer = useRef<HTMLDivElement>(null);

  const [showChartModal, setShowChartModal] = useState(false);
  const chartWidgetContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (symbolInfoContainer.current) {
      const script1 = document.createElement('script');
      script1.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js';
      script1.type = 'text/javascript';
      script1.async = true;
      script1.innerHTML = JSON.stringify({
        "symbol": "BONKUSDT",
        "width": "100%",
        "locale": "en",
        "colorTheme": document.documentElement.classList.contains('dark') ? "dark" : "light",
        "isTransparent": true
      });
      symbolInfoContainer.current.appendChild(script1);
    }

    // Load Technical Analysis Widget
    if (technicalAnalysisContainer.current) {
      const script2 = document.createElement('script');
      script2.src = 'https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js';
      script2.type = 'text/javascript';
      script2.async = true;
      script2.innerHTML = JSON.stringify({
        "interval": "1m",
        "width": "100%",
        "isTransparent": true,
        "height": 450,
        "symbol": "BONKUSDT",
        "showIntervalTabs": true,
        "displayMode": "single",
        "locale": "en",
        "colorTheme": document.documentElement.classList.contains('dark') ? "dark" : "light"
      });
      technicalAnalysisContainer.current.appendChild(script2);
    }

    // Cleanup function
    return () => {
      if (symbolInfoContainer.current) {
        const script = symbolInfoContainer.current.querySelector('script');
        if (script) {
          symbolInfoContainer.current.removeChild(script);
        }
      }
      if (technicalAnalysisContainer.current) {
        const script = technicalAnalysisContainer.current.querySelector('script');
        if (script) {
          technicalAnalysisContainer.current.removeChild(script);
        }
      }
    };
  }, []);

  useEffect(() => {
    if (showChartModal && chartWidgetContainer.current) {
      chartWidgetContainer.current.innerHTML = '';
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
      script.type = 'text/javascript';
      script.async = true;
      script.innerHTML = JSON.stringify({
        "symbol": "BONKUSDT",
        "width": "100%",
        "height": 500,
        "locale": "en",
        "theme": document.documentElement.classList.contains('dark') ? "dark" : "light",
        "style": "1",
        "interval": "30",
        "timezone": "Etc/UTC",
        "allow_symbol_change": false,
        "hide_side_toolbar": false,
        "withdateranges": true,
        "isTransparent": false,
        "container_id": "tradingview_advanced_chart_modal"
      });
      chartWidgetContainer.current.appendChild(script);
    }
    // Cleanup on close
    return () => {
      if (chartWidgetContainer.current) {
        chartWidgetContainer.current.innerHTML = '';
      }
    };
  }, [showChartModal]);

  return (
    <div className="space-y-4 relative">
      {/* Chart Popup Button */}
      <button
        onClick={() => setShowChartModal(true)}
        className="absolute right-4 top-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-all shadow"
        title="Open Live Chart"
      >
        <BarChart2 className="w-4 h-4" />
        <span className="text-sm font-medium">Live Chart</span>
      </button>

      {/* Symbol Info Widget */}
      <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4 shadow-sm">
        <div ref={symbolInfoContainer} className="tradingview-widget-container">
          <div className="tradingview-widget-container__widget"></div>
        </div>
      </div>

      {/* Technical Analysis Widget */}
      <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4 shadow-sm">
        <div ref={technicalAnalysisContainer} className="tradingview-widget-container">
          <div className="tradingview-widget-container__widget"></div>
        </div>
      </div>

      {/* Chart Modal */}
      {showChartModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-0 relative w-full max-w-3xl">
            {/* Close button */}
            <button
              onClick={() => setShowChartModal(false)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              aria-label="Close chart"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" className="text-gray-700 dark:text-gray-200"><line x1="4" y1="4" x2="16" y2="16" stroke="currentColor" strokeWidth="2"/><line x1="16" y1="4" x2="4" y2="16" stroke="currentColor" strokeWidth="2"/></svg>
            </button>
            <div
              ref={chartWidgetContainer}
              id="tradingview_advanced_chart_modal"
              className="tradingview-widget-container"
              style={{ minHeight: 500, minWidth: 300, width: '100%' }}
            >
              <div className="tradingview-widget-container__widget"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveChart;