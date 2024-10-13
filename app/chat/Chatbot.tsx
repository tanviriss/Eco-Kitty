'use client'
import React, { useState } from 'react';
import { Send } from 'lucide-react';

const EcoKittyChat = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ type: string; content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() === '') return;

    // Add user message to chat history
    const userMessage = { type: 'user', content: message };
    setChatHistory(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from the server');
      }


      const data = await response.json();
      setChatHistory(prev => [...prev, { type: 'ai', content: data.response }]);
    } catch (error) {
      console.error('Error:', error);
      setChatHistory(prev => [...prev, { type: 'ai', content: "Meow! Sorry, I'm having trouble responding right now." }]);
    } finally {
      setIsLoading(false);
    }

    setMessage('');
  };

  return (
    <div className="bg-green-100 p-6 rounded-lg max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">chat with eco kitty</h1>
      </div>
      <div className="flex items-center justify-center mb-6">
        <img src="/kittyquestion.png" alt="Eco Kitty" className="w-32" />
      </div>
      <div className="bg-white h-96 w-full rounded-lg mb-6 p-4 overflow-y-auto">
        {chatHistory.map((msg, index) => (
          <div key={index} className={`mb-3 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-3 rounded-lg ${msg.type === 'user' ? 'bg-green-200' : 'bg-gray-200'}`}>
              {msg.content}
            </span>
          </div>
        ))}
        {isLoading && (
          <div className="text-center">
            <span className="inline-block p-3 rounded-lg bg-gray-100">Eco Kitty is thinking...</span>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow p-3 rounded-lg bg-green-700 text-white placeholder-green-200"
        />
        <button type="submit" className="bg-green-700 text-white p-3 rounded-lg flex items-center justify-center" disabled={isLoading}>
          <Send size={24} />
        </button>
      </form>
    </div>
  );
};

export default EcoKittyChat;