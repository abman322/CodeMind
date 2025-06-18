'use client';

import React, { useState, useRef, useEffect } from 'react';

interface ChatbotProps {
  lessonContent: string;
  courseId: string;
  unitId: string;
  lessonId: string;
}

interface Message {
  sender: 'user' | 'ai';
  text: string;
  isLoading?: boolean;
}

const Chatbot: React.FC<ChatbotProps> = ({ lessonContent, courseId, unitId, lessonId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async (text: string) => {
    if (text.trim() === '') return;

    const userMessage: Message = { sender: 'user', text: text.trim() };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');

    // Add loading message
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'ai', text: 'Thinking...', isLoading: true }
    ]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          lessonContent: lessonContent,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      // Remove loading message and add AI response
      setMessages((prevMessages) => {
        const messagesWithoutLoading = prevMessages.filter(msg => !msg.isLoading);
        return [...messagesWithoutLoading, { sender: 'ai', text: data.response }];
      });
    } catch (error) {
      console.error('Error sending message:', error);
      // Remove loading message and add error message
      setMessages((prevMessages) => {
        const messagesWithoutLoading = prevMessages.filter(msg => !msg.isLoading);
        return [...messagesWithoutLoading, { 
          sender: 'ai', 
          text: 'Sorry, I encountered an error. Please try again.' 
        }];
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(input);
  };

  const handleQuickPrompt = (prompt: string) => {
    handleSendMessage(prompt);
  };

  return (
    <div className="flex flex-col h-full">
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 rounded-lg shadow-inner"
      >
        {messages.length === 0 ? (
          <div className="space-y-4">
            <div className="text-center text-gray-500 italic">
              Ask me anything about this lesson!
            </div>
            <div className="space-y-2">
              <div className="text-gray-500 text-xs mb-1">Quick prompts:</div>
              {[
                'Can you give me a hint?',
                'Review my current code',
                "What's wrong with my approach?",
                'Show me a better way to solve this'
              ].map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleQuickPrompt(prompt)}
                  className="w-full text-left bg-gray-100 hover:bg-blue-100 text-gray-700 rounded px-3 py-2 text-sm transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  msg.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                } ${msg.isLoading ? 'animate-pulse' : ''}`}
              >
                {msg.text}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-4">
        <input
          type="text"
          placeholder="Ask the AI for help..."
          className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 transition-colors disabled:opacity-50"
          disabled={input.trim() === ''}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12l15-6m0 0l-6 15m6-15l-9.6 9.6" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default Chatbot; 