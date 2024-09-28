// src/components/ui/Toast.tsx
import React from 'react';

interface ToastProps {
  title: string;
  description?: string;
  variant?: 'success' | 'error';
}

const Toast: React.FC<ToastProps> = ({ title, description, variant }) => {
  const backgroundColor = variant === 'success' ? 'bg-green-600' : 'bg-red-600';

  return (
    <div className={`fixed top-4 right-4 w-80 p-4 text-white rounded-lg shadow-lg ${backgroundColor}`}>
      <h3 className="font-bold">{title}</h3>
      {description && <p>{description}</p>}
    </div>
  );
};

export default Toast;
