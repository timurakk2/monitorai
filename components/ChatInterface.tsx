
import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp, Paperclip, Monitor, Smile, Cpu } from 'lucide-react';
import MarkdownRenderer from './MarkdownRenderer';
import { Chat, Message, MessageRole } from '../types';

interface ChatInterfaceProps {
  chat: Chat | null;
  onSendMessage: (content: string) => void;
  isTyping: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ chat, onSendMessage, isTyping }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat?.messages, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isTyping) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <div className="flex-1 flex flex-col relative h-full bg-white">
      {/* Header */}
      <header className="sticky top-0 z-30 h-16 bg-white/80 backdrop-blur-xl border-b border-gray-100 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white">
            <Monitor size={18} />
          </div>
          <span className="font-bold tracking-tight text-lg">Monitor AI</span>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pt-4 pb-32">
        <div className="max-w-3xl mx-auto px-4 space-y-8">
          {!chat || chat.messages.length === 0 ? (
            <div className="h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-20 h-20 bg-[#F5F5F7] rounded-[24px] flex items-center justify-center text-gray-400 mb-2">
                <Cpu size={40} />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">How can I help today?</h2>
              <p className="text-gray-400 max-w-sm text-sm">
                Monitor AI is powered by advanced reasoning models for coding, analysis, and premium chat.
              </p>
            </div>
          ) : (
            chat.messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div className={`flex max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start`}>
                  {/* Avatar for AI */}
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white flex-shrink-0 mr-3 mt-1 animate-breathing">
                      <Monitor size={14} />
                    </div>
                  )}

                  <div 
                    className={`p-4 ${
                      msg.role === 'user' 
                        ? 'bg-[#2c2c2e] text-white rounded-[22px] rounded-br-[4px]' 
                        : 'bg-transparent text-[#1D1D1F] rounded-2xl'
                    }`}
                  >
                    <MarkdownRenderer content={msg.content} />
                    <div className={`text-[10px] mt-2 font-medium opacity-40 uppercase tracking-widest ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
          
          {isTyping && (
            <div className="flex justify-start animate-fade-in">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white flex-shrink-0 mr-3 mt-1 animate-pulse">
                  <Monitor size={14} />
                </div>
                <div className="bg-[#F5F5F7] p-4 rounded-2xl rounded-bl-[4px]">
                  <div className="flex space-x-1.5">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 inset-x-0 p-4 pb-8 pointer-events-none">
        <div className="max-w-3xl mx-auto pointer-events-auto">
          <form 
            onSubmit={handleSubmit}
            className="bg-white border border-gray-200/50 shadow-2xl rounded-[30px] p-2 flex items-end space-x-2 backdrop-blur-xl"
          >
            <button type="button" className="p-3 text-gray-400 hover:text-black transition-colors">
              <Paperclip size={20} />
            </button>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              placeholder="Ask anything..."
              className="flex-1 bg-transparent py-3 px-2 focus:outline-none resize-none min-h-[44px] max-h-[200px] text-[16px]"
              rows={1}
            />
            <div className="flex space-x-1 pb-1 pr-1">
              <button type="button" className="p-2 text-gray-400 hover:text-black transition-colors">
                <Smile size={20} />
              </button>
              <button 
                type="submit" 
                disabled={!input.trim() || isTyping}
                className={`p-2 rounded-full transition-all ${
                  input.trim() && !isTyping ? 'bg-black text-white' : 'bg-gray-100 text-gray-300'
                }`}
              >
                <ArrowUp size={20} />
              </button>
            </div>
          </form>
          <p className="text-[10px] text-center mt-3 text-gray-400 font-medium">
            Monitor AI can make mistakes. Check important info.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
