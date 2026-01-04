
import React from 'react';
import { Plus, MessageSquare, Settings, Trash2, Zap } from 'lucide-react';
import { Chat, AIModel } from '../types';
import { AVAILABLE_MODELS } from '../constants';

interface SidebarProps {
  chats: Chat[];
  activeChatId: string | null;
  onNewChat: () => void;
  onSelectChat: (id: string) => void;
  onDeleteChat: (id: string) => void;
  selectedModel: string;
  onSelectModel: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  chats,
  activeChatId,
  onNewChat,
  onSelectChat,
  onDeleteChat,
  selectedModel,
  onSelectModel
}) => {
  return (
    <div className="w-[260px] h-full bg-[#F9F9F9] border-r border-gray-200 flex flex-col hidden md:flex">
      {/* Header */}
      <div className="p-4">
        <button
          onClick={onNewChat}
          className="w-full h-12 flex items-center justify-between px-4 bg-white border border-gray-200 rounded-[14px] shadow-sm hover:shadow-md transition-all group"
        >
          <span className="font-semibold text-sm">New Chat</span>
          <Plus size={18} className="text-gray-400 group-hover:text-black" />
        </button>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-2 space-y-1">
        {chats.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
            <MessageSquare size={32} className="text-gray-200 mb-2" />
            <p className="text-xs text-gray-400">No conversations yet</p>
          </div>
        ) : (
          chats.map((chat) => (
            <div
              key={chat.id}
              className={`group flex items-center justify-between p-3 rounded-[12px] cursor-pointer transition-colors ${
                activeChatId === chat.id ? 'bg-white shadow-sm' : 'hover:bg-gray-100'
              }`}
              onClick={() => onSelectChat(chat.id)}
            >
              <div className="flex items-center space-x-3 overflow-hidden">
                <MessageSquare size={16} className={activeChatId === chat.id ? 'text-black' : 'text-gray-400'} />
                <span className={`text-sm truncate ${activeChatId === chat.id ? 'font-medium' : 'text-gray-600'}`}>
                  {chat.title || 'Untitled Chat'}
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteChat(chat.id);
                }}
                className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-500 transition-all"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Footer / Settings */}
      <div className="p-4 border-t border-gray-100 bg-white/50 space-y-3">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Active Model</label>
          <div className="space-y-1">
            {AVAILABLE_MODELS.map((model) => (
              <button
                key={model.id}
                onClick={() => onSelectModel(model.id)}
                className={`w-full flex items-center justify-between p-2 rounded-lg text-xs transition-all ${
                  selectedModel === model.id 
                    ? 'bg-black text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Zap size={12} className={selectedModel === model.id ? 'text-blue-400' : 'text-gray-400'} />
                  <span className="font-medium">{model.name}</span>
                </div>
                {selectedModel === model.id && <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>}
              </button>
            ))}
          </div>
        </div>
        
        <button className="flex items-center space-x-3 w-full p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 text-sm">
          <Settings size={18} />
          <span>System Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
