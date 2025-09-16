import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

export const useGroqChat = (stream: string) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Hello! I'm your AI career counselor for ${stream}. I'm here to help you explore career opportunities, understand requirements, and answer any questions about this field. How can I assist you today?`,
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('chat-groq', {
        body: { message: content, stream }
      });

      if (error) throw error;

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error. Please try again.',
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const getRandomQuestion = () => {
    const questions = [
      "What are the top career opportunities in this field?",
      "What skills should I develop for this stream?",
      "What's the average salary range for careers in this field?",
      "Which colleges offer the best programs for this stream?",
      "What are the future prospects in this industry?",
      "How can I prepare for entrance exams in this field?",
      "What internship opportunities are available?",
      "What are the different specializations I can choose?"
    ];
    return questions[Math.floor(Math.random() * questions.length)];
  };

  return {
    messages,
    sendMessage,
    isLoading,
    getRandomQuestion
  };
};