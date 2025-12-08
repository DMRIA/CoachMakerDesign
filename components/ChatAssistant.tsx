import React, { useState, useRef, useEffect } from 'react';
import { MessageRole, ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: MessageRole.MODEL, text: "System Online. Ready for questions on D-Line strategy or 3D print specs." }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: MessageRole.USER,
      text: input
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const responseText = await sendMessageToGemini(userMsg.text, messages.map(m => ({ role: m.role, text: m.text })));

    const modelMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: MessageRole.MODEL,
      text: responseText
    };

    setIsTyping(false);
    setMessages(prev => [...prev, modelMsg]);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-8 right-8 z-50 h-16 w-16 flex items-center justify-center border border-timpview-orange/50 shadow-[0_0_20px_rgba(249,115,22,0.2)] transition-all duration-300 hover:scale-105 group backdrop-blur-sm ${isOpen ? 'bg-black rotate-90' : 'bg-lando-dark/90'
          }`}
        style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 80%, 80% 100%, 0 100%, 0 20%)' }}
        aria-label="Toggle Chat"
      >
        {isOpen ? (
          <span className="font-display font-black text-timpview-orange text-xl">X</span>
        ) : (
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
          </div>
        )}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-28 right-6 md:right-8 z-40 w-[90vw] md:w-[400px] bg-black/90 border border-white/10 backdrop-blur-xl shadow-2xl transition-all duration-500 origin-bottom-right overflow-hidden flex flex-col ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-10 pointer-events-none'
          }`}
        style={{
          height: '600px',
          maxHeight: '70vh',
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 20px 100%, 0 calc(100% - 20px))'
        }}
      >
        {/* Header */}
        <div className="bg-white/5 p-4 border-b border-white/10 flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-timpview-orange rounded-full animate-pulse"></div>
              <h3 className="font-display font-black italic text-white text-lg tracking-wider">TEAM RADIO</h3>
            </div>
            <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest pl-4">Connected to Gemini Core</p>
          </div>
          <div className="font-mono text-[9px] text-timpview-orange border border-timpview-orange/30 px-2 py-1 rounded">
            LIVE
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.role === MessageRole.USER ? 'items-end' : 'items-start'}`}
            >
              <span className="text-[9px] font-mono text-gray-500 mb-1 uppercase tracking-wider">
                {msg.role === MessageRole.USER ? 'Coach' : 'AI_System'}
              </span>
              <div
                className={`max-w-[85%] p-4 text-sm font-mono border ${msg.role === MessageRole.USER
                    ? 'bg-timpview-orange/10 border-timpview-orange/50 text-white rounded-tl-xl rounded-bl-xl rounded-br-xl'
                    : 'bg-gray-900/90 border-white/10 text-gray-300 rounded-tr-xl rounded-br-xl rounded-bl-xl'
                  }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex flex-col items-start animate-pulse">
              <span className="text-[9px] font-mono text-gray-500 mb-1">PROCESSING</span>
              <div className="bg-gray-900 border border-white/10 p-3 flex space-x-1">
                <div className="w-1 h-4 bg-timpview-orange"></div>
                <div className="w-1 h-3 bg-timpview-orange/50"></div>
                <div className="w-1 h-2 bg-timpview-orange/20"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 bg-black border-t border-white/10">
          <div className="relative flex items-center group">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter command..."
              className="w-full bg-gray-900/50 border border-white/20 text-white font-mono text-sm p-4 pr-12 focus:border-timpview-orange focus:outline-none transition-colors placeholder-gray-600"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% 80%, 95% 100%, 0 100%)' }}
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="absolute right-2 p-2 text-timpview-orange hover:text-white disabled:opacity-30 transition-colors"
            >
              ►
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChatAssistant;