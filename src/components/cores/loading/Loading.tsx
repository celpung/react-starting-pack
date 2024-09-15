// src/components/LoadingSpinner.tsx
import React from 'react';
import './style/loading.props.css';

interface LoadingProps {
  size?: number;
  color?: string;
}

const Loading: React.FC<LoadingProps> = ({ size = 60 }) => (
  <div className="spinner-container">
    <div
      className="spinner"
      style={{
        width: size,
        height: size,
        borderWidth: size / 8,
        // borderTopColor: color,
      }}
    ></div>
  </div>
);

export default Loading;
