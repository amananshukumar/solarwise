import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Sun, Send, X, Sparkles, RefreshCw, Zap, MessageSquare } from 'lucide-react';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';

const API_URL = import.meta.env.VITE_API_URL || '';

export default function ChatWindow({ onClose, calculationContext = null }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: `### Welcome to SolarWise AI Assistant! ☀️\n\nI am your personalized rooftop solar consultant for India. Ask me anything about **PM Surya Ghar subsidies**, 550W solar panels, net metering, or payback periods!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestionChips = [
    'What subsidy am I eligible for?',
    'How many panels do I need?',
    'How much money will I save?',
    'What is net metering?',
    'Should I install a battery?',
    'Which panel is best?',
  ];

  // Auto-scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (textToSend) => {
    const text = textToSend || input;
    if (!text || text.trim() === '' || loading) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/api/chat`, {
        message: text.trim(),
        calculationContext,
      });

      if (res.data.success) {
        const botMessage = {
          id: Date.now() + 1,
          sender: 'bot',
          text: res.data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, botMessage]);
      }
    } catch (err) {
      console.error('Chat API Error:', err);
      const errorMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: `### Service Temporarily Unavailable\n\nI am experiencing a connection timeout. Please check your network or try asking again shortly!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full sm:w-[400px] h-[550px] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden glass-card z-50">
      
      {/* Chat Window Header */}
      <div className="p-4 bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-emerald-500 p-0.5 flex items-center justify-center shadow-md">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sun className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-white flex items-center gap-1.5">
              <span>SolarWise AI Assistant</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </h3>
            <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Online • Google Gemini 2.5 Flash</span>
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Context Badge (If User has calculation attached) */}
      {calculationContext && (
        <div className="bg-emerald-950/40 border-b border-emerald-500/20 px-4 py-2 text-[11px] text-emerald-300 font-semibold flex items-center gap-1.5 shrink-0">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>
            Attached Context: {calculationContext.capacity || 4.4} kW System ({calculationContext.city || 'India'})
          </span>
        </div>
      )}

      {/* Messages Stream Container */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {loading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion Chips */}
      <div className="p-2 px-3 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900/60 overflow-x-auto flex gap-2 shrink-0 no-scrollbar">
        {suggestionChips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(chip)}
            className="px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-[11px] font-semibold whitespace-nowrap hover:border-emerald-500 hover:text-emerald-600 transition-all shrink-0 shadow-sm"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Textarea Input Container */}
      <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 shrink-0">
        <textarea
          rows="1"
          placeholder="Ask SolarWise AI anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 resize-none font-medium"
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim() || loading}
          className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white flex items-center justify-center shrink-0 shadow-md disabled:opacity-40 transition-all"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
