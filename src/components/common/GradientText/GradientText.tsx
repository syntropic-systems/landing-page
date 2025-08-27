import React from 'react';
import styles from './GradientText.module.css';

interface GradientTextProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  className?: string;
}

export const GradientText: React.FC<GradientTextProps> = ({
  children,
  as: Component = 'span',
  className = ''
}) => {
  return (
    <Component className={`${styles.highlightedText} ${className}`}>
      {children}
    </Component>
  );
};
