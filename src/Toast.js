import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

const Toast = ({ toast, onClose }) => {
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (toast.duration !== Infinity) {
      timeoutRef.current = setTimeout(() => {
        onClose(toast.id);
      }, toast.duration || 5000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [toast.id, toast.duration, onClose]);

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} color="#10b981" />;
      case 'warning':
        return <AlertTriangle size={20} color="#f59e0b" />;
      case 'info':
        return <Info size={20} color="#6366f1" />;
      case 'error':
      default:
        return <AlertCircle size={20} color="#ef4444" />;
    }
  };

  const handleClose = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    onClose(toast.id);
  };

  return (
    <motion.div
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 400, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`toast ${toast.type || 'error'}`}
    >
      <div className="toast-icon">
        {getIcon(toast.type)}
      </div>
      
      <div className="toast-content">
        {toast.title && (
          <div className="toast-title">{toast.title}</div>
        )}
        <div className="toast-message">{toast.message}</div>
      </div>
      
      <button 
        className="toast-close" 
        onClick={handleClose}
        aria-label="Close notification"
      >
        <X size={16} />
      </button>
      
      {toast.duration !== Infinity && (
        <div className="toast-progress" />
      )}
    </motion.div>
  );
};

const ToastContainer = ({ toasts, onClose }) => {
  return (
    <div className="toast-container">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast 
            key={toast.id} 
            toast={toast} 
            onClose={onClose} 
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer; 