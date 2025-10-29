import { AIModel } from '../types';
import { ChevronDown } from 'lucide-react';

interface ModelSelectorProps {
  models: AIModel[];
  selectedModel: AIModel;
  onSelectModel: (model: AIModel) => void;
  disabled?: boolean;
}

export function ModelSelector({
  models,
  selectedModel,
  onSelectModel,
  disabled = false,
}: ModelSelectorProps) {
  return (
    <div className="relative">
      <select
        value={selectedModel.id}
        onChange={(e) => {
          const model = models.find((m) => m.id === e.target.value);
          if (model) onSelectModel(model);
        }}
        disabled={disabled}
        className="w-full appearance-none bg-white border border-slate-300 rounded-lg px-4 py-2 pr-10 text-sm font-medium text-slate-700 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {models.map((model) => (
          <option key={model.id} value={model.id}>
            {model.name} ({model.provider})
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
    </div>
  );
}
