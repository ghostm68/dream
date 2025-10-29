export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface AIModel {
  id: string;
  name: string;
  provider: string;
}

declare global {
  interface Window {
    puter: {
      ai: {
        chat: (message: string, options: { model: string; system?: string }) => Promise<string>;
      };
    };
  }
}
