import { onCLS, onFID, onFCP, onLCP, onTTFB } from 'web-vitals'
const reportWebVitals = (onPerfEntry: (data: Record<string, any>) => void) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    onCLS(onPerfEntry);
    onFID(onPerfEntry);
    onFCP(onPerfEntry);
    onLCP(onPerfEntry);
    onTTFB(onPerfEntry);
  };
};
export default reportWebVitals;
