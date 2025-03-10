
import React from 'react';
import { Save, RefreshCw } from 'lucide-react';

interface SaveResetButtonsProps {
  onSave: () => void;
  onReset: () => void;
}

const SaveResetButtons: React.FC<SaveResetButtonsProps> = ({ onSave, onReset }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 animate-fade-in">
      <button
        onClick={onSave}
        className="button-primary flex items-center justify-center"
      >
        <Save size={18} className="mr-2" />
        Save Journal
      </button>
      
      <button
        onClick={onReset}
        className="button-secondary flex items-center justify-center"
      >
        <RefreshCw size={18} className="mr-2" />
        Reset Journal
      </button>
    </div>
  );
};

export default SaveResetButtons;
