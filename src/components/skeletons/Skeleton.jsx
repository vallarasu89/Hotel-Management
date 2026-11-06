import React from 'react';
import '../../styles/Skeleton.css';

export const Skeleton = ({
  className = '',
  width,
  height,
  circle = false,
  dark = false,
  style = {}
}) => {
  const customStyles = {
    ...style,
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
    ...(circle ? { borderRadius: '9999px' } : {})
  };

  return (
    <div
      className={`mgm-skeleton-base ${circle ? 'rounded-full' : 'rounded-md'} ${
        dark ? 'mgm-skeleton-dark' : ''
      } ${className}`}
      style={customStyles}
      aria-hidden="true"
    />
  );
};

export default Skeleton;

