import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, Minimize2, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useGroqChat } from '@/hooks/useGroqChat';

interface ChatBotProps {
  stream: string;
  streamColor: string;
}

export const ChatBot: React.FC<ChatBotProps> = ({ stream, streamColor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const { messages, sendMessage, isLoading, getRandomQuestion } = useGroqChat(stream);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      await sendMessage(inputMessage);
      setInputMessage('');
    }
  };

  const handleQuestionClick = () => {
    const randomQuestion = getRandomQuestion();
    setInputMessage(randomQuestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className={`rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300`}
          style={{ backgroundColor: streamColor }}
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </Button>
      ) : (
        <Card className="w-80 h-96 flex flex-col shadow-xl">
          <div 
            className="p-4 rounded-t-lg flex justify-between items-center text-white"
            style={{ backgroundColor: streamColor }}
          >
            <h3 className="font-semibold">{stream} Career Assistant</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20"
            >
              <Minimize2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isBot
                      ? 'bg-muted text-foreground'
                      : 'text-white'
                  }`}
                  style={!message.isBot ? { backgroundColor: streamColor } : {}}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t space-y-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleQuestionClick}
              className="w-full text-left justify-start"
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              Get a random question
            </Button>
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about careers..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || !inputMessage.trim()}
                style={{ backgroundColor: streamColor }}
                className="text-white hover:opacity-90"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};