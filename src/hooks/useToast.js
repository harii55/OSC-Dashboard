import { useState, useCallback } from 'react';

const useToast = () => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((toast) => {
        const id = Date.now() + Math.random();
        const newToast = {
            id,
            type: 'error',
            duration: 5000,
            ...toast
        };

        setToasts(prev => [...prev, newToast]);

        // Auto remove toast after duration
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, newToast.duration);

        return id;
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    const showError = useCallback((message, title = 'Error', duration = 5000) => {
        return addToast({
            type: 'error',
            title,
            message,
            duration
        });
    }, [addToast]);

    const showSuccess = useCallback((message, title = 'Success', duration = 3000) => {
        return addToast({
            type: 'success',
            title,
            message,
            duration
        });
    }, [addToast]);

    const showWarning = useCallback((message, title = 'Warning', duration = 4000) => {
        return addToast({
            type: 'warning',
            title,
            message,
            duration
        });
    }, [addToast]);

    const showInfo = useCallback((message, title = 'Info', duration = 4000) => {
        return addToast({
            type: 'info',
            title,
            message,
            duration
        });
    }, [addToast]);

    return {
        toasts,
        removeToast,
        showError,
        showSuccess,
        showWarning,
        showInfo
    };
};

export default useToast;
