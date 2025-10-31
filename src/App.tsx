import { ChatWidget } from './components/ChatWidget';
import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-slate-900 mb-4">
              Dreamweaver Chatbot
            </h1>
            <p className="text-xl text-slate-600 mb-6">
              An AI assistant to explore the Dreamweaver literary work
            </p>
            <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-sm border border-slate-200">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-slate-700">
                Click the chat button to get started
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              About This Chatbot
            </h2>
            <div className="space-y-4 text-slate-600">
              <p>
                This chatbot widget uses{' '}
                <a
                  href="https://puter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  Puter.js
                </a>{' '}
                to provide access to multiple AI models without requiring API keys.
              </p>
              <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-3">Features:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 mt-1">•</span>
                    <span>
                      <strong>Multiple AI Models:</strong> Choose from GPT-4o, Claude 3.5
                      Sonnet, Gemini, DeepSeek, Llama, and more
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 mt-1">•</span>
                    <span>
                      <strong>Context-Aware:</strong> Trained on the Dreamweaver literary
                      work
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 mt-1">•</span>
                    <span>
                      <strong>Embeddable:</strong> Can be embedded on any website
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 mt-1">•</span>
                    <span>
                      <strong>No API Keys Required:</strong> Users pay for their own usage
                    </span>
                  </li>
                </ul>
              </div>
              <div className="bg-emerald-50 rounded-lg p-6 border border-emerald-200">
                <h3 className="font-semibold text-emerald-900 mb-2">
                  To Embed on Your Site:
                </h3>
                <p className="text-sm text-emerald-800 mb-3">
                  Build this project and include the compiled JavaScript and CSS files in
                  your website. The chat widget will appear as a floating button in the
                  bottom-right corner.
                </p>
                <code className="block bg-white text-emerald-900 px-4 py-2 rounded border border-emerald-300 text-xs font-mono">
                  npm run build
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ChatWidget />
      </div>
    </ErrorBoundary>
  );
}

export default App;
