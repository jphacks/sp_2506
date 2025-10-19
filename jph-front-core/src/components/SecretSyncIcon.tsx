import React from 'react';
import iconPng from '../assets/icon.png';

interface SecretSyncIconProps {
  className?: string;
  size?: number;
}

const SecretSyncIcon: React.FC<SecretSyncIconProps> = ({ 
  className = "", 
  size = 24 
}) => {
  return (
    <img
      src={iconPng}
      alt="Secret Sync Icon"
      width={size}
      height={size}
      className={className}
      style={{
        objectFit: 'contain',
        display: 'block'
      }}
    />
  );
};

export default SecretSyncIcon;
