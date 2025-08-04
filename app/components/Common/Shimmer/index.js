import React from 'react';

const ShimmerContainer = ({ height, width }) => {
  return (
    <div className="shimmer-container" style={{ height: `${height}px`, width: width }}>
      <div className="shimmer" />
    </div>
  );
};

export default ShimmerContainer;
