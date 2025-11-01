import { AIModel } from './types';

export const availableModels: AIModel[] = [
  { id: 'google/gemma-2-9b-it:free', name: 'Gemma 2 9B (Free)', provider: 'Google' },
  { id: 'google/gemma-3-4b-it:free', name: 'Gemma 3 4B (Free)', provider: 'Google' },
  { id: 'deepseek-chat', name: 'DeepSeek Chat', provider: 'DeepSeek' },
  { id: 'deepseek-reasoner', name: 'DeepSeek Reasoner', provider: 'DeepSeek' },
];
