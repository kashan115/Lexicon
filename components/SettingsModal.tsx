import React from 'react';
import { X, Server, Cpu } from 'lucide-react';
import { AppSettings, LLMProvider } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onSave: (s: AppSettings) => void;
}

export const SettingsModal: React.FC<Props> = ({ isOpen, onClose, settings, onSave }) => {
  const [localSettings, setLocalSettings] = React.useState<AppSettings>(settings);

  // Sync prop changes to local state
  React.useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  if (!isOpen) return null;

  const handleChange = (field: keyof AppSettings, value: any) => {
    setLocalSettings(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-xl shadow-2xl p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-serif font-bold text-ink mb-6">Settings</h2>

        <div className="space-y-6">
          {/* Provider Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">AI Provider</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleChange('provider', 'gemini')}
                className={`flex items-center justify-center gap-2 p-3 rounded-lg border transition-all ${
                  localSettings.provider === 'gemini'
                    ? 'border-accent bg-orange-50 text-accent font-medium'
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Server size={18} />
                Gemini
              </button>
              <button
                onClick={() => handleChange('provider', 'ollama')}
                className={`flex items-center justify-center gap-2 p-3 rounded-lg border transition-all ${
                  localSettings.provider === 'ollama'
                    ? 'border-accent bg-orange-50 text-accent font-medium'
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Cpu size={18} />
                Local (Ollama)
              </button>
            </div>
            {localSettings.provider === 'gemini' && (
              <p className="text-xs text-gray-500 mt-2">
                Using built-in demo key.
              </p>
            )}
          </div>

          {/* Ollama Config */}
          {localSettings.provider === 'ollama' && (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ollama URL</label>
                <input 
                  type="text" 
                  value={localSettings.ollamaUrl}
                  onChange={(e) => handleChange('ollamaUrl', e.target.value)}
                  placeholder="http://localhost:11434"
                  className="w-full p-2 rounded-lg border border-gray-300 focus:border-accent focus:ring-1 focus:ring-accent outline-none font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Model Name</label>
                <input 
                  type="text" 
                  value={localSettings.ollamaModel}
                  onChange={(e) => handleChange('ollamaModel', e.target.value)}
                  placeholder="llama3"
                  className="w-full p-2 rounded-lg border border-gray-300 focus:border-accent focus:ring-1 focus:ring-accent outline-none font-mono text-sm"
                />
              </div>
              <div className="bg-blue-50 p-3 rounded-lg text-xs text-blue-800">
                <strong>Note:</strong> Ensure Ollama is running with <code>OLLAMA_ORIGINS="*"</code> to allow browser access.
              </div>
            </div>
          )}

          {/* Goals */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Daily Word Goal</label>
            <input 
              type="number"
              value={localSettings.targetWords}
              onChange={(e) => handleChange('targetWords', parseInt(e.target.value) || 0)}
              className="w-full p-2 rounded-lg border border-gray-300 focus:border-accent focus:ring-1 focus:ring-accent outline-none"
            />
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end gap-3">
            <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
            <button 
              onClick={() => {
                onSave(localSettings);
                onClose();
              }} 
              className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-orange-700 font-medium shadow-sm transition-transform active:scale-95"
            >
              Save Changes
            </button>
        </div>

      </div>
    </div>
  );
};
