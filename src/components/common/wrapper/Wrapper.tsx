"use client";

import React from "react";

interface WrapperProps {
  children: React.ReactNode;
  styles?: React.CSSProperties
}

function Wrapper({ children, styles }: WrapperProps) {
  return (
    <div
      style={{
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        color: 'white',
        ...styles
      }}
    >
      {children}
    </div>
  );
}

export default Wrapper;
