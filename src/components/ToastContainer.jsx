import React from "react";

const Toast = ({ toast, onClose }) => {
  const getIcon = (type) => {
    switch (type) {
      case "success":
        return "✅";
      case "warning":
        return "⚠️";
      case "info":
        return "ℹ️";
      case "error":
      default:
        return "❌";
    }
  };

  return (
    <div className={`toast ${toast.type || "error"}`}>
      <div className="toast-content">
        <div className="toast-header">
          <span className="toast-icon">{getIcon(toast.type)}</span>
          <span className="toast-title">{toast.title}</span>
          <button className="toast-close" onClick={() => onClose(toast.id)}>
            ✕
          </button>
        </div>
        <div className="toast-message">{toast.message}</div>
      </div>
    </div>
  );
};

const ToastContainer = ({ toasts, onClose }) => {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onClose={onClose} />
      ))}
    </div>
  );
};

export default ToastContainer;
