import { useState, useEffect, useRef } from 'react';
import { Message, AIModel } from '../types';
import { availableModels } from '../models';
import { DREAMWEAVER_CONTEXT } from '../dreamweaverContext';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { ModelSelector } from './ModelSelector';
import { MessageCircle, X, Loader2 } from 'lucide-react';

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedModel, setSelectedModel] = useState<AIModel>(availableModels[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [puterReady, setPuterReady] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    console.log('ChatWidget mounted, checking Puter.js...');

    const checkPuter = () => {
      if (typeof window.puter !== 'undefined') {
        console.log('Puter.js detected');
        if (window.puter.ai && typeof window.puter.ai.chat === 'function') {
          console.log('Puter AI chat method available');
          setPuterReady(true);
        } else {
          console.warn('Puter detected but AI module not ready');
          setTimeout(checkPuter, 500);
        }
      } else {
        console.log('Puter.js not found yet, retrying...');
        setTimeout(checkPuter, 500);
      }
    };

    const timeout = setTimeout(() => {
      if (!puterReady) {
        console.error('Puter.js initialization timeout - check if script loaded in HTML');
      }
    }, 15000);

    checkPuter();

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content:
          'Hello! I\'m here to help you explore and understand the Dreamweaver literary work. Ask me anything about the themes, imagery, structure, or emotional depth of the piece.',
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      if (typeof window.puter === 'undefined') {
        throw new Error('Script didn\'t load: Puter.js not found. Refresh the page.');
      }

      if (!window.puter.ai) {
        throw new Error('Cannot read property \'chat\' of undefined: Puter loaded but AI module missing');
      }

      if (typeof window.puter.ai.chat !== 'function') {
        throw new Error('Puter.ai.chat is not a function');
      }

      if (!puterReady) {
        throw new Error('Puter.js still initializing. Please wait a moment and try again.');
      }

      console.log('Sending message with model:', selectedModel.id);
      console.log('Model ID format:', selectedModel.id);

      const response = await Promise.race([
        (async () => {
          try {
            const result = await window.puter.ai.chat(content, {
              model: selectedModel.id,
              system: DREAMWEAVER_CONTEXT,
            });
            console.log('Raw response:', result);
            console.log('Response type:', typeof result);
            if (result && typeof result === 'object') {
              console.log('Response keys:', Object.keys(result));
            }
            return result;
          } catch (chatError) {
            console.error('Chat API error:', chatError);
            throw chatError;
          }
        })(),
        new Promise((_, reject) =>
          setTimeout(
            () => reject(new Error('Request timeout after 60 seconds')),
            60000
          )
        ),
      ]);

      let textContent: string;

      if (typeof response === 'string') {
        textContent = response;
      } else if (typeof response === 'object' && response !== null) {
        if (response.text && typeof response.text === 'string') {
          textContent = response.text;
        } else if (response.content && typeof response.content === 'string') {
          textContent = response.content;
        } else if (response.message && typeof response.message === 'string') {
          textContent = response.message;
        } else if (response.response && typeof response.response === 'string') {
          textContent = response.response;
        } else {
          textContent = JSON.stringify(response);
        }
      } else {
        throw new Error(`Invalid response type: expected string or object, got ${typeof response}`);
      }

      if (!textContent || textContent.trim() === '') {
        throw new Error('Model returned empty response');
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: textContent,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      let errorContent = 'I apologize, but I encountered an error processing your message. Please try again.';

      if (error instanceof Error) {
        console.error('Error message:', error.message);
        errorContent = error.message;
      }

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: errorContent,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-emerald-600 text-white rounded-full p-4 shadow-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all hover:scale-110 z-50"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 border border-slate-200">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Dreamweaver Assistant</h2>
              <p className="text-xs text-emerald-100">Powered by Puter.js</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 rounded-lg p-1 transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="px-4 py-3 border-b border-slate-200 bg-slate-50">
            <ModelSelector
              models={availableModels}
              selectedModel={selectedModel}
              onSelectModel={setSelectedModel}
              disabled={isLoading}
            />
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-slate-400">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="px-4 py-4 border-t border-slate-200 bg-white">
            {!puterReady && (
              <div className="text-xs text-amber-600 mb-2 text-center">
                Loading AI service...
              </div>
            )}
            <ChatInput onSendMessage={handleSendMessage} disabled={isLoading || !puterReady} />
          </div>
        </div>
      )}
    </>
  );
}
