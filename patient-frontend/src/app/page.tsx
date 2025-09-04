'use client';

import { useState } from 'react';
import { PatientForm } from '@/components/patient-form';
import { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose } from '@/components/ui/toast';

export default function Home() {
  const [toasts, setToasts] = useState<Array<{ id: string; title: string; description: string; variant: 'default' | 'destructive' }>>([]);

  const addToast = (title: string, description: string, variant: 'default' | 'destructive' = 'default') => {
    const id = Math.random().toString(36).substring(7);
    setToasts(prev => [...prev, { id, title, description, variant }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 5000);
  };

  const handleSuccess = (message: string) => {
    addToast('Success', message, 'default');
  };

  const handleError = (message: string) => {
    addToast('Error', message, 'destructive');
  };

  return (
    <ToastProvider>
      <main className="min-h-screen bg-background p-8">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Patient Management System
            </h1>
            <p className="text-xl text-muted-foreground">
              Register new patients in the healthcare system
            </p>
          </div>
          
          <div className="flex justify-center">
            <PatientForm onSuccess={handleSuccess} onError={handleError} />
          </div>
        </div>
      </main>

      {toasts.map((toast) => (
        <Toast key={toast.id} variant={toast.variant}>
          <div className="grid gap-1">
            <ToastTitle>{toast.title}</ToastTitle>
            <ToastDescription>{toast.description}</ToastDescription>
          </div>
          <ToastClose />
        </Toast>
      ))}
      
      <ToastViewport />
    </ToastProvider>
  );
}
