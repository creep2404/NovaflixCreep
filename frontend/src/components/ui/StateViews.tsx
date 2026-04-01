import React from 'react';
import { AlertCircle, FileQuestion, RefreshCw } from 'lucide-react';

interface StateProps {
  title: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const ErrorState: React.FC<StateProps> = ({ title, message, action }) => (
  <div className="flex flex-col items-center justify-center p-12 text-center h-full min-h-[400px] animate-in fade-in duration-500">
    <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
      <AlertCircle className="text-red-500" size={32} />
    </div>
    <h3 className="text-2xl font-headline font-bold text-on-surface mb-2">{title}</h3>
    <p className="text-on-surface-variant max-w-md mb-8">{message}</p>
    {action && (
      <button 
        onClick={action.onClick}
        className="flex items-center gap-2 px-6 py-3 bg-surface-container-high hover:bg-surface-container-highest transition-colors rounded-full text-sm font-bold text-on-surface"
      >
        <RefreshCw size={16} />
        {action.label}
      </button>
    )}
  </div>
);

export const EmptyState: React.FC<StateProps> = ({ title, message, action }) => (
  <div className="flex flex-col items-center justify-center p-12 text-center h-full min-h-[400px] animate-in fade-in duration-500">
    <div className="w-16 h-16 bg-surface-container-highest rounded-full flex items-center justify-center mb-6">
      <FileQuestion className="text-on-surface-variant" size={32} />
    </div>
    <h3 className="text-2xl font-headline font-bold text-on-surface mb-2">{title}</h3>
    <p className="text-on-surface-variant max-w-md mb-8">{message}</p>
    {action && (
      <button 
        onClick={action.onClick}
        className="flex items-center gap-2 px-6 py-3 bg-primary text-surface hover:bg-primary-dim transition-colors rounded-full text-sm font-bold"
      >
        {action.label}
      </button>
    )}
  </div>
);
