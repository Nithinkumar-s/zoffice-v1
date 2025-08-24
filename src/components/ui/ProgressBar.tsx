import React from 'react';

interface ProgressBarProps {
  loading: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ loading }) => {
  if (!loading) return null;
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '4px',
      background: 'linear-gradient(90deg, #3B82F6 0%, #06B6D4 100%)',
      zIndex: 9999,
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '50%',
        background: 'rgba(255,255,255,0.7)',
        border: '2px solid #06B6D4',
        animation: 'progressBarShimmer 1.2s linear infinite',
        willChange: 'transform, opacity',
      }} />
    </div>
  );
};

export default ProgressBar;

// Add this to your global CSS:
// @keyframes progressBarAnim {
//   0% { opacity: 0.6; }
//   50% { opacity: 1; }
//   100% { opacity: 0.6; }
// }
