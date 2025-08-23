import React from 'react';

interface TwoColumnProps {
  left: React.ReactNode;
  right: React.ReactNode;
  gap?: number | string;
  className?: string;
  align?: 'start' | 'center' | 'stretch';
}

const TwoColumn: React.FC<TwoColumnProps> = ({ left, right, gap = '3rem', className = '', align = 'start' }) => {
  return (
    <div
      className={`two-col-layout ${className}`}
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0,1fr) 400px',
        gap,
        alignItems: align,
        width: '100%'
      }}
    >
      <div className="two-col-left">{left}</div>
      <div className="two-col-right">{right}</div>
    </div>
  );
};

export default TwoColumn;
