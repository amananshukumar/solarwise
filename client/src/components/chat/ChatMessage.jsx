import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Sun, User, Copy, Check } from 'lucide-react';

export default function ChatMessage({ message }) {
  const isUser = message.sender === 'user';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (message.text) {
      navigator.clipboard.writeText(message.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={`flex gap-3 text-xs ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-md ${
          isUser
            ? 'bg-slate-800 text-white dark:bg-slate-700'
            : 'bg-gradient-to-tr from-amber-500 to-emerald-500 text-slate-950'
        }`}
      >
        {isUser ? <User className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
      </div>

      {/* Message Bubble */}
      <div className="relative group max-w-[80%] space-y-1">
        <div
          className={`p-3.5 rounded-2xl shadow-sm border leading-relaxed ${
            isUser
              ? 'bg-emerald-600 text-white border-emerald-500 rounded-tr-none'
              : 'bg-white dark:bg-slate-800/90 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-700 rounded-tl-none'
          }`}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap font-medium text-xs">{message.text}</p>
          ) : (
            <div className="prose prose-invert prose-xs max-w-none text-xs leading-relaxed space-y-1">
              <ReactMarkdown>{message.text}</ReactMarkdown>
            </div>
          )}
        </div>

        {/* Message Footer: Timestamp & Copy Button */}
        <div className={`flex items-center gap-2 text-[10px] text-slate-400 ${isUser ? 'justify-end' : 'justify-start'}`}>
          <span>{message.timestamp || 'Just now'}</span>

          {!isUser && (
            <button
              onClick={handleCopy}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-slate-400 hover:text-emerald-500"
              title="Copy answer"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
