
import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import AccessGate from './components/AccessGate';
import { Chat, Message } from './types';
import { AVAILABLE_MODELS } from './constants';
import { generateAIResponse } from './services/geminiService';

const App: React.FC = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedModel, setSelectedModel] = useState(AVAILABLE_MODELS[0].id);

  // Initialize
  useEffect(() => {
    const unlocked = localStorage.getItem('monitor_ai_unlocked') === 'true';
    setIsUnlocked(unlocked);

    const savedChats = localStorage.getItem('monitor_ai_chats');
    if (savedChats) {
      const parsed = JSON.parse(savedChats);
      setChats(parsed);
      if (parsed.length > 0) setActiveChatId(parsed[0].id);
    }
  }, []);

  // Sync chats to localStorage
  useEffect(() => {
    localStorage.setItem('monitor_ai_chats', JSON.stringify(chats));
  }, [chats]);

  const handleNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: 'New Conversation',
      messages: [],
      modelId: selectedModel,
      createdAt: Date.now(),
    };
    setChats([newChat, ...chats]);
    setActiveChatId(newChat.id);
  };

  const handleDeleteChat = (id: string) => {
    const filtered = chats.filter(c => c.id !== id);
    setChats(filtered);
    if (activeChatId === id) {
      setActiveChatId(filtered.length > 0 ? filtered[0].id : null);
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!activeChatId) {
      const newChat: Chat = {
        id: Date.now().toString(),
        title: content.slice(0, 30) + (content.length > 30 ? '...' : ''),
        messages: [],
        modelId: selectedModel,
        createdAt: Date.now(),
      };
      setChats([newChat, ...chats]);
      setActiveChatId(newChat.id);
      
      const userMsg: Message = {
        id: Date.now().toString(),
        role: 'user',
        content,
        timestamp: Date.now(),
      };
      
      processAIResponse(newChat.id, [...newChat.messages, userMsg]);
    } else {
      const userMsg: Message = {
        id: Date.now().toString(),
        role: 'user',
        content,
        timestamp: Date.now(),
      };

      setChats(prev => prev.map(c => 
        c.id === activeChatId 
          ? { ...c, messages: [...c.messages, userMsg] } 
          : c
      ));

      const activeChat = chats.find(c => c.id === activeChatId);
      if (activeChat) {
        processAIResponse(activeChat.id, [...activeChat.messages, userMsg]);
      }
    }
  };

  const processAIResponse = async (chatId: string, history: Message[]) => {
    setIsTyping(true);
    
    // System instruction for features
    const systemInstruction = `
      You are Monitor AI, a premium assistant.
      When providing weather data, always wrap it in this format: 
      :::weather {"city": "CityName", "temp": 22, "condition": "Sunny", "humidity": 45, "windSpeed": 10} :::
      Condition must be one of: Sunny, Cloudy, Rainy, Snowy, Stormy.
      Always respond in Markdown.
    `;

    const aiText = await generateAIResponse(selectedModel, history, systemInstruction);
    
    const assistantMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: aiText,
      timestamp: Date.now(),
    };

    setChats(prev => prev.map(c => 
      c.id === chatId 
        ? { ...c, messages: [...c.messages, assistantMsg] } 
        : c
    ));
    setIsTyping(false);
  };

  const activeChat = chats.find(c => c.id === activeChatId) || null;

  if (!isUnlocked) {
    return <AccessGate onUnlock={() => setIsUnlocked(true)} />;
  }

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <Sidebar 
        chats={chats}
        activeChatId={activeChatId}
        onNewChat={handleNewChat}
        onSelectChat={setActiveChatId}
        onDeleteChat={handleDeleteChat}
        selectedModel={selectedModel}
        onSelectModel={setSelectedModel}
      />
      <main className="flex-1 flex flex-col min-w-0">
        <ChatInterface 
          chat={activeChat}
          onSendMessage={handleSendMessage}
          isTyping={isTyping}
        />
      </main>
    </div>
  );
};

export default App;
