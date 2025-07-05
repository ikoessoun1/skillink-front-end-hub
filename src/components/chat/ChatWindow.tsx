import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, MessageSquare } from 'lucide-react';
import { Message, User, getUserById } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';

interface ChatWindowProps {
  recipientId: string;
  jobId?: string;
  onClose?: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ recipientId, jobId, onClose }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const recipient = getUserById(recipientId);

  useEffect(() => {
    loadMessages();
  }, [recipientId, user?.id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = () => {
    if (!user) return;
    
    const storageKey = `skilllink_messages_${user.id}`;
    const storedMessages = localStorage.getItem(storageKey);
    
    if (storedMessages) {
      const allMessages: Message[] = JSON.parse(storedMessages);
      const conversationMessages = allMessages.filter(msg => 
        (msg.senderId === user.id && msg.receiverId === recipientId) ||
        (msg.senderId === recipientId && msg.receiverId === user.id)
      );
      setMessages(conversationMessages);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !user) return;

    const message: Message = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      senderId: user.id,
      receiverId: recipientId,
      jobId,
      content: newMessage.trim(),
      timestamp: new Date().toISOString(),
      read: false
    };

    // Add to conversation
    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);

    // Save to localStorage for both users
    const saveMessageForUser = (userId: string) => {
      const storageKey = `skilllink_messages_${userId}`;
      const existingMessages = localStorage.getItem(storageKey);
      const allMessages: Message[] = existingMessages ? JSON.parse(existingMessages) : [];
      allMessages.push(message);
      localStorage.setItem(storageKey, JSON.stringify(allMessages));
    };

    saveMessageForUser(user.id);
    saveMessageForUser(recipientId);

    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!recipient) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="p-4">
          <p className="text-muted-foreground">User not found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md h-96 flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={recipient.avatar} />
              <AvatarFallback>{recipient.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-sm">{recipient.name}</CardTitle>
              <p className="text-xs text-muted-foreground">{recipient.type === 'worker' ? 'Worker' : 'Client'}</p>
            </div>
          </div>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              ×
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-3 pb-4">
            {messages.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Start a conversation</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      message.senderId === user?.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p>{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.senderId === user?.id 
                        ? 'text-primary-foreground/70' 
                        : 'text-muted-foreground'
                    }`}>
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1"
            />
            <Button size="sm" onClick={sendMessage} disabled={!newMessage.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatWindow;