
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar } from '@/components/ui/avatar';
import { ArrowUp, ChevronRight, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatInterfaceProps {
  fileName: string;
  fileSize: string;
}

export default function ChatInterface({ fileName, fileSize }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `I've processed your PDF "${fileName}" (${fileSize}). What would you like to know about it?`,
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Simulate AI response (in a real app, this would be an API call)
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "This is a placeholder response since we don't have the actual PDF processing functionality implemented. In a complete application, this would analyze your PDF and respond to your query with relevant information.",
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  return (
    <div className="flex flex-col h-full bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden border shadow-sm">
      <div className="p-4 border-b bg-white/50 flex items-center gap-3">
        <div className="p-2 rounded-full bg-primary/10">
          <FileText className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-medium text-sm">{fileName}</h3>
          <p className="text-muted-foreground text-xs">{fileSize}</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex gap-3 animate-fade-in",
              message.isUser ? "justify-end" : "justify-start"
            )}
          >
            {!message.isUser && (
              <Avatar className="h-8 w-8 bg-primary/20 flex items-center justify-center text-primary">
                <FileText className="h-4 w-4" />
              </Avatar>
            )}
            
            <div 
              className={cn(
                "rounded-lg p-3 max-w-[80%]",
                message.isUser 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted"
              )}
            >
              {message.content}
              <div className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
            
            {message.isUser && (
              <Avatar className="h-8 w-8 bg-primary flex items-center justify-center text-primary-foreground">
                <span className="text-xs font-medium">YOU</span>
              </Avatar>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex gap-3 animate-fade-in justify-start">
            <Avatar className="h-8 w-8 bg-primary/20 flex items-center justify-center text-primary">
              <FileText className="h-4 w-4" />
            </Avatar>
            <div className="rounded-lg p-4 max-w-[80%] bg-muted flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-primary/60 animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-primary/60 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 rounded-full bg-primary/60 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t bg-white/50">
        <div className="relative">
          <Textarea
            placeholder="Ask a question about your PDF..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pr-12 resize-none bg-white/80 min-h-[60px]"
            rows={1}
          />
          <Button
            size="icon"
            className={cn(
              "absolute right-2 bottom-2 rounded-full transition-opacity",
              !input.trim() ? "opacity-50" : "opacity-100"
            )}
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
